import { Button, Image } from "react-bootstrap";
import { analyzeResult, resultNarrative } from "../utils/analyzeResult";
import "./Result.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const Result = ({ answers, setAnswers }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Hooks (ต้องอยู่บนสุด)
  const savedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem("myself-result");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  const score = answers?.length > 0
    ? answers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {})
    : savedResult?.score || null;

  const group = score ? analyzeResult(score)[0] : savedResult?.group;
  const data = group ? resultNarrative[group] : savedResult?.result;

  useEffect(() => {
    if (!answers?.length || !group || !data) return;
    const resultToSave = { group, score, result: data, timestamp: new Date().toISOString() };
    localStorage.setItem("myself-result", JSON.stringify(resultToSave));
  }, [answers, group, data, score]);

  // 2. Logic การ Save รูป (ซ่อนปุ่มอัตโนมัติ)
  const handleSaveImage = async () => {
  const element = document.getElementById("result-export");
  if (!element) return;

  setIsGenerating(true);
  
  // 1. ใส่ class เพื่อซ่อนปุ่มผ่าน CSS ทันที
  element.classList.add("exporting");

  // 2. รอเล็กน้อยให้ Browser อัปเดต UI (แก้ปุ่มไม่หาย)
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const canvas = await html2canvas(element, {
      scale: 2, 
      useCORS: true,
      backgroundColor: "#f3faef", // แก้ปัญหารูปจาง/พื้นหลังหาย
      logging: false,
    });

    const dataUrl = canvas.toDataURL("image/png");
    
    // สร้างตัวดาวน์โหลดชั่วคราว
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `result-${group}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error(err);
    alert("เกิดข้อผิดพลาดในการบันทึก");
  } finally {
    // 3. เอา class ออกเพื่อให้ปุ่มกลับมาแสดงบนหน้าเว็บ
    element.classList.remove("exporting");
    setIsGenerating(false);
  }
};

  const handleRestart = () => {
    localStorage.removeItem("myself-result");
    setAnswers([]);
    navigate("/");
  };

  if (!score || !group || !data) return <p>ไม่สามารถวิเคราะห์ได้</p>;

  return (
<div className={`result-page theme-${group}`} id="result-export">
    <div className="result-card">
              <div className="result-header text-center">
          <p className="result-label">ผลลัพธ์ของคุณ</p>
          <h2 className="result-title">{data.title}</h2>
        </div>

        {data.image && (
          <div className="d-flex justify-content-center my-3">
            <Image className="result-image" src={data.image} alt={data.title} fluid />
          </div>
        )}

        <div className="result-story">
          <p>{data.story}</p>
        </div>

        <div className="result-section">
          <h4>🌱 จุดแข็ง</h4>
          <ul>
            {data.strength?.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        {/* 🔹 ส่วนของปุ่มที่จะถูกซ่อนเวลา Save */}
       <div className="result-actions no-export">
        <Button className="save-btn" onClick={handleSaveImage} disabled={isGenerating}>
          {isGenerating ? "กำลังบันทึก..." : "บันทึกรูปภาพ"}
        </Button>
        <Button className="restart-btn" onClick={handleRestart}>
          เริ่มใหม่
        </Button>
      </div>

        <div className="result-footer mt-4 text-center">
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นเพียงกระจกสะท้อนตัวคุณ
          </p>
          <div className="watermark" style={{ fontWeight: 'bold', opacity: 0.5 }}>@whoyouare</div>
        </div>
      </div>
    </div>
  );
};

export default Result;