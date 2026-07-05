const typeSelect = document.getElementById("formType");

async function loadVehicleTypes() {
    try {
        const res = await fetch("https://parkinglot-backend.vercel.app/api/types");
        const data = await res.json();
        console.log(data.data);

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