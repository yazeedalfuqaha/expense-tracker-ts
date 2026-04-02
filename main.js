const form = document.querySelector('.new-item-form');
const tofrom = document.querySelector('#tofrom');
const amount = document.querySelector('#amount');
const type = document.querySelector('#type');
const details = document.querySelector('#details');
const list = document.querySelector('.item-list');
const balanceTotal = document.querySelector('#balance-total');
const incomeTotal = document.querySelector('#income-total');
const spentTotal = document.querySelector('#spent-total');
const dateDisplay = document.querySelector('#current-date');
const emptyState = document.querySelector('.empty-state');
const now = new Date();
dateDisplay.textContent = now.toDateString();
class Transaction {
    constructor(c, d, a, t) {
        this.client = c;
        this.details = d;
        this.amount = a;
        this.type = t;
    }
    format() {
        return `${this.client} - £${this.amount} (${this.type})`;
    }
}
let transactions = [];
const updateTotals = () => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
        if (t.type === 'payment') {
            income += t.amount;
        }
        else {
            expense += t.amount;
        }
    });
    incomeTotal.textContent = income.toFixed(2);
    spentTotal.textContent = expense.toFixed(2);
    balanceTotal.textContent = (income - expense).toFixed(2);
};
const renderTransaction = (t, index) => {
    if (emptyState)
        emptyState.style.display = 'none';
    const li = document.createElement('li');
    li.textContent = t.format();
    li.style.borderLeft =
        t.type === 'payment'
            ? '4px solid #4caf50'
            : '4px solid #f44336';
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✖';
    deleteBtn.style.float = 'right';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.color = '#f44336';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', () => {
        transactions.splice(index, 1);
        li.remove();
        updateTotals();
        if (transactions.length === 0 && emptyState) {
            emptyState.style.display = 'block';
        }
    });
    li.appendChild(deleteBtn);
    list.appendChild(li);
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTransaction = new Transaction(tofrom.value, details.value, amount.valueAsNumber, type.value);
    transactions.push(newTransaction);
    renderTransaction(newTransaction, transactions.length - 1);
    updateTotals();
    form.reset();
});

//# sourceMappingURL=main.js.map