import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdsBook01 from "../assets/images/ads-book-1.jpg";
import AdsBook06 from "../assets/images/ads-book-6.jpg";

export default function LoadingResult() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);
  const [phase, setPhase] = useState("loading");
  const adsImages = [
    AdsBook01,
    AdsBook06,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % adsImages.length);
    }, 2500); // เปลี่ยนทุก 2.5 วิ

    return () => clearInterval(interval);
  }, []);

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
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="loading-page d-flex flex-column justify-content-center align-items-center">
      {/* 🔹 โฆษณา */}
      {/* background effects */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      <div className="fog fog1" />
      <div className="fog fog2" />
      <a
        href="https://s.shopee.co.th/AUnx5oAs34"
        target="_blank"
        rel="noopener noreferrer"
        className="ads-link"
      >
        <div className="ad-box">
          <h2 className="mt-3">เคยถามตัวเองไหม ?</h2>
          <p className="ads-text">  เรามีชีวิตอยู่เพื่ออะไร คำถามนี้อาจไม่มีคำตอบตายตัว แต่แน่นอนว่า "ถึงเราจะเลือกเกิดไม่ได้ แต่เราเลือกที่จะมีชีวิตที่ดีได้"</p>

          <Image
            src={adsImages[currentIndex]}
            alt="ads"
            className="ads-image"
          />

          <div className="d-flex justify-content-center my-3">
            <Button className="ads-button">ซื้อเลย</Button>
          </div>
        </div>
      </a>

      <div className="reveal-wrapper d-flex flex-column justify-content-center align-items-center pt-5">
        {phase === "loading" && (
          <>
            <div className="mystic-ring loading" />
            <div>กำลังประมวลผล…</div>
            <div className="countdown-text"> {countdown} </div>
          </>
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
