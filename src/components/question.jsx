const questions = [
  {
    id: 1,
    question: "วันว่างที่ไม่มีใครคาดหวังอะไรจากคุณ",
    options: [
      { key: "A", text: "นอน ดูหนัง ปิดโลก", trait: "calm" },
      { key: "B", text: "ออกไปเจอคน หาอะไรทำ", trait: "social" },
      { key: "C", text: "ทำสิ่งที่ค้างไว้ให้เสร็จ", trait: "control" },
      { key: "D", text: "ลองทำอะไรใหม่แบบไม่วางแผน", trait: "growth" },
    ],
  },
  {
    id: 2,
    question: "สิ่งที่ทำให้คุณเครียดที่สุด",
    options: [
      { key: "A", text: "ไม่รู้ว่าตัวเองกำลังมุ่งไปไหน", trait: "direction" },
      { key: "B", text: "ถูกเร่ง ถูกคาดหวัง", trait: "freedom" },
      { key: "C", text: "ทำให้คนอื่นผิดหวัง", trait: "relationship" },
      { key: "D", text: "ต้องทำในสิ่งที่ไม่เชื่อ", trait: "values" },
    ],
  },
  {
    id: 3,
    question: "เวลาต้องตัดสินใจเรื่องใหญ่",
    options: [
      { key: "A", text: "คิดเงียบ ๆ คนเดียว", trait: "innerVoice" },
      { key: "B", text: "ขอความคิดเห็นหลายคน", trait: "perspective" },
      { key: "C", text: "ดูข้อมูล เหตุผล ความเสี่ยง", trait: "logic" },
      { key: "D", text: "ใช้ความรู้สึกตอนนั้น", trait: "intuition" },
    ],
  },
  {
    id: 4,
    question: "คำพูดที่กระทบใจคุณที่สุด",
    options: [
      { key: "A", text: "เธอเปลี่ยนไปนะ", trait: "acceptance" },
      { key: "B", text: "เธอไม่พยายามพอ", trait: "selfPressure" },
      { key: "C", text: "มันไม่สำคัญหรอก", trait: "meaning" },
      { key: "D", text: "แล้วแต่เธอ", trait: "attention" },
    ],
  },
  {
    id: 5,
    question: "เมื่อคุณรู้สึกหลงทาง",
    options: [
      { key: "A", text: "หายไปจากโลกสักพัก", trait: "withdraw" },
      { key: "B", text: "ทำอะไรให้ยุ่งเข้าไว้", trait: "avoidance" },
      { key: "C", text: "คุยกับใครสักคน", trait: "communication" },
      { key: "D", text: "เขียน คิด ทบทวน", trait: "reflection" },
    ],
  },
  {
    id: 6,
    question: "สิ่งที่คุณกลัวลึก ๆ",
    options: [
      { key: "A", text: "ใช้ชีวิตไม่คุ้ม", trait: "purpose" },
      { key: "B", text: "ไม่เก่งพอ", trait: "selfWorth" },
      { key: "C", text: "ถูกทิ้ง", trait: "abandonment" },
      { key: "D", text: "สูญเสียอิสระ", trait: "independence" },
    ],
  },
  {
    id: 7,
    question: "ถ้ามีเงินพอใช้ตลอดชีวิต",
    options: [
      { key: "A", text: "ใช้ชีวิตเรียบง่าย สงบ", trait: "simplicity" },
      { key: "B", text: "เดินทาง เรียนรู้", trait: "experience" },
      { key: "C", text: "สร้างอะไรสักอย่าง", trait: "legacy" },
      { key: "D", text: "ดูแลคนรอบตัว", trait: "giving" },
    ],
  },
  {
    id: 8,
    question: "สิ่งที่ทำให้คุณภูมิใจในตัวเอง",
    options: [
      { key: "A", text: "ไม่ยอมแพ้", trait: "resilience" },
      { key: "B", text: "เป็นที่พึ่งให้คนอื่น", trait: "caretaker" },
      { key: "C", text: "กล้าต่าง", trait: "authenticity" },
      { key: "D", text: "พัฒนาตัวเองเสมอ", trait: "selfGrowth" },
    ],
  },
  {
    id: 9,
    question: "คุณรู้สึกดีที่สุดเมื่อ…",
    options: [
      { key: "A", text: "อยู่กับตัวเองโดยไม่ต้องแสดง", trait: "trueSelf" },
      { key: "B", text: "มีคนเข้าใจ", trait: "connection" },
      { key: "C", text: "ทำสำเร็จ", trait: "achievement" },
      { key: "D", text: "ได้เริ่มใหม่", trait: "renewal" },
    ],
  },
  {
    id: 10,
    question: "ถ้าชีวิตคือบทหนึ่ง",
    options: [
      { key: "A", text: "บทเรียน", trait: "learner" },
      { key: "B", text: "การเดินทาง", trait: "explorer" },
      { key: "C", text: "ภารกิจ", trait: "builder" },
      { key: "D", text: "เรื่องราวความสัมพันธ์", trait: "connector" },
    ],
  },
];

export default questions;
