let db;
let total = 0;

initDB();

async function initDB() {
  const SQL = await initSqlJs({ locateFile: file => `sql-wasm.wasm` });
  const saved = localStorage.getItem("pos_db");

  if (saved) {
    db = new SQL.Database(new Uint8Array(JSON.parse(saved)));
  } else {
    db = new SQL.Database();
    db.run("CREATE TABLE sales (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, weight REAL, price REAL, date TEXT);");
  }

  loadSales();
}

function saveDB() {
  const data = db.export();
  const buffer = Array.from(data);
  localStorage.setItem("pos_db", JSON.stringify(buffer));
}

function addSale() {
  const productSelect = document.getElementById("product");
  const productName = productSelect.value;
  const pricePerKg = parseFloat(productSelect.selectedOptions[0].dataset.price);
  const weight = parseFloat(document.getElementById("weight").value);

  if (!weight || weight <= 0) {
    alert("Enter a valid weight");
    return;
  }

  const price = pricePerKg * weight;

  db.run("INSERT INTO sales (product, weight, price, date) VALUES (?, ?, ?, datetime('now'))", [productName, weight, price]);
  saveDB();
  loadSales();
  document.getElementById("weight").value = "";
}

function loadSales() {
  total = 0;
  const res = db.exec("SELECT * FROM sales ORDER BY id DESC");
  const tbody = document.querySelector("#salesTable tbody");
  tbody.innerHTML = "";

  if (res.length > 0) {
    const rows = res[0].values;
    rows.forEach(row => {
      const [id, product, weight, price, date] = row;
      total += price;
      tbody.innerHTML += `<tr>
        <td>${product}</td>
        <td>${weight.toFixed(2)}</td>
        <td>${price.toFixed(2)}</td>
      </tr>`;
    });
  }

  document.getElementById("total").innerText = total.toFixed(2);
}

function clearSales() {
  if (confirm("Clear all sales?")) {
    db.run("DELETE FROM sales");
    saveDB();
    loadSales();
  }
}