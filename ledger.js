/**
 * HUOKAING THARA - Asset & Ledger Engine (Persistent)
 */
(() => {
    "use strict";

    // Load initial data from storage or set defaults
    const savedData = JSON.parse(localStorage.getItem('ht_ledger_data')) || [
        { id: "DEP-LN-9901", tier: "Corporate Wholesale", route: "Bakong Network Sweep", volume: 576455000, status: "Success" },
        { id: "DEP-LN-9905", tier: "Corporate Wholesale", route: "Real-time Gross Settlement", volume: 576455000, status: "Success" }
    ];

    const LedgerEngine = {
        data: savedData,

        renderLedger: () => {
            const tbody = document.getElementById("depositLogBody");
            if (!tbody) return;
            
            tbody.innerHTML = LedgerEngine.data.map(log => `
                <tr>
                    <td>${log.id}</td>
                    <td>${log.tier}</td>
                    <td>${log.route}</td>
                    <td>$${log.volume.toLocaleString()}</td>
                    <td><span class="badge ${log.status.toLowerCase()}">${log.status}</span></td>
                </tr>
            `).join("");
            
            // Save state to browser storage
            localStorage.setItem('ht_ledger_data', JSON.stringify(LedgerEngine.data));
            LedgerEngine.updateTotal();
        },

        updateTotal: () => {
            const total = LedgerEngine.data.reduce((sum, item) => sum + item.volume, 0);
            const el = document.getElementById("displayTotalDeposits");
            if (el) el.innerText = `$${total.toLocaleString()}`;
        },

        addEntry: (entry) => {
            LedgerEngine.data.unshift(entry);
            LedgerEngine.renderLedger();
        }
    };

    document.addEventListener("DOMContentLoaded", () => LedgerEngine.renderLedger());
    window.LedgerEngine = LedgerEngine;
})();
