// src/utils/analyzeResult.js

export const traitGroups = {
  energy: ["calm", "withdraw", "renewal", "simplicity"],
  freedom: ["freedom", "independence", "growth", "explorer"],
  connection: ["relationship", "connection", "giving", "caretaker", "connector", "communication"],
  meaning: ["purpose", "meaning", "legacy", "learner", "builder"],
  thinking: ["logic", "reflection", "innerVoice", "intuition", "perspective"],
  selfWorth: ["selfWorth", "achievement", "resilience", "selfGrowth", "authenticity"],
};

export const analyzeResult = (score) => {
  const groupScore = {};

  Object.entries(traitGroups).forEach(([group, traits]) => {
    groupScore[group] = traits.reduce(
      (sum, trait) => sum + (score[trait] || 0),
      0
    );
  });

  return Object.entries(groupScore)
    .sort((a, b) => b[1] - a[1])[0];
};

export const resultNarrative = {
  energy: {
    title: "ผู้ต้องการพลังจากความสงบ",
    story:
      "คุณเป็นคนที่ฟื้นพลังจากความเงียบและพื้นที่ปลอดภัยทางใจ ไม่จำเป็นต้องมีใครอยู่รอบตัวตลอดเวลา แค่ได้อยู่กับตัวเองโดยไม่ต้องแสดง คุณรับรู้อารมณ์ตัวเองได้ดี และรู้ว่าเมื่อไหร่ควรพัก",
    strength: [
      "รู้จักดูแลพลังใจ",
      "ไม่หลงไปกับความวุ่นวายของโลก",
    ],
    caution: [
      "ปิดโลกนานเกินไป",
      "ลังเลที่จะขอความช่วยเหลือ",
    ],
  },

  freedom: {
    title: "ผู้โหยหาอิสระ",
    story:
      "คุณรู้สึกอึดอัดเมื่อถูกกำหนดหรือคาดหวัง ชีวิตที่ดีสำหรับคุณคือชีวิตที่เลือกเอง คุณต้องการพื้นที่หายใจและเส้นทางของตัวเอง",
    strength: ["กล้าตัดสินใจ", "ไม่ยึดติดกรอบ"],
    caution: ["ต่อต้านทุกอย่าง", "เบื่อง่าย"],
  },

  connection: {
    title: "ผู้ให้คุณค่ากับความสัมพันธ์",
    story:
      "คุณรู้สึกมีคุณค่าเมื่อมีคนเข้าใจ ความสัมพันธ์คือหัวใจของชีวิต คุณใส่ใจความรู้สึกคนอื่นอย่างแท้จริง",
    strength: ["เข้าอกเข้าใจ", "อบอุ่น"],
    caution: ["ลืมตัวเอง", "กลัวการถูกทิ้ง"],
  },

  meaning: {
    title: "ผู้ขับเคลื่อนด้วยความหมาย",
    story:
      "คุณไม่สามารถใช้ชีวิตแบบผ่านไปวัน ๆ ได้ ทุกสิ่งต้องมีความหมายกับใจ และสอดคล้องกับคุณค่าของคุณ",
    strength: ["จริงจังกับชีวิต", "ซื่อสัตย์กับตัวเอง"],
    caution: ["กดดันตัวเอง", "รู้สึกว่างเปล่า"],
  },

  thinking: {
    title: "ผู้คิดลึกและทบทวน",
    story:
      "คุณเป็นคนไม่รีบตัดสินใจ คุณเชื่อในการคิด วิเคราะห์ และฟังเสียงในใจให้ชัดก่อนลงมือ",
    strength: ["รอบคอบ", "เข้าใจตัวเองลึก"],
    caution: ["คิดมาก", "ลงมือช้า"],
  },

  selfWorth: {
    title: "ผู้เติบโตเพื่อพิสูจน์คุณค่า",
    story:
      "คุณพัฒนาตัวเองไม่หยุด เพราะลึก ๆ กลัวว่ายังไม่ดีพอ ความสำเร็จทำให้คุณรู้สึกปลอดภัย",
    strength: ["มุ่งมั่น", "มีวินัย"],
    caution: ["กดดันตัวเอง", "พักไม่เป็น"],
  },
};

