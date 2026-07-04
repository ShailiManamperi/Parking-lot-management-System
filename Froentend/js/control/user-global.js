(function () {

    const user = JSON.parse(localStorage.getItem("user_profile"));

    if (!user) return;

    // Update navbar name (ALL pages)
    const navName = document.getElementById("navProfileName");
    if (navName) {
        navName.textContent = user.name || "Admin";
    }

})();