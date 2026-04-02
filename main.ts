const form = document.querySelector('.new-item-form') as HTMLFormElement;

const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;
const type = document.querySelector('#type') as HTMLSelectElement;
const details = document.querySelector('#details') as HTMLInputElement;

const list = document.querySelector('.item-list') as HTMLUListElement;

const balanceTotal = document.querySelector('#balance-total') as HTMLSpanElement;
const incomeTotal = document.querySelector('#income-total') as HTMLSpanElement;
const spentTotal = document.querySelector('#spent-total') as HTMLSpanElement;

const dateDisplay = document.querySelector('#current-date') as HTMLParagraphElement;
const emptyState = document.querySelector('.empty-state') as HTMLLIElement;

const now = new Date();
dateDisplay.textContent = now.toDateString();

class Transaction {
  readonly client: string;
  private details: string;
  public amount: number;
  public type: 'payment' | 'invoice';

  constructor(c: string, d: string, a: number, t: 'payment' | 'invoice') {
    this.client = c;
    this.details = d;
    this.amount = a;
    this.type = t;
  }

  format(): string {
    return `${this.client} -  £ ${this.amount} (${this.type})`;
  }
}

let transactions: Transaction[] = [];

const updateTotals = (): void => {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'payment') {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  incomeTotal.textContent = income.toFixed(2);
  spentTotal.textContent = expense.toFixed(2);
  balanceTotal.textContent = (income - expense).toFixed(2);
};

const renderTransaction = (t: Transaction, index: number): void => {
 
  if (emptyState) emptyState.style.display = 'none';

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

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  const newTransaction = new Transaction(
    tofrom.value,
    details.value,
    amount.valueAsNumber,
    type.value as 'payment' | 'invoice'
  );

  transactions.push(newTransaction);

  renderTransaction(newTransaction, transactions.length - 1);
  updateTotals();

  form.reset();
});


