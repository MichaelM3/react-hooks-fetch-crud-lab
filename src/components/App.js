import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => {
      setQuestions([...data])
    })
  }, []); 

  function updateQuestions(newQuestion) {
    const newQuestionArray = [...questions, newQuestion]
    setQuestions(newQuestionArray)
    setPage("List")
  }

  function deleteQuestion(questionID) {
    fetch(`http://localhost:4000/questions/${questionID}`, {method: 'DELETE'})
    const newQuestionArray = questions.filter(question => question.id !== questionID)
    setQuestions(newQuestionArray)
  }

  function updateCorrectAnswer(id, newCorrectIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        correctIndex: newCorrectIndex
      })
    })
    const newQuestionArray = questions.map(question => {
      if (question.id === id) {
        return { ...question, correctIndex: newCorrectIndex}
      } else {
        return question
      }
    })
    setQuestions(newQuestionArray)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm questions={questions} updateQuestions={updateQuestions}/> 
        : 
        <QuestionList updateCorrectAnswer={updateCorrectAnswer} deleteQuestion={deleteQuestion} questions={questions}/>
      }
    </main>
  );
}

export default App;
