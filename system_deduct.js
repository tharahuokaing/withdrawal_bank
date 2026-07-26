/* =========================================================
   HUOKAING THARA SYSTEM - ROW REMOVAL & LEDGER DEDUCTION
========================================================= */

/**
 * Removes a specific table row after execution and deducts its amount from the system total.
 * @param {HTMLElement} buttonElement - The action button clicked inside the row.
 * @param {string} systemTotalSelector - CSS selector for the main ledger total display element.
 */
function executeAndDeductRow(buttonElement, systemTotalSelector) {
    "use strict";

    // Step 1: Locate the parent table row (tr)
    const targetRow = buttonElement.closest("tr");
    if (!targetRow) {
        console.warn("[SYSTEM ERROR] Target row not found.");
        return;
    }

    // Step 2: Extract the amount value from a designated cell (assuming price/amount is in data attribute or cell text)
    // Example: <td class="item-amount" data-amount="50.00">$50.00</td>
    const amountCell = targetRow.querySelector(".item-amount") || targetRow.cells[1]; 
    
    let rawText = amountCell ? amountCell.textContent.replace(/[^0-9.-]+/g, "") : "0";
    const itemAmount = parseFloat(rawText) || 0;

    // Step 3: Update the system ledger total (deducting the amount back)
    const systemTotalEl = document.querySelector(systemTotalSelector);
    if (systemTotalEl) {
        let currentTotalText = systemTotalEl.textContent.replace(/[^0-9.-]+/g, "");
        let currentTotal = parseFloat(currentTotalText) || 0;
        
        // Subtract the executed item's amount from the system balance
        let newTotal = currentTotal - itemAmount;
        
        // Format back to currency representation
        systemTotalEl.textContent = `$${newTotal.toFixed(2)}`+ (systemTotalEl.dataset.currency || "");
        console.log(`[SYSTEM LEDGER] Deducted $${itemAmount.toFixed(2)}. New System Total: $${newTotal.toFixed(2)}`);
    }

    // Step 4: Add a brief fade-out or execution transition class, then remove the row
    targetRow.style.transition = "all 0.3s ease";
    targetRow.style.opacity = "0";
    targetRow.style.transform = "translateX(20px)";

    setTimeout(() => {
        targetRow.remove();
        console.log("[SYSTEM MODULE] Executed row successfully removed from interface.");
    }, 300);
}

// Example Initialization Event Listener for Execution Buttons
document.addEventListener("DOMContentLoaded", () => {
    // Attach listener to dynamic or static execute/remove buttons
    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("btn-execute-remove")) {
            executeAndDeductRow(e.target, "#systemLedgerTotal");
        }
    });
});
