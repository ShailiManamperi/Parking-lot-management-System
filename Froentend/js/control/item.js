window.addEventListener("load", () => {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const payload = {
      type: document.getElementById("formType").value,
      name: document.getElementById("formName").value,
      brand: document.getElementById("formBrand").value,
      wattage: document.getElementById("formWat").value,
      lumen: document.getElementById("formLumen").value,
      ip: document.getElementById("formIP").value,
      cct: document.getElementById("formCCT").value,
      other: document.getElementById("formOther").value,
      supplier: document.getElementById("formSupplier").value,
      price: document.getElementById("formBudget").value
    };

    try {
      const res = await fetch("https://department-management-website-backe.vercel.app/api/item", {
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

        alert("✅ Item added successfully! ID: " + data.id);
      } else {
        alert("❌ Failed to save item");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Add Item`;
  });
});