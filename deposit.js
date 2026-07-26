/**
 * HUOKAING THARA - Deposit Module
 * Handles processing of incoming capital and updates the system audit vault.
 */

(() => {
    "use strict";

    const DepositHandler = {
        /**
         * Processes a new deposit.
         * @param {string} amount - The numeric value of the deposit.
         * @param {string} route - The source routing method (e.g., "Wire Transfer").
         */
        processDeposit: function(amount, route = "Manual Input") {
            const numericAmount = parseFloat(amount);

            // 1. Validation
            if (isNaN(numericAmount) || numericAmount <= 0) {
                alert("Invalid transaction: Please enter a positive numerical amount.");
                return;
            }

            // 2. Prepare Transaction Data
            const newEntry = {
                id: "DEP-" + Math.floor(Math.random() * 10000),
                tier: "Retail Pool",
                route: route,
                volume: `$${numericAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`,
                status: "Success"
            };

            // 3. Update Audit Vault via LedgerEngine
            if (window.LedgerEngine) {
                window.LedgerEngine.addEntry(newEntry);
                console.log(`[DEPOSIT]: Successfully processed $${numericAmount}.`);
            } else {
                console.error("[ERROR]: LedgerEngine not found. Ensure ledger.js is loaded.");
            }
        }
    };

    // Expose to window for UI buttons
    window.DepositHandler = DepositHandler;
})();
