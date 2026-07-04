document.addEventListener("DOMContentLoaded", () => {

    // Load existing profile if available
    loadProfile();

    const form = document.querySelector(".needs-validation");

    // Live update profile card while typing
    const fields = [
        "profileName",
        "profileEmail",
        "department",
        "job"
    ];

    fields.forEach(id => {
        const element = document.getElementById(id);

        if (element) {
            element.addEventListener("input", updateLiveCard);
        }
    });

    // Save profile
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const user = getFormData();

        if (!user.name || !user.email) {
            alert("Name and Email are required.");
            return;
        }

        localStorage.setItem(
            "user_profile",
            JSON.stringify(user)
        );

        // ✅ NAVBAR UPDATE (ADDED ONLY)
        updateNavbarName(user);

        alert("Profile saved successfully.");
    });
});


// ======================
// Get form data
// ======================
function getFormData() {
    return {
        name: document.getElementById("profileName").value.trim(),
        email: document.getElementById("profileEmail").value.trim(),
        department: document.getElementById("department").value.trim(),
        job: document.getElementById("job").value.trim()
    };
}


// ======================
// Load profile from localStorage
// ======================
function loadProfile() {
    const user = JSON.parse(
        localStorage.getItem("user_profile")
    );

    if (!user) return;

    document.getElementById("profileName").value =
        user.name || "";

    document.getElementById("profileEmail").value =
        user.email || "";

    document.getElementById("department").value =
        user.department || "";

    document.getElementById("job").value =
        user.job || "";

    updateProfileCard(user);

    // ✅ NAVBAR UPDATE (ADDED ONLY)
    updateNavbarName(user);
}


// ======================
// Live update while typing
// ======================
function updateLiveCard() {
    const user = getFormData();
    updateProfileCard(user);

    // ✅ NAVBAR UPDATE (ADDED ONLY)
    updateNavbarName(user);
}


// ======================
// Update left profile card
// ======================
function updateProfileCard(user) {
    const cardName = document.getElementById("cardName");
    const cardJob = document.getElementById("cardJob");
    const cardEmail = document.getElementById("cardEmail");
    const cardDepartment = document.getElementById("cardDepartment2");

    if (cardName)
        cardName.textContent = user.name || "";

    if (cardJob)
        cardJob.textContent = user.job || "";

    if (cardEmail)
        cardEmail.textContent = user.email || "";

    if (cardDepartment)
        cardDepartment.textContent = user.department || "";
}


// ======================
// NAVBAR ONLY (NEW ADDED FUNCTION)
// ======================
function updateNavbarName(user) {
    const navName = document.getElementById("navProfileName");

    if (navName) {
        navName.textContent = user.name || "Admin";
    }
}