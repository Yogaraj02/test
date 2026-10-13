# Quiz App

Simple React frontend only. No backend or API.

Extract the ZIP, open a terminal in the quiz-app folder, and run:

```sh
npm install
npm run dev
```

Open the local URL printed in the terminal. Requires Node.js 20.19+ or 22.12+ (Node 24 also works).

Enter a question, two options, and the correct answer. Add Question creates it. Edit fills the form; Update Question saves changes. Delete removes it.

Start Quiz shows the questions with radio options. Select answers and click Submit Quiz to see your score. Unanswered questions receive zero points. Close Quiz resets the attempt. Changing questions clears answers and score; changing an answer clears the previous score until you submit again.

Data uses React useState; refreshing clears all questions. Main code: src/App.jsx.

To build: npm run build. To preview the build: npm run preview.
