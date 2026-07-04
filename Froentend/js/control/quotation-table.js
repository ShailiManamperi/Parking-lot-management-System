window.addEventListener("DOMContentLoaded", () => {
  loadQuotationsTable();
});

let allQuotations = []; // store data globally

async function loadQuotationsTable() {
  try {
    const res = await fetch("https://department-management-website-backe.vercel.app/api/quotation");
    const result = await res.json();

    if (!result.success) return;

    allQuotations = result.data;

    renderTable(allQuotations);
    setupSearch(); // activate search AFTER data loads

  } catch (err) {
    console.error(err);
  }
}

function renderTable(data) {
  const tbody = document.querySelector("#quotesTable tbody");
  tbody.innerHTML = "";

  data.forEach((item, index) => {

    let badgeClass = "text-bg-secondary";

    if (item.status === "Ongoing") badgeClass = "text-bg-warning";
    else if (item.status === "Onhold") badgeClass = "text-bg-info";
    else if (item.status === "Rejected") badgeClass = "text-bg-danger";
    else if (item.status === "Completed") badgeClass = "text-bg-success";

    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.quote_ref}</td>
        <td>${item.quotation_date ? item.quotation_date.split("T")[0] : "-"}</td>
        <td>${item.project_name}</td>
        <td><span class="badge ${badgeClass}">${item.status}</span></td>
        <td>${item.scope}</td>
        <td>${item.value_amount}</td>
        <td>${item.gp_amount}</td>
        <td><button class="btn btn-sm btn-light" onclick="viewQuote(${item.id})">View</button></td>
      </tr>
    `;
  });
}

function viewQuote(id) {
    localStorage.setItem("selected_quote_id", id);
    window.location.href = "viewquote.html";
}
function setupSearch() {
  const searchInput = document.querySelector(".table-search");

  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();

    const filtered = allQuotations.filter(item => {
      return (
        (item.quote_ref && item.quote_ref.toLowerCase().includes(keyword)) ||
        (item.project_name && item.project_name.toLowerCase().includes(keyword))
      );
    });

    renderTable(filtered);
  });
}