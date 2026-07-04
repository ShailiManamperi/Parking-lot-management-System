document.addEventListener("DOMContentLoaded", async () => {

    const id = localStorage.getItem("selected_quote_id");
    if (!id) return;

    await loadQuote(id);
    await loadRevisions(id);

    // Add revision
    document.querySelectorAll(".needs-validation")[1]
        .addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const payload = {
                quote_id: id,
                quote_ref_new: document.getElementById("qutRef").value,
                value_amount_new: document.getElementById("Value").value,
                date_new: document.getElementById("date").value,
                quote_ref: document.getElementById("formRef").textContent,
                value_amount: document.getElementById("formValue").value,
                date: document.getElementById("formDate").value,
            };

            console.log(payload);
            const res = await fetch(
                "https://department-management-website-backe.vercel.app/api/quotationdetails",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );

            const result = await res.json();

            if (result.success) {
                 await loadQuote(id);
                 await loadRevisions(id);

                // Optional: clear revision form
                document.getElementById("qutRef").value = "";
                document.getElementById("Value").value = "";
                document.getElementById("date").value = "";

                alert("Revision added successfully");
            }
        });
});


// =========================
// LOAD MAIN QUOTE
// =========================
async function loadQuote(id) {

    const res = await fetch(
        `https://department-management-website-backe.vercel.app/api/quotationdetails?id=${id}`
    );

    const data = await res.json();

    if (!data.success) return;

    const q = data.quote;
    console.log(q.profir); 
    document.getElementById("formRef").textContent =q.quote_ref || "Quote Ref";
    document.getElementById("formProject").value = q.project_name || "";
    document.getElementById("formClient").value = q.client_name || "";
    document.getElementById("formSC").value = q.sale_center || "";
    document.getElementById("formSP").value = q.sales_person || "";
    document.getElementById("formValue").value = q.value_amount || "";
    document.getElementById("formProfit").value = q.profir || "";
    document.getElementById("formGp").value = q.gp_amount || "";
    document.getElementById("formDate").value = q.quotation_date?.split("T")[0] || "";
    document.getElementById("formScope").value = q.scope || "";
    document.getElementById("formStatus").value = q.status || "";
    document.getElementById("formRemark").value = q.remark || "";

    const refEl = document.getElementById("formRef");

    if (refEl) {
        refEl.textContent = q.quote_ref || "Quote Ref";
    }
}


// =========================
// LOAD REVISIONS TABLE
// =========================
async function loadRevisions(id) {

    const res = await fetch(
        `https://department-management-website-backe.vercel.app/api/quotationdetails?id=${id}`
    );

    const data = await res.json();

    const tbody = document.querySelector("#quotesTable tbody");
    tbody.innerHTML = "";

    data.revisions.forEach((r, i) => {

        tbody.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${r.quote_ref}</td>
                <td>${r.revision_date.split("T")[0]}</td>
                <td>${r.value_amount}</td>
            </tr>
        `;
    });
}