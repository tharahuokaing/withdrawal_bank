/* =========================================================
   HUOKAING THARA - WITHDRAWAL MODULE (CALCULATED & AUTO-REMOVE)
========================================================= */

const WithdrawalModule = {
    withdrawFunds: function(amountInput, buttonElement = null) {
        const amount = parseFloat(amountInput);

        if (isNaN(amount) || amount <= 0) {
            alert("Invalid amount.");
            return;
        }

        // Step 1: Add negative entry to Ledger Engine
        if (window.LedgerEngine && typeof window.LedgerEngine.addEntry === "function") {
            window.LedgerEngine.addEntry({
                id: "WDR-" + Math.floor(Math.random() * 10000),
                tier: "Account Holder",
                route: "Debit Withdrawal",
                volume: -amount, // Negative for deduction
                status: "Success"
            });
        }

        // Step 2: Handle row removal and system balance deduction if triggered via a row action button
        if (buttonElement) {
            const row = buttonElement.closest("tr");
            if (row) {
                row.style.transition = "all 0.3s ease";
                row.style.opacity = "0";
                row.style.transform = "translateX(20px)";
                setTimeout(() => row.remove(), 300);
            }
        }

        // Step 3: Deduct amount from main system balance display if present
        const totalDisplayEl = document.getElementById("displayTotalDeposits");
        if (totalDisplayEl) {
            let currentTotalText = totalDisplayEl.textContent.replace(/[^0-9.-]+/g, "");
            let currentTotal = parseFloat(currentTotalText) || 0;
            let newTotal = currentTotal - amount;
            totalDisplayEl.textContent = `$${newTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        }

        // Step 4: Clear input field
        const inputField = document.getElementById("withdrawInput");
        if (inputField) {
            inputField.value = "";
        }

        console.log(`[WITHDRAWAL SUCCESS] Processed $${amount.toFixed(2)} and updated ledger.`);
    }
};

window.WithdrawalModule = WithdrawalModule;
