let allItems = [];

window.addEventListener("load", () => {
  fetchItems();

  document.getElementById("searchInput").addEventListener("input", renderTable);
  document.getElementById("typeFilter").addEventListener("change", renderTable);
  document.getElementById("brandFilter").addEventListener("change", renderTable);
});

// =========================
// Fetch from backend
// =========================
async function fetchItems() {
  try {
    const res = await fetch("https://department-management-website-backe.vercel.app/api/item");
    const data = await res.json();

    if (data.success) {
      allItems = data.data;

      fillFilters(allItems);
      renderTable();
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

// =========================
// Fill dropdown filters
// =========================
function fillFilters(items) {
  const typeSet = new Set();
  const brandSet = new Set();

  items.forEach(item => {
    typeSet.add(item.type);
    brandSet.add(item.brand);
  });

  const typeFilter = document.getElementById("typeFilter");
  const brandFilter = document.getElementById("brandFilter");

  typeSet.forEach(type => {
    typeFilter.innerHTML += `<option value="${type}">${type}</option>`;
  });

  brandSet.forEach(brand => {
    brandFilter.innerHTML += `<option value="${brand}">${brand}</option>`;
  });
}

// =========================
// Render Table
// =========================
function renderTable() {
  const tbody = document.querySelector("#itemsTable tbody");
  tbody.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const typeFilter = document.getElementById("typeFilter").value;
  const brandFilter = document.getElementById("brandFilter").value;

  const filtered = allItems.filter(item => {
    return (
      (item.name.toLowerCase().includes(search) ||
       item.brand.toLowerCase().includes(search) ||
       item.type.toLowerCase().includes(search)) &&

      (typeFilter === "" || item.type === typeFilter) &&
      (brandFilter === "" || item.brand === brandFilter)
    );
  });

  filtered.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.type}</td>
        <td>${item.name}</td>
        <td>${item.brand}</td>
        <td>${item.supplier}</td>

        <td>
          <small>
            Watt: ${item.wattage} | 
            Lumen: ${item.lumen} | 
            IP: ${item.ip} | 
            CCT: ${item.cct}
          </small>
        </td>

        <td>Rs. ${item.price}</td>
      </tr>
    `;
  });
}