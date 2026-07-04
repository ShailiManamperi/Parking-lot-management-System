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
      name: document.getElementById("registerName").value,
      email: document.getElementById("registerEmail").value,
      password: document.getElementById("registerPassword").value
    };

    try {
      const res = await fetch("https://parkinglot-backend.vercel.app/api/signin", {
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

        alert("✅ User added successfully! ID: " + data.id);
      } else {
        alert("❌ Failed to save user");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Add Item`;
  });
});