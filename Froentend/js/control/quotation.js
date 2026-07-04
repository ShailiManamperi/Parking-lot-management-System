window.addEventListener("load", () => {
  const form = document.querySelector(".needs-validation");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();

    // Bootstrap validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const payload = {
      quote_ref: document.getElementById("formRef").value,
      project_name: document.getElementById("formProject").value,
      client_name: document.getElementById("formClient").value,
      scope: document.getElementById("formScope").value,
      sale_center: document.getElementById("formSC").value,
      sales_person: document.getElementById("formSP").value,
      value_amount: document.getElementById("formValue").value,
      gp_amount: document.getElementById("formGp").value,
      profit: document.getElementById("formProfit").value,
      status: document.getElementById("formStatus").value,
      date: document.getElementById("formDate").value,
      revision_count: 0,
      remark: document.getElementById("formRemark").value
    };

    try {
      const res = await fetch("https://department-management-website-backe.vercel.app/api/quotation", {
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

        alert("✅ Saved successfully! ID: " + data.id);
      } else {
        alert("❌ Failed to save");
        console.log(data);
      }

    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Submit Form`;
  });
});