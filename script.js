document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const numPeople = parseInt(document.getElementById('numPeople').value);

    // Calculate the share per person
    const share = Math.floor((amount / numPeople).toFixed(2));

    // Create a new expense object
    const newExpense = {
        description: description,
        amount: amount.toFixed(2),
        share: share
    };

    // Get existing expenses from localStorage or initialize with an empty array
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Add the new expense to the beginning of the array
    expenses.unshift(newExpense);

    // Keep only the most recent 15 expenses
    if (expenses.length > 10) {
        expenses = expenses.slice(0, 10);
    }

    // Save the updated expenses array to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Update the expense list on the page
    renderExpenses();

    // Clear the form
    document.getElementById('expenseForm').reset();
});

// Function to render the expenses from localStorage
function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = ''; // Clear existing expense items

    // Get expenses from localStorage
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Loop through the expenses and create a new expense item for each
    expenses.forEach(expense => {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <strong>${expense.description}</strong>
            <p>Total Amount: ₹${expense.amount}</p>
            <p>Share per Person: ₹${expense.share}</p>
        `;
        expenseList.appendChild(expenseItem);
    });
}

// Call renderExpenses when the page loads to display stored expenses
document.addEventListener('DOMContentLoaded', renderExpenses);

// Add event listener for the "Clear All Expenses" button
document.getElementById('clearExpensesBtn').addEventListener('click', function() {
    // Clear the expenses from localStorage
    localStorage.removeItem('expenses');

    // Update the expense list on the page
    renderExpenses();
});
