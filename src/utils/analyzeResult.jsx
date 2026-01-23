// export const traitGroups = {
//   energy: ["calm", "withdraw", "renewal", "simplicity"],
//   freedom: ["freedom", "independence", "growth", "explorer"],
//   connection: [
//     "relationship",
//     "connection",
//     "giving",
//     "caretaker",
//     "connector",
//     "communication",
//   ],
//   meaning: ["purpose", "meaning", "legacy", "learner", "builder"],
//   thinking: ["logic", "reflection", "innerVoice", "intuition", "perspective"],
//   selfWorth: [
//     "selfWorth",
//     "achievement",
//     "resilience",
//     "selfGrowth",
//     "authenticity",
//   ],
// };

export const traitGroups = {
  energy: ["calm", "withdraw", "renewal", "simplicity"],
  freedom: ["freedom", "independence", "growth", "explorer"],
  connection: [
    "relationship",
    "connection",
    "giving",
    "caretaker",
    "connector",
    "communication",
  ],
  meaning: ["purpose", "meaning", "legacy", "learner", "builder"],
  thinking: ["logic", "reflection", "innerVoice", "intuition", "perspective"],
  selfWorth: [
    "selfWorth",
    "achievement",
    "resilience",
    "selfGrowth",
    "authenticity",
  ],
};

export const weaknessByTrait = {
  calm: "หลีกเลี่ยงความวุ่นวายจนตัดขาดโลกภายนอก",
  withdraw: "เก็บตัวมากเกินไปเมื่อเจอปัญหา",
  renewal: "อยากเริ่มใหม่บ่อยจนไม่สานต่อ",
  simplicity: "ลดทอนความต้องการตัวเองมากเกินไป",

  freedom: "ต่อต้านกรอบทุกอย่างแม้สิ่งนั้นจะช่วยคุณ",
  independence: "ไม่ขอความช่วยเหลือแม้จำเป็น",
  growth: "เบื่อง่าย ไม่อยู่กับสิ่งเดิมนาน",
  explorer: "ลังเลที่จะปักหลัก",

  relationship: "ให้ความสำคัญกับคนอื่นจนลืมตัวเอง",
  connection: "ต้องการการยอมรับมากเกินไป",
  giving: "ให้จนเหนื่อยโดยไม่รู้ตัว",
  caretaker: "แบกรับอารมณ์คนอื่นมากไป",
  communication: "พยายามอธิบายทุกอย่างจนลืมฟังตัวเอง",

  purpose: "กดดันตัวเองให้ชีวิตต้องมีความหมายตลอดเวลา",
  meaning: "รู้สึกว่างเปล่าเมื่อยังหาคำตอบไม่เจอ",
  legacy: "ยึดติดกับผลลัพธ์ระยะยาวจนลืมปัจจุบัน",
  learner: "เรียนรู้มากแต่ยังไม่ลงมือ",
  builder: "โฟกัสงานจนละเลยใจ",

  logic: "ใช้เหตุผลจนเมินความรู้สึก",
  reflection: "คิดวนซ้ำ ไม่กล้าตัดสินใจ",
  innerVoice: "ฟังใจตัวเองมากจนปิดเสียงคนอื่น",
  intuition: "ตัดสินใจเร็วโดยไม่ดูผลกระทบ",
  perspective: "รับฟังมากจนไม่มีจุดยืน",

  selfWorth: "ผูกคุณค่าตัวเองกับผลงาน",
  achievement: "ไม่ยอมพักเพราะกลัวหยุดแล้วด้อย",
  resilience: "ฝืนเก่งแต่ไม่ยอมรับว่าเหนื่อย",
  selfGrowth: "รู้สึกผิดถ้าไม่ได้พัฒนา",
  authenticity: "ยึดความเป็นตัวเองจนยากต่อการประนีประนอม",
};

export const analyzeWeakness = (answers) => {
  const count = {};

  answers.forEach((t) => {
    count[t] = (count[t] || 0) + 1;
  });

  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait]) => weaknessByTrait[trait])
    .filter(Boolean);
};

export const analyzeResult = (answers) => {
  const groupScore = {
    energy: 0,
    freedom: 0,
    connection: 0,
    meaning: 0,
    thinking: 0,
    selfWorth: 0,
  };

  answers.forEach((trait) => {
    Object.entries(traitGroups).forEach(([group, traits]) => {
      if (traits.includes(trait)) {
        groupScore[group] += 1;
      }
    });
  });

  const sorted = Object.entries(groupScore).sort((a, b) => b[1] - a[1]);
  const [primary, primaryScore] = sorted[0];
  const [secondary, secondaryScore] = sorted[1];

  return {
    primary,
    secondary,
    isComplex: primaryScore - secondaryScore <= 1,
    scores: groupScore,
    weaknesses: analyzeWeakness(answers),
  };
};

// export const analyzeResult = (answers) => {
//   const groupScore = {
//     energy: 0,
//     freedom: 0,
//     connection: 0,
//     meaning: 0,
//     thinking: 0,
//     selfWorth: 0,
//   };

//   // 1. รวมคะแนน
//   answers.forEach((trait) => {
//     Object.entries(traitGroups).forEach(([group, traits]) => {
//       if (traits.includes(trait)) {
//         groupScore[group] += 1;
//       }
//     });
//   });

//   const sorted = Object.entries(groupScore).sort((a, b) => b[1] - a[1]);

//   const [primaryKey, primaryScore] = sorted[0];
//   const [secondaryKey, secondaryScore] = sorted[1];

//   const isComplex = primaryScore - secondaryScore <= 1;

//   return {
//     primary: primaryKey,
//     secondary: secondaryKey,
//     isComplex,
//     scores: groupScore,
//   };
// };

export const secondaryNarratives = {
  energy: "ความสงบของคุณช่วยประคองให้มิติด้านอื่นมั่นคงขึ้น",
  freedom: "อิสระที่คุณต้องการ เป็นแรงขับสำคัญที่ทำให้คุณแตกต่าง",
  connection: "ความใส่ใจคนรอบข้างทำให้เป้าหมายของคุณมีความเป็นมนุษย์มากขึ้น",
  meaning: "การค้นหาความหมายทำให้ทุกอย่างที่คุณทำมีน้ำหนักและคุณค่า",
  thinking: "ความช่างคิดทำให้คุณตัดสินใจได้อย่างเฉียบคมและลึกซึ้ง",
  selfWorth:
    "ความต้องการพิสูจน์ตนเองเป็นเชื้อเพลิงชั้นดีที่ทำให้คุณไม่หยุดนิ่ง",
};


export const resultNarrative = {
  energy: {
    title: "ผู้ต้องการพลังจากความสงบ",
    image: "/images/energy.png",
    story:
      "คุณเหมือนดอกไม้ที่ไม่ต้องการแสงแรงจัด แต่เติบโตได้งดงามในมุมที่เงียบและปลอดภัย พลังของคุณไม่เกิดจากเสียงปรบมือ แต่เกิดจากการได้อยู่กับตัวเองโดยไม่ต้องอธิบายอะไร คุณฟังอารมณ์ตัวเองเก่ง และรู้จังหวะพักก่อนที่จะเหนื่อยเกินไป โลกอาจมองคุณว่าเงียบ แต่จริง ๆ แล้วคุณกำลังรักษารากของหัวใจให้แข็งแรง",
    strength: ["รู้จักดูแลพลังใจ", "ไม่หลงไปกับความวุ่นวายของโลก"],
    job: [
      "นักเขียน / นักแปล / Content เชิงลึก",
      "นักวาดภาพประกอบ / Illustrator / Artist",
      "UX Writer / UX Researcher",
      "นักบำบัด / Counselor / Life Coach",
      "นักจัดสวน / งานธรรมชาติ / งานช้าแต่ลึก",
      "งาน Data / Research / วิเคราะห์เบื้องหลัง",
    ],
    style: [
      "ทำงานคนเดียวหรือทีมเล็ก",
      "ไม่ต้อง present บ่อย",
      "วัดผลจาก “คุณภาพ” ไม่ใช่ความเร็ว",
    ],
    caution: ["ปิดโลกนานเกินไป", "ลังเลที่จะขอความช่วยเหลือ"],
  },

  freedom: {
    title: "ผู้โหยหาอิสระ",
    image: "/images/freedom.png",

    story:
      "คุณเหมือนนกที่หายใจได้เต็มปอดเฉพาะตอนที่ฟ้ากว้าง ต่อให้กรงนั้นดูปลอดภัยหรือสวยงามแค่ไหน ถ้ามันไม่ใช่สิ่งที่คุณเลือกเอง คุณจะอึดอัดทันที คุณต้องการชีวิตที่เคลื่อนไหวได้ตามจังหวะของตัวเอง เส้นทางที่ดีสำหรับคุณ ไม่จำเป็นต้องถูกต้องในสายตาใคร แค่ต้องซื่อสัตย์กับหัวใจของคุณก็พอ",
    strength: ["กล้าตัดสินใจ", "ไม่ยึดติดกรอบ"],
    job: [
      "ฟรีแลนซ์ (Designer / Developer / Writer)",
      "Digital Nomad",
      "เจ้าของกิจการ / Startup Founder",
      "Travel Creator / Photographer",
      "Videographer / Content Creator",
      "Marketing / Creative Strategist",
    ],
    style: [
      "เวลาไม่ตายตัว",
      "เลือกเส้นทางและลูกค้าเองได้",
      "มีพื้นที่ทดลองและเปลี่ยนแปลง",
    ],

    caution: ["ต่อต้านทุกอย่าง", "เบื่อง่าย"],
  },

  connection: {
    title: "ผู้ให้คุณค่ากับความสัมพันธ์",
    image: "/images/connection.png",
    story:
      "คุณเหมือนผ้าห่มที่คอยห่มให้คนอื่นในวันที่หนาว คุณรู้สึกมีคุณค่าเมื่อได้ดูแล และได้ถูกเข้าใจ ความสัมพันธ์ไม่ใช่แค่เรื่องของคนอื่นสำหรับคุณ แต่มันคือที่ที่หัวใจคุณได้พัก คุณอ่านอารมณ์คนเก่ง และรับฟังอย่างไม่ตัดสิน เพียงแต่อย่าลืมว่า ผ้าห่มเองก็ต้องการความอบอุ่นเช่นกัน",
    strength: ["เข้าอกเข้าใจ", "อบอุ่น"],
    job: [
      "ครู / อาจารย์ / Mentor",
      "นักจิตวิทยา / Counselor",
      "HR / People Manager",
      "Customer Success / Account Manager",
      "Community Manager",
      "งาน NGO / Social Worker",
    ],
    style: [
      "ทำงานร่วมกับผู้คน",
      "ได้ฟังและเข้าใจผู้อื่น",
      "รู้สึกว่าตัวเองมีคุณค่าต่อคนรอบข้าง",
    ],
    caution: ["ลืมตัวเอง", "กลัวการถูกทิ้ง"],
  },

  meaning: {
    title: "ผู้ขับเคลื่อนด้วยความหมาย",
    image: "/images/meaning.png",
    story:
      "คุณไม่สามารถใช้ชีวิตแบบผ่านไปวัน ๆ ได้ เหมือนเทียนที่มีไส้ แต่ถ้าไม่มีไฟ มันก็ไม่ส่องสว่าง ทุกสิ่งที่คุณทำ ต้องสอดคล้องกับคุณค่าข้างใน คุณต้องรู้ว่า 'ทำไปเพื่ออะไร' ไม่ใช่แค่ 'ทำตามหน้าที่' เมื่อคุณหลงทาง คุณจะไม่เหนื่อยเพราะงานหนัก แต่เหนื่อยเพราะใจไม่รู้ว่ากำลังเดินไปไหน",
    strength: ["มีเป้าหมายชัดเจน", "มุ่งมั่น"],
    job: [
      "ผู้ประกอบการเพื่อสังคม (Social Enterprise)",
      "นักกลยุทธ์ / Policy / Think Tank",
      "Product Manager (สาย purpose-driven)",
      "Journalist / Documentary Creator",
      "นักออกแบบระบบ / Solution Designer",
      "งานด้านความยั่งยืน / ESG",
    ],
    style: [
      "งานมีเป้าหมายและคุณค่า",
      "เห็นผลกระทบในระยะยาว",
      "ไม่ได้ทำงานเพียงเพราะหน้าที่",
    ],
    caution: ["กดดันตัวเอง", "รู้สึกว่างเปล่า"],
  },

  thinking: {
    title: "ผู้คิดลึกและทบทวน",
    image: "/images/thinking.png",
    story:
      "คุณเหมือนกระจกใสที่ไม่รีบสะท้อนภาพ คุณหยุด มอง และคิด ก่อนจะตัดสินใจ คุณเชื่อว่าความเข้าใจที่แท้จริง ต้องมาจากการฟังทั้งเหตุผลและเสียงในใจ คุณไม่กลัวความเงียบ เพราะในนั้นมีคำตอบ เพียงแต่อย่าปล่อยให้การคิด กลายเป็นกำแพงที่ทำให้คุณไม่กล้าก้าวออกไป",
    strength: ["รอบคอบ", "เข้าใจตัวเองลึก"],
    job: [
      "นักวิเคราะห์ข้อมูล / Data Analyst",
      "นักวิจัย / Academic",
      "UX / Service Designer",
      "Product Strategist",
      "Programmer / System Architect",
      "นักเขียนเชิงความคิด / Essayist",
    ],
    style: [
      "มีเวลาคิดและทบทวน",
      "ทำงานกับความซับซ้อน",
      "เน้นความเข้าใจมากกว่าความเร็ว",
    ],
    caution: ["คิดมาก", "ลงมือช้า"],
  },

  selfWorth: {
    title: "ผู้เติบโตเพื่อพิสูจน์คุณค่า",
    image: "/images/selfWorth.png",
    story:
      "คุณเหมือนต้นไม้ที่พยายามเติบโตให้สูงขึ้นทุกวัน เพราะลึก ๆ กลัวว่าจะยังไม่แข็งแรงพอ คุณเชื่อว่าความสำเร็จจะทำให้ปลอดภัย และการหยุดพักคือความเสี่ยง คุณมีวินัยและแรงผลักดันสูง แต่บางครั้งก็ลืมถามตัวเองว่า… เหนื่อยไหม การเติบโตที่แท้จริง ไม่ใช่แค่สูงขึ้น แต่คือการหยั่งรากให้ลึกด้วย",
    strength: ["มุ่งมั่น", "มีวินัย"],
    job: [
      "ผู้จัดการ / Leader",
      "Project Manager",
      "Consultant",
      "Sales / Business Development",
      "Startup Founder",
      "Career-driven Corporate Role",
    ],
    style: [
      "มีเป้าหมายและตัวชี้วัดชัดเจน",
      "เห็นพัฒนาการของตัวเอง",
      "งานท้าทายและผลักศักยภาพ",
    ],
    caution: ["กดดันตัวเอง", "พักไม่เป็น"],
  },
};
