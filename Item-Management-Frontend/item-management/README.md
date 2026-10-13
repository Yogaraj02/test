# Item Management System

Simple React frontend only. No backend or API.

Extract the ZIP, open a terminal in the item-management folder, and run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Requires Node.js 20.19+ or 22.12+ (Node 24 also works).

Enter ID, Name and Price, then click Add Item. IDs must be unique; surrounding spaces in ID and Name are trimmed. Price must be zero or more.

Edit fills the inputs. The ID stays fixed; change Name or Price and click Update Item. Cancel clears the inputs and leaves edit mode. Delete removes a record.

Data uses React useState; refreshing clears all items. Main code: src/App.jsx.

To build: npm run build. To preview the build: npm run preview.
