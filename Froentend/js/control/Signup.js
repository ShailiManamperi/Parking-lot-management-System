window.addEventListener("load", () => {
  const form = document.querySelector(".needs-validation");

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.innerHTML = "Logging in...";

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    console.log(email,password);

    try {
      const res = await fetch(
        `https://parkinglot-backend.vercel.app/api/signin?email=${encodeURIComponent(email)}`
      );

      const data = await res.json();
      console.log(data);

      if (!data.success || !data.data) {
        alert("❌ User not found");
        return;
      }

      const usercheck = data.data;
      console.log(usercheck);

      if (usercheck[0].password === password) {
        form.reset();
        form.classList.remove("was-validated");

        alert("✅ Login successful!");

        window.location.href = "index.html";
      } else {
        alert("❌ Incorrect password");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }

    btn.disabled = false;
    btn.innerHTML = `<i class="bi bi-send"></i> Login`;
  });
});