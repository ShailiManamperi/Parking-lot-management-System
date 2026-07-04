let allTypes = [];

const API_BASE = "https://parkinglot-backend.vercel.app/api/types";

window.addEventListener("load", () => {
  loadTypes();

  const form = document.getElementById("typeForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const payload = {
      type: document.getElementById("formType").value,
      amount: document.getElementById("formAmount").value
    };

    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        form.reset();
        form.classList.remove("was-validated");

        await loadTypes();

        alert("✅ Type added successfully!");
      } else {
        alert("❌ Failed to save type");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Save type`;
  });
});

// =====================
// LOAD TYPES
// =====================
async function loadTypes() {
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();

    if (data.success) {
      allTypes = data.data;
      renderTypes();
    }

  } catch (err) {
    console.error("Load error:", err);
  }
}

// =====================
// RENDER TABLE
// =====================
function renderTypes() {
  const tbody = document.querySelector("#typesTable tbody");
  tbody.innerHTML = "";

  allTypes.forEach((item, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.type}</td>
        <td>${item.amount}</td>
      </tr>
    `;
  });
}