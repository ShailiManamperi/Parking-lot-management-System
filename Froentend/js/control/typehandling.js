let allTypes = [];
let editId = null;

const API = "https://parkinglot-backend.vercel.app/api/types";

window.addEventListener("DOMContentLoaded", () => {
  loadTypes();

  const form = document.getElementById("typeForm");
  const updateForm = document.querySelector("#formUpdate form");

  // =========================
  // CREATE TYPE
  // =========================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const payload = {
      type: document.getElementById("formType").value.trim(),
      amount: Number(document.getElementById("formAmount").value)
    };

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Saving...";

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        form.reset();
        form.classList.remove("was-validated");
        loadTypes();
        alert("✅ Type added successfully");
      } else {
        alert("❌ Failed to add type");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    btn.disabled = false;
    btn.innerHTML = "Save type";
  });

  // =========================
  // UPDATE TYPE (MODAL)
  // =========================
  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = Number(document.getElementById("modalAmount").value);

    if (!editId) return;

    try {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();

      if (data.success) {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("formUpdate")
        );
        modal.hide();

        loadTypes();
        alert("✅ Updated successfully");
      } else {
        alert("❌ Update failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });
});

// =========================
// LOAD TYPES
// =========================
async function loadTypes() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (data.success) {
      allTypes = data.data;
      renderTable();
    }

  } catch (err) {
    console.error("Load error:", err);
  }
}

// =========================
// RENDER TABLE
// =========================
function renderTable() {
  const tbody = document.querySelector("#typesTable tbody");
  tbody.innerHTML = "";

  allTypes.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.type}</td>
        <td>${item.amount}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-primary"
            onclick="openEdit(${item.id}, ${item.amount})">
            Edit
          </button>
        </td>
      </tr>
    `;
  });
}

// =========================
// OPEN MODAL
// =========================
function openEdit(id, amount) {
  editId = id;
  document.getElementById("modalAmount").value = amount;

  const modal = new bootstrap.Modal(
    document.getElementById("formUpdate")
  );
  modal.show();
}