import { Image } from "react-bootstrap";
import { analyzeResult, resultNarrative } from "../utils/analyzeResult";
import "./Result.css";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const Result = ({ answers, setAnswers }) => {
  // 🔹 1. ดึงข้อมูลจาก localStorage (ครั้งเดียว)
  const navigate = useNavigate();

  const handleRestart = () => {
    localStorage.removeItem("myself-result"); // 🧹 ล้างผลลัพธ์
    setAnswers([]); // 🔄 reset answers
    navigate("/"); // 🏠 กลับหน้าแรก
  };

  const savedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem("myself-result");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // 🔹 2. สร้าง score จาก answers (ถ้ามี)
  const score =
    answers && answers.length > 0
      ? answers.reduce((acc, answer) => {
          acc[answer] = (acc[answer] || 0) + 1;
          return acc;
        }, {})
      : savedResult?.score || null;

  // 🔹 3. หา group
  const group = score ? analyzeResult(score)[0] : savedResult?.group;

  // 🔹 4. หา data
  const data = group ? resultNarrative[group] : savedResult?.result;

  // 🔹 5. บันทึกลง localStorage (เฉพาะกรณีมี answers ใหม่)
  useEffect(() => {
    if (!answers || answers.length === 0 || !group || !data) return;

    const resultToSave = {
      group,
      score,
      result: data,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("myself-result", JSON.stringify(resultToSave));
  }, [answers, group, data, score]);

  // 🔹 6. Guard สุดท้าย
  if (!score || !group || !data) {
    return <p>ไม่สามารถวิเคราะห์ได้</p>;
  }

const handleSaveImage = async () => {
  const element = document.getElementById("result-export");
  if (!element) {
    alert("ไม่พบ element");
    return;
  }

  // เข้าโหมด export
  element.classList.add("exporting");

  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: "#f3faef",
      useCORS: true,
      windowWidth: 390, // fix mobile width
    });

    const dataUrl = canvas.toDataURL("image/png");

    // ✅ iOS-safe: เปิดแท็บใหม่
    const win = window.open();
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Save Image</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="margin:0; text-align:center; background:#f3faef;">
            <img src="${dataUrl}" style="width:100%; height:auto;" />
            <p style="font-family:sans-serif; padding:12px;">
              กดค้างที่รูปเพื่อบันทึก
            </p>
          </body>
        </html>
      `);
    }
  } catch (err) {
    console.error(err);
    alert("ไม่สามารถบันทึกรูปได้");
  } finally {
    element.classList.remove("exporting");
  }
};


  // 🔹 7. Render ปกติ
  return (
<div
  className={`result-page theme-${group}`}
  id="result-export"
>
      <div className="result-card">
        <div className="result-header">
          <p className="result-label">ผลลัพธ์ของคุณ</p>
          <h2 className="result-title">{data.title}</h2>
        </div>
        {data.image && (
          <div className="d-flex justify-content-center">
            <Image
              className="result-image"
              src={data.image}
              alt={data.title}
              fluid
            />
          </div>
        )}
        <div className="result-story">
          <p>{data.story}</p>
        </div>
        <div className="result-section">
          <h4>🌱 จุดแข็ง</h4>
          <ul>
            {data.strength?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="result-actions no-export">
          <button className="save-btn" onClick={handleSaveImage}>
            บันทึก
          </button>

          <button className="restart-btn" onClick={handleRestart}>
            ทำแบบทดสอบใหม่
          </button>
        </div>
        <div className="result-footer">
          <p>
            ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นเพียง
            “กระจกสะท้อนตัวคุณในช่วงเวลานี้”
          </p>
        </div>{" "}
        <div className="watermark">@whoyouare</div>
      </div>
    </div>
  );
};

export default Result;
