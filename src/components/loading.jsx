import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Ads01 from "../assets/images/ads-1.jpg";

export default function LoadingResult() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const [showButton, setShowButton] = useState(false);
  const [phase, setPhase] = useState("loading");
useEffect(() => {
  const timer1 = setTimeout(() => {
    setPhase("dissolve"); // เริ่มสลาย
  }, 8000);

  const timer2 = setTimeout(() => {
    setPhase("reveal"); // ปุ่มใหม่โผล่
  }, 9000);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
}, []);

  useEffect(() => {
    if (countdown <= 0) {
      setShowButton(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="loading-page">
      {/* 🔹 โฆษณา */}
      <a
        href="https://s.shopee.co.th/1Vt8BBV30l"
        target="_blank"
        rel="noopener noreferrer"
        className="ads-link"
      >
        <div className="ad-box">
          <h2 className="mt-3">เล่มเดียวจบ</h2>
          <p className="ads-text">ไม่ต้องเสียเงินซื้อคอร์สหลักพัน</p>
          <Image src={Ads01} alt="ads" />
          <div className="d-flex justify-content-center my-3">
            <Button className="ads-button">ซื้อเลย</Button>
          </div>
        </div>
      </a>


      <div className="reveal-wrapper d-flex flex-column justify-content-center align-items-center pt-5">
        {phase === "loading" && (
          <div className="reveal-button loading">กำลังประมวลผล…</div>
        )}

        {phase === "dissolve" && (
          <div className="reveal-button dissolve">กำลังประมวลผล…</div>
        )}

        {phase === "reveal" && (
          <Button
            className="reveal-button reveal"
            onClick={() => navigate("/result")}
          >
            เปิดเผยผลลัพธ์
          </Button>
        )}
      </div>
    </div>
  );
}
