window.addEventListener("load", () => {
  const form = document.querySelector(".needs-validation");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Validation
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Saving...";

    const payload = {
      name: document.getElementById("registerName").value.trim(),
      email: document.getElementById("registerEmail").value.trim(),
      password: document.getElementById("registerPassword").value
    };

    try {
      const res = await fetch(
        "https://parkinglot-backend.vercel.app/api/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (data.success) {
        // Save user details in localStorage
        const user = {
          name: payload.name,
          email: payload.email
        };

        localStorage.setItem(
          "user_profile",
          JSON.stringify(user)
        );

        form.reset();
        form.classList.remove("was-validated");

        alert("✅ User registered successfully!");

        // Redirect to login page
        window.location.href = "login.html";
      } else {
        alert("❌ Failed to register user");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Register`;
  });
});