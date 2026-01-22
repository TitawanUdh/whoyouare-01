import { Image } from "react-bootstrap";
import { analyzeResult, resultNarrative } from "../utils/analyzeResult";
import "./Result.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas"; // ปลดคอมเมนต์ออก

const Result = ({ answers, setAnswers }) => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  const savedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem("myself-result");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // 🔹 ส่วนวิเคราะห์ข้อมูลชั้นสูง: หา Primary และ Secondary
  const analysis = useMemo(() => {
    // ใช้คำตอบปัจจุบัน หรือใช้ score จาก storage ถ้า answers ว่าง
    const currentAnswers =
      answers?.length > 0 ? answers : savedResult?.rawAnswers || [];
    return analyzeResult(currentAnswers);
  }, [answers, savedResult]);

  const group = analysis.primary;
  const secondaryGroup = analysis.secondary;
  const data = resultNarrative[group];

  useEffect(() => {
    if (!answers?.length || !group || !data) return;
    const resultToSave = {
      group,
      result: data,
      rawAnswers: answers, // เก็บคำตอบดิบไว้เพื่อวิเคราะห์ซ้ำ
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("myself-result", JSON.stringify(resultToSave));
  }, [answers, group, data]);

const handleSaveImage = async () => {
  const element = document.getElementById("result-export");
  if (!element) return;

  setIsGenerating(true);
  
  // เก็บสีพื้นหลังธีมไว้
  const computedStyle = window.getComputedStyle(element);
  const currentBgColor = computedStyle.backgroundColor;

  element.classList.add("exporting");

  // รอให้ UI อัปเดตและหยุด Animation (สำคัญมาก)
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const canvas = await html2canvas(element, {
      scale: 3, // เพิ่มเป็น 3 เพื่อความชัดบนมือถือ
      useCORS: true,
      backgroundColor: currentBgColor, 
      logging: false,
      // แก้ปัญหาภาพจางในระดับลึก
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.querySelector(".result-card");
        if (clonedCard) {
          clonedCard.style.background = "#ffffff"; // บังคับการ์ดขาวทึบ
          clonedCard.style.backdropFilter = "none"; 
          clonedCard.style.webkitBackdropFilter = "none";
          clonedCard.style.animation = "none"; // ปิด animation ไม่ให้ภาพฟุ้ง
        }
      }
    });

    const dataUrl = canvas.toDataURL("image/png");
    
    // สำหรับมือถือ แนะนำให้ใช้ตัวช่วยดาวน์โหลดแบบนี้
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `result-${group}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (err) {
    console.error(err);
    alert("ไม่สามารถบันทึกรูปได้");
  } finally {
    element.classList.remove("exporting");
    setIsGenerating(false);
  }
};

  const handleRestart = () => {
    localStorage.removeItem("myself-result");
    setAnswers([]);
    navigate("/");
  };

  if (!group || !data) return <p>ไม่สามารถวิเคราะห์ได้</p>;

  return (
    <div className={`result-page theme-${group}`} id="result-export">
      <div className="result-card">
        <div className="result-header text-center">
          <p className="result-label">ตัวตนหลักของคุณคือ</p>
          <h2 className="result-title">{data.title}</h2>
        </div>

        {data.image && (
          <div className="d-flex justify-content-center my-3">
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

        {/* 🔹 มิติที่ซ่อนอยู่ (วิเคราะห์ชั้นที่ 2) */}
        <div className="secondary-analysis text-start">
          <p>
            <strong>มิติที่ซ่อนอยู่:</strong> แม้คุณจะเน้นเรื่อง {data.title}
            แต่ลึกๆ คุณยังมีเฉดของ{" "}
            <strong>{resultNarrative[secondaryGroup]?.title}</strong> ผสมอยู่
            ซึ่งช่วยให้คุณเป็นคนที่มองโลกได้รอบด้านมากขึ้น
          </p>
        </div>

        <div className="result-section">
          <h4>🌱 จุดแข็ง</h4>
          <ul>
            {data.strength?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* 🔹 ดีไซน์ปุ่มใหม่ ทรงมน สีดำ-ขาว */}
        <div className="result-actions no-export">
          <button
            className="save-btn"
            onClick={handleSaveImage}
            disabled={isGenerating}
          >
            {isGenerating ? "กำลังบันทึก..." : "บันทึก"}
          </button>
          <button className="restart-btn" onClick={handleRestart}>
            เริ่มใหม่
          </button>
        </div>

        <div className="result-footer mt-4 text-center">
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นเพียงกระจกสะท้อนตัวคุณ
          </p>
          <div className="watermark">@whoyouare</div>
        </div>
      </div>
    </div>
  );
};

export default Result;
