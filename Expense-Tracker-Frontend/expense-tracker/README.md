# Expense Tracker

Simple React frontend only. No backend or API.

Extract the ZIP and open a terminal in this folder:

```sh
npm install
npm run dev
```

Open the local URL shown in the terminal.

Enter expense name and amount, then click Add Expense. Click Edit, change details, and click Update Expense. Click Delete to remove a record. Total Expense updates automatically. Amount must be at least ₹0.01 in increments of ₹0.01.

Data stays in useState; refreshing clears it. IDs are generated internally.

CRUD code: src/App.jsx. Simple styling: src/App.css.
