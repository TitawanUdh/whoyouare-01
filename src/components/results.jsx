import {
  analyzeResult,
  resultNarrative,
  resultText,
} from "../utils/analyzeResult";
import "./Result.css";
const Result = ({ answers }) => {
  const score = answers.reduce((acc, answer) => {
    acc[answer] = (acc[answer] || 0) + 1;
    return acc;
  }, {});

  if (!score || Object.keys(score).length === 0) {
    return <p>ไม่สามารถวิเคราะห์ได้</p>;
  }

  // const [group, value] = analyzeResult(score);
  const [group] = analyzeResult(score);
  const data = resultNarrative[group];

  if (!data) {
    return <p>ไม่พบผลลัพธ์ที่ตรงกับคุณ</p>;
  }

  return (
    <div className={`result-page theme-${group || "default"}`}>
      <div className="result-card">
        <div className="result-header">
          <span className="result-label">ผลลัพธ์ของคุณ</span>
          <h2 className="result-title">{data.title}</h2>
        </div>

        <div className="result-story">
          <p>{data.story}</p>
        </div>

        <div className="result-section">
          <h4>🌱 จุดแข็ง</h4>
          <ul>
            {data.strength.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="result-section caution">
          <h4>⚠️ สิ่งที่ควรระวัง</h4>
          <ul>
            {data.caution.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="result-footer">
          <p>
            ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นเพียง
            “กระจกสะท้อนตัวคุณในช่วงเวลานี้”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
