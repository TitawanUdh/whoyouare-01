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
      localStorage.setItem("quizScore", JSON.stringify(newAnswers));
      navigate("/loading");
    }
  };

  return (
    <div className="App ">
      <div className="question-page" key={question.id || question.question}>
        {/* 🔹 ใส่ key ไว้ที่นี่ เมื่อค่านี้เปลี่ยน React จะ Reset UI ทั้งหมดในนี้ */}
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <div className="question-title">
            <h2>{question.question}</h2>
          </div>
          {question.options.map((opt) => (
            <div
              key={`${question.id}-${opt.key}`} // 🔹 ใช้ key ที่รวม id ข้อเข้าไปด้วย
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
