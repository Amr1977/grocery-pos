// Setup DB
let db = window.openDatabase("posDB", "1.0", "POS Database", 2 * 1024 * 1024);

db.transaction(tx => {
  tx.executeSql("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price_per_kg REAL)");
  tx.executeSql("CREATE TABLE IF NOT EXISTS sales (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, total REAL)");
  tx.executeSql("CREATE TABLE IF NOT EXISTS sale_items (id INTEGER PRIMARY KEY AUTOINCREMENT, sale_id INTEGER, product_id INTEGER, qty REAL, price REAL)");
});

// ---------------- Products -----------------
function addProduct() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value); // price per Kg

  if (!name || isNaN(price)) {
    alert("Enter valid product and price!");
    return;
  }

  db.transaction(tx => {
    tx.executeSql("INSERT INTO products (name, price_per_kg) VALUES (?, ?)", [name, price]);
  }, null, loadProducts);

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}

function loadProducts() {
  db.transaction(tx => {
    tx.executeSql("SELECT * FROM products", [], (tx, results) => {
      let output = "";
      for (let i = 0; i < results.rows.length; i++) {
        let row = results.rows.item(i);
        output += `<div class="product">${row.name} - ${row.price_per_kg} EGP / Kg</div>`;
      }
      document.getElementById("products").innerHTML = output;
    });
  });
}

// ---------------- Sales -----------------
let saleItems = [];

function addToSale() {
  let name = document.getElementById("saleName").value;
  let qty = parseFloat(document.getElementById("saleQty").value); // quantity in Kg

  if (!name || isNaN(qty) || qty <= 0) {
    alert("Enter valid product and quantity!");
    return;
  }

  db.transaction(tx => {
    tx.executeSql("SELECT * FROM products WHERE name=?", [name], (tx, results) => {
      if (results.rows.length > 0) {
        let product = results.rows.item(0);
        let cost = product.price_per_kg * qty;
        saleItems.push({ productId: product.id, name: product.name, qty, price: product.price_per_kg, cost });
        renderSale();
      } else {
        alert("Product not found");
      }
    });
  });

  document.getElementById("saleName").value = "";
  document.getElementById("saleQty").value = "";
}

function renderSale() {
  let output = "";
  let total = 0;
  saleItems.forEach(item => {
    output += `<div>${item.name} x ${item.qty} Kg = ${item.cost} EGP</div>`;
    total += item.cost;
  });
  document.getElementById("saleList").innerHTML = output;
  document.getElementById("total").innerText = total;
}

function saveSale() {
  if (saleItems.length === 0) {
    alert("No items in sale!");
    return;
  }

  let total = saleItems.reduce((sum, item) => sum + item.cost, 0);
  let date = new Date().toISOString();

  db.transaction(tx => {
    tx.executeSql("INSERT INTO sales (date, total) VALUES (?, ?)", [date, total], (tx, result) => {
      let saleId = result.insertId;
      saleItems.forEach(item => {
        tx.executeSql("INSERT INTO sale_items (sale_id, product_id, qty, price) VALUES (?, ?, ?, ?)", 
          [saleId, item.productId, item.qty, item.price]);
      });
    });
  }, null, () => {
    alert("Sale saved!");
    saleItems = [];
    renderSale();
  });
}

loadProducts();