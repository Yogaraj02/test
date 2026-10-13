import { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [correct, setCorrect] = useState("A");
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !optionA.trim() || !optionB.trim()) {
      alert("Enter all details");
      return;
    }
    const item = { id: editId === null ? Date.now() : editId,
      question, optionA, optionB, correct };
    setQuestions(editId === null ? [...questions, item]
      : questions.map((q) => q.id === editId ? item : q));
    setEditId(null);
    setQuestion(""); setOptionA(""); setOptionB(""); setCorrect("A");
    setAnswers({}); setScore(null);
  };

  const editQuestion = (q) => {
    setQuestion(q.question); setOptionA(q.optionA);
    setOptionB(q.optionB); setCorrect(q.correct); setEditId(q.id);
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
    setAnswers({}); setScore(null);
    if (editId === id) {
      setQuestion(""); setOptionA(""); setOptionB("");
      setCorrect("A"); setEditId(null);
    }
    if (questions.length === 1) setQuizMode(false);
  };

  const submitQuiz = () => {
    let result = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) result++;
    });
    setScore(result);
  };

  return (
    <div>
      <h1>Quiz App</h1>
      <form onSubmit={handleSubmit}>
        <input aria-label="Enter question" placeholder="Enter question" value={question}
          onChange={(e) => setQuestion(e.target.value)} />
        <input aria-label="Option A" placeholder="Option A" value={optionA}
          onChange={(e) => setOptionA(e.target.value)} />
        <input aria-label="Option B" placeholder="Option B" value={optionB}
          onChange={(e) => setOptionB(e.target.value)} />
        <label htmlFor="correct">Correct Answer: </label>
        <select id="correct" value={correct} onChange={(e) => setCorrect(e.target.value)}>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </select>
        <button type="submit">{editId === null ? "Add Question" : "Update Question"}</button>
      </form>
      <h2>Question List</h2>
      {questions.map((q, index) => (
        <div key={q.id}>
          <p>{index + 1}. {q.question}</p>
          <p>A. {q.optionA}</p>
          <p>B. {q.optionB}</p>
          <button onClick={() => editQuestion(q)}>Edit</button>
          <button onClick={() => deleteQuestion(q.id)}>Delete</button>
          <hr />
        </div>
      ))}
      <button disabled={questions.length === 0} onClick={() => {
        setQuizMode(!quizMode); setAnswers({}); setScore(null);
      }}>{quizMode ? "Close Quiz" : "Start Quiz"}</button>
      {quizMode && (
        <div>
          <h2>Attempt Quiz</h2>
          {questions.map((q, index) => (
            <div key={q.id}>
              <p>{index + 1}. {q.question}</p>
              <label>
                <input type="radio" name={"answer-" + q.id} checked={answers[q.id] === "A"}
                  onChange={() => { setAnswers({ ...answers, [q.id]: "A" }); setScore(null); }} />
                {q.optionA}
              </label>
              <br />
              <label>
                <input type="radio" name={"answer-" + q.id} checked={answers[q.id] === "B"}
                  onChange={() => { setAnswers({ ...answers, [q.id]: "B" }); setScore(null); }} />
                {q.optionB}
              </label>
            </div>
          ))}
          <button onClick={submitQuiz}>Submit Quiz</button>
          {score !== null && <h2>Your Score: {score} / {questions.length}</h2>}
        </div>
      )}
    </div>
  );
}

export default App;
