import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
  {/* background effects */}
  <div className="stars" />
  <div className="stars2" />
  <div className="stars3" />

  <div className="fog fog1" />
  <div className="fog fog2" />

  {/* content */}
  <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
    <h1 className="title">รู้จักตัวเอง</h1>
    <p className="subtitle ">
      เคยสงสัยไหมว่า
      <br />
      ทำไมเราถึงคิดและรู้สึกแบบนี้?
    </p>

    <Link to="/question/1" className="start-button">
  เริ่ม
</Link>

  </div>
</div>

  );
}

export default Home;
