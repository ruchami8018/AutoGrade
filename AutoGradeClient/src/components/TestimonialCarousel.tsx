// import { useState, useEffect } from "react";
// import { TestimonialCard } from "./ui/testimonialCard";

// export default function TestimonialCarousel() {//מערך ממליצים
//   const testimonials = [
//     {
//       name: "דר' מיכל כהן",
//       role: "מרצה במדעי המחשב",
//       content: "AutoGrade חסך לי שעות של עבודה בשבוע. הניתוח האוטומטי פשוט מדהים! הכלים החכמים עוזרים לי להתמקד בחלק החשוב ביותר - ההוראה עצמה.",
//       rating: 5
//     },
//     {
//       name: "אבי לוי",
//       role: "מורה לפיזיקה",
//       content: "הכלים החכמים פשוט מהפכניים. תלמידיי משתפרים בקצב מדהים כשאני יכול לתת להם משוב מיידי ומדויק. הפלטפורמה שינתה את דרך ההוראה שלי.",
//       rating: 5
//     },
//     {
//       name: "רחל גולדברג",
//       role: "מורה למתמטיקה",
//       content: "השיתוף עם עמיתים והצ'אט הפכו את העבודה לכיף. אני יכולה לקבל עצות מיידיות ולשתף רעיונות חדשניים. הקהילה פה פשוט מדהימה!",
//       rating: 5
//     },
//     {
//       name: "יוסי חדד",
//       role: "מדריך מקצועי",
//       content: "הדוחות והסטטיסטיקות עוזרים לי להבין בדיוק איך לשפר את ההוראה. הנתונים מספרים לי בדיוק מה עובד ומה צריך שיפור.",
//       rating: 4
//     },
//     {
//       name: "נעמה רוזן",
//       role: "מורה לאנגלית",
//       content: "יצירת התוכן הלימודי הפכה לפשוטה וממוקדת. במקום לבזבז זמן על עבודה מכנית, אני מתמקדת בדברים שחשובים לתלמידים שלי.",
//       rating: 5
//     }
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [testimonials.length]);

//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {testimonials.map((testimonial, index) => (
//           <div key={index} className="w-full flex-shrink-0 px-4">
//             <TestimonialCard {...testimonial} />
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-6 space-x-2">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
//               }`}
//             onClick={() => setCurrentIndex(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// components/TestimonialCarousel.jsx

// components/TestimonialCarousel.jsx
