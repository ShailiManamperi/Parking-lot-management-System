const typeSelect = document.getElementById("formType");

async function loadVehicleTypes() {
    try {
        const res = await fetch("https://parkinglot-backend.vercel.app/api/types");
        const data = await res.json();

        if (!data.success) return;

        typeSelect.innerHTML = '<option value="">Choose Type</option>';

        data.data.forEach(type => {
            typeSelect.innerHTML += `
                <option value="${type.id}">
                    ${type.type}
                </option>
            `;
        });

    } catch (err) {
        console.error(err);
    }
}

window.addEventListener("DOMContentLoaded", loadVehicleTypes);

// =========================
// FORM SUBMIT
// =========================
const form = document.querySelector(".needs-validation");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
        vehicleNo: document.getElementById("formVehNo").value.trim(),
        ownerName: document.getElementById("formOwnName").value.trim(),
        contact: document.getElementById("formOwnNumber").value.trim(),
        nic: document.getElementById("formNic").value.trim(),
        vehicleType: document.getElementById("formType").value,
        paymentType: document.getElementById("formPayType").value
    };

    try {
        const res = await fetch(
            "https://parkinglot-backend.vercel.app/api/vehicles",
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
            alert("Vehicle Registered");

            // QR result (if backend sends it)
            if (data.qr) {
                window.open(data.qr, "_blank");
            }

            form.reset();
        }

    } catch (err) {
        console.error(err);
    }
});