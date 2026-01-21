import { useState } from "react";
import questions from "../data/questions";

const Quiz = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleSelect = (option) => {
    // 1. เก็บ score
    setScore(prev => ({
      ...prev,
      [option.trait]: (prev[option.trait] || 0) + 1
    }));

    // 2. เก็บคำตอบ (optional แต่แนะนำ)
    setAnswers(prev => [...prev, option.key]);

    // 3. ไปข้อถัดไป หรือจบเกม
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish(score); // ส่ง score ไปหน้า Result
    }
  };

  const q = questions[current];

  return (
    <div>
      <h2>{q.question}</h2>
      {q.options.map(opt => (
        <button
          key={opt.key}
          onClick={() => handleSelect(opt)}
        >
          {opt.key}. {opt.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
