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

  const analysis = useMemo(() => {
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
      rawAnswers: answers,
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

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: currentBgColor,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCard = clonedDoc.querySelector(".result-card");
          if (clonedCard) {
            clonedCard.style.background = "#ffffff"; // บังคับการ์ดขาวทึบ
            clonedCard.style.backdropFilter = "none";
            clonedCard.style.webkitBackdropFilter = "none";
            clonedCard.style.animation = "none"; // ปิด animation ไม่ให้ภาพฟุ้ง
          }
        },
      });

      const dataUrl = canvas.toDataURL("image/png");

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
    <div className={`result-page theme-${group} `} id="result-export">
      <div className="result-page theme-x" id="result-export">

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

        <div className="secondary-analysis text-start">
          <p>
            <strong>มิติที่ซ่อนอยู่:</strong> แม้คุณจะเน้นเรื่อง {data.title}
            แต่ลึกๆ คุณยังมีเฉดของ{" "}
            <strong>{resultNarrative[secondaryGroup]?.title}</strong> ผสมอยู่
            ซึ่งช่วยให้คุณเป็นคนที่มองโลกได้รอบด้านมากขึ้น
          </p>
        </div>



        <div className="result-footer mt-4 text-center">
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            ผลลัพธ์นี้ไม่ใช่คำตัดสิน แต่เป็นเพียงกระจกสะท้อนตัวคุณ
          </p>
          <div className="watermark">@whoyouare</div>
        </div>
      </div>

      <div className="result-card">
        <div className="result-section">
          <h5>อาชีพที่เหมาะกับคุณ</h5>
          <ul>
            {data.job?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="result-section">
          <h4>สไตล์งานที่ใช่</h4>
          <ul>
            {data.style?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="result-section">
          <h4>🌱 จุดแข็ง</h4>
          <ul>
            {data.strength?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="result-section">
          <h4>🌗 สิ่งที่ควรระวัง</h4>
          <ul>
            {analysis.weaknesses.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
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
      </div>
    
  );
};

export default Result;
