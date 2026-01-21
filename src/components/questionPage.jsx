import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import questions from "./question";

function QuestionPage({ answers, setAnswers }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionIndex = Number(id) - 1;
  const question = questions[questionIndex];

  if (!question) return <div>ไม่พบคำถาม</div>;

  const handleSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = option.trait;
    setAnswers(newAnswers);

    if (questionIndex + 1 < questions.length) {
      navigate(`/question/${questionIndex + 2}`);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="App ">
      <div className="question-page">
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="question-title">
            <h2>{question.question}</h2>
          </div>
          {question.options.map((opt) => (
            <div
              key={opt.key}
              className="option"
              onClick={() => handleSelect(opt)}
            >
              {opt.key}. {opt.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
