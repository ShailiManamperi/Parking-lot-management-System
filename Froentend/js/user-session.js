(function () {
  const user = localStorage.getItem("user_profile");

  console.log("User:", user);

  if (!user) {
    // Don't redirect if already on profile page
    if (!window.location.pathname.includes("profile.html")) {
      window.location.href = "login.html";
    }
  }
})();