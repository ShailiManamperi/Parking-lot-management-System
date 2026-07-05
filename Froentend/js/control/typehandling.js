let allTypes = [];
let editId = null;

const API = "https://parkinglot-backend.vercel.app/api/types";

window.addEventListener("DOMContentLoaded", () => {
  loadTypes();

  const form = document.getElementById("typeForm");
  const updateForm = document.querySelector("#formUpdate form");

  const saveBtn = document.getElementById("savetype"); // ✅ your button id
  const updateBtn = updateForm.querySelector("button[type='submit']");

  // =========================
  // CREATE TYPE
  // =========================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation(); // 🔥 IMPORTANT (prevents modal interference)

    // ONLY validate visible inputs inside main form area
    const typeInput = document.getElementById("formType");
    const amountInput = document.getElementById("formAmount");

    if (!typeInput.value.trim() || !amountInput.value.trim()) {
      form.classList.add("was-validated");
      return;
    }

    const payload = {
      type: typeInput.value.trim(),
      amount: Number(amountInput.value)
    };

    saveBtn.disabled = true;
    saveBtn.innerHTML = "Saving...";

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

    saveBtn.disabled = false;
    saveBtn.innerHTML = "Save type";
  }, true); // 🔥 capture phase prevents modal conflict

  // =========================
  // UPDATE TYPE (MODAL)
  // =========================
  updateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editId) return;

    const amount = Number(document.getElementById("modalAmount").value);

    updateBtn.disabled = true;
    updateBtn.innerHTML = "Updating...";

    try {
      const res = await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });

      const data = await res.json();

      if (data.success) {
        bootstrap.Modal.getInstance(
          document.getElementById("formUpdate")
        ).hide();

        loadTypes();
        alert("✅ Updated successfully");
      } else {
        alert("❌ Update failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    updateBtn.disabled = false;
    updateBtn.innerHTML = "Save Note";
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
// TABLE RENDER
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