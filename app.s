let db = openDatabase("posdb", "1.0", "POS Database", 2 * 1024 * 1024);
let saleItems = [];

// Create tables
db.transaction(tx => {
  tx.executeSql("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price_per_kg REAL)");
  tx.executeSql("CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, total REAL)");
  tx.executeSql("CREATE TABLE IF NOT EXISTS sale_items (id INTEGER PRIMARY KEY AUTOINCREMENT, sale_id INTEGER, product_id INTEGER, qty REAL, price REAL)");
});

// Add product
function addProduct() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);

  if (!name || isNaN(price)) {
    alert("Enter valid product name and price");
    return;
  }

  db.transaction(tx => {
    tx.executeSql("INSERT INTO products (name, price_per_kg) VALUES (?, ?)", [name, price]);
  }, null, () => {
    loadProducts();
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
  });
}

// Load products into product list + dropdown
function loadProducts() {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM products", [], (tx, results) => {
      let output = "";
      let dropdown = document.getElementById("saleProduct");
      dropdown.innerHTML = "";

      for (let i = 0; i < results.rows.length; i++) {
        let row = results.rows.item(i);
        output += `<div class="product">${row.name} - ${row.price_per_kg} EGP/kg</div>`;
        dropdown.innerHTML += `<option value="${row.id}">${row.name} (${row.price_per_kg} EGP/kg)</option>`;
      }
      document.getElementById("products").innerHTML = output;
    });
  });
}

// Add product to current sale
function addToSale() {
  let productId = document.getElementById("saleProduct").value;
  let qty = parseFloat(document.getElementById("saleQty").value);

  if (!productId || isNaN(qty) || qty <= 0) {
    alert("Select a product and enter valid quantity");
    return;
  }

  db.transaction(tx => {
    tx.executeSql("SELECT * FROM products WHERE id=?", [productId], (tx, results) => {
      if (results.rows.length > 0) {
        let product = results.rows.item(0);
        let cost = product.price_per_kg * qty;
        saleItems.push({ productId: product.id, name: product.name, qty, price: product.price_per_kg, cost });
        renderSale();
      }
    });
  });
}

// Render current sale items
function renderSale() {
  let output = "";
  let total = 0;
  saleItems.forEach(item => {
    output += `<div class="sale-item">${item.name} - ${item.qty} kg x ${item.price} EGP = ${item.cost.toFixed(2)} EGP</div>`;
    total += item.cost;
  });
  document.getElementById("saleItems").innerHTML = output;
  document.getElementById("saleTotal").innerText = "Total: " + total.toFixed(2) + " EGP";
}

// Save sale & items
function saveSale() {
  if (saleItems.length === 0) {
    alert("No items in sale");
    return;
  }

  let total = saleItems.reduce((sum, item) => sum + item.cost, 0);
  let date = new Date().toISOString();

  db.transaction(tx => {
    tx.executeSql("INSERT INTO sales (date, total) VALUES (?, ?)", [date, total], (tx, result) => {
      let saleId = result.insertId;
      saleItems.forEach(item => {
        tx.executeSql("INSERT INTO sale_items (sale_id, product_id, qty, price) VALUES (?, ?, ?, ?)",
          [saleId, item.productId, item.qty, item.cost]);
      });
    });
  }, null, () => {
    alert("Sale saved!");
    saleItems = [];
    renderSale();
    loadInvoices();
  });
}

// Load invoices
function loadInvoices() {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM sales ORDER BY id DESC", [], (tx, results) => {
      let output = "";
      for (let i = 0; i < results.rows.length; i++) {
        let row = results.rows.item(i);
        output += `<div>Invoice #${row.id} - ${row.total.toFixed(2)} EGP - ${row.date}</div>`;
      }
      document.getElementById("invoices").innerHTML = output;
    });
  });
}

// Init
loadProducts();
loadInvoices();