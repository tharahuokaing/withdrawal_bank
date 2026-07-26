/**
 * HUOKAING THARA - Withdrawal Module (Calculated)
 */
const WithdrawalModule = {
    withdrawFunds: function(amountInput) {
        const amount = parseFloat(amountInput);

        if (isNaN(amount) || amount <= 0) {
            alert("Invalid amount.");
            return;
        }

        // Add to Ledger as a negative value
        window.LedgerEngine.addEntry({
            id: "WDR-" + Math.floor(Math.random() * 10000),
            tier: "Account Holder",
            route: "Debit Withdrawal",
            volume: -amount, // Negative for deduction
            status: "Success"
        });
        
        document.getElementById("withdrawInput").value = ""; // Clear input
    }
};
window.WithdrawalModule = WithdrawalModule;
