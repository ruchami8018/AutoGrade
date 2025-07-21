import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Brain, FileText, BookOpen, BarChart2, ChevronLeft, Users, CheckCircle, Clock, Quote, Star } from 'lucide-react';

const StatCard = ({ icon: Icon, number, label, suffix = "" }: { icon: React.ElementType, number: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 4000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
};

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-50">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Landing() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutoGrade
            </span>
            <p className="text-sm text-gray-600">כל מה שמורה צריך, במקום אחד.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-blue-400 text-blue-600 hover:bg-blue-50 hidden md:flex"
            onClick={handleLogin}
          >
            התחברות
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md"
            onClick={handleRegister}
          >
            הרשמה עכשיו
          </Button>
        </div>
      </header>
      <section className="py-16 px-4 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="block mb-2">כל מה שמורה צריך,</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                במקום אחד
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              מערכת AutoGrade היא פלטפורמה חכמה לניהול הוראה עבור מורים, מרצים ומדריכים מקצועיים.
              נהלו את הקבצים, צרו תוכן לימודי, קבלו ניתוחים חכמים והתקשרו עם עמיתים - הכל תחת קורת גג אחת.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-lg text-lg py-6"
                onClick={handleLogin}
              >
                התחילו עכשיו
                <ChevronLeft className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-400 text-blue-600 hover:bg-blue-50 text-lg py-6"
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                גלו עוד
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
            {/*5*/}
            <img
              src="https://my-auto-grade-testpnoren.s3.us-east-1.amazonaws.com/LOGO_AUTO_GRADE_4.png"
              alt="דשבורד AutoGrade"
              className="relative rounded-xl shadow-2xl border-8 border-white"
            />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">המספרים מדברים בעד עצמם</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              הצטרפו לקהילה גדולה של מורים שכבר חוו את הכוח של AutoGrade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard
              icon={Users}
              number={15000}
              label="מורים רשומים"
              suffix="+"
            />
            <StatCard
              icon={FileText}
              number={250000}
              label="קבצים עובדו"
              suffix="+"
            />
            <StatCard
              icon={Clock}
              number={50000}
              label="שעות נחסכו"
              suffix="+"
            />
            <StatCard
              icon={CheckCircle}
              number={98}
              label="שביעות רצון"
              suffix="%"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">פיצ'רים מובילים</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AutoGrade מציעה מגוון כלים חכמים שיעזרו לכם לנהל את ההוראה ביעילות ובקלות
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={MessageCircle}
              title="צ'אט בין מורים"
              description="התקשרו עם עמיתים בזמן אמת, שתפו קבצים והחליפו רעיונות בקלות"
            />
            <FeatureCard
              icon={Brain}
              title="ניתוח AI"
              description="קבלו תובנות חכמות, הפיקו שאלות אוטומטית וזהו תוכן דומה בעזרת טכנולוגיית AI מתקדמת"
            />
            <FeatureCard
              icon={FileText}
              title="ניהול קבצים חכם"
              description="ארגנו את כל חומרי ההוראה שלכם במקום אחד עם תיוג אוטומטי וחיפוש מתקדם"
            />
            <FeatureCard
              icon={BookOpen}
              title="יצירת תוכן לימודי"
              description="צרו מערכי שיעור, מבחנים ושאלונים בקלות עם כלים אוטומטיביים"
            />
            <FeatureCard
              icon={BarChart2}
              title="דוחות וסטטיסטיקות"
              description="קבלו תמונה מלאה על הפעילות שלכם עם גרפים ודוחות אוטומטיים"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
          <p className="text-xl mb-10 text-blue-100">
            הצטרפו למאות מורים שכבר משתמשים ב-AutoGrade וחוסכים זמן יקר בעבודת ההוראה
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg text-lg py-6"
            onClick={handleLogin}
          >
            התחברות והתחלת השימוש
          </Button>
        </div>
      </section>
      <footer className="bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-md font-bold text-white">SG</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AutoGrade
            </span>
          </div>
          <p className="text-gray-600 text-center md:text-right">
            &copy; כל הזכויות שמורות.
            2025
            AutoGrade.
          </p>
        </div>
      </footer>

    </div>
  );
}


// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import {
//   MessageCircle,
//   Brain,
//   FileText,
//   BookOpen,
//   BarChart2,
//   Users,
//   CheckCircle,
//   Clock,
//   Quote,
//   Star,
//   ArrowRight,
//   Zap,
//   Shield,
//   Sparkles,
//   ChevronDown,
//   Plus,
//   Minus,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react"

// const StatCard = ({
//   icon: Icon,
//   number,
//   label,
//   suffix = "",
// }: {
//   icon: React.ElementType
//   number: number
//   label: string
//   suffix?: string
// }) => {
//   const [count, setCount] = useState(0)
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     const element = document.getElementById(`stat-${label}`)
//     if (element) observer.observe(element)

//     return () => observer.disconnect()
//   }, [label])

//   useEffect(() => {
//     if (!isVisible) return

//     let start = 0
//     const end = number
//     const duration = 2000
//     const increment = end / (duration / 16)

//     const timer = setInterval(() => {
//       start += increment
//       if (start >= end) {
//         setCount(end)
//         clearInterval(timer)
//       } else {
//         setCount(Math.floor(start))
//       }
//     }, 16)

//     return () => clearInterval(timer)
//   }, [number, isVisible])

//   return (
//     <div
//       id={`stat-${label}`}
//       className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
//     >
//       <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
//         <Icon className="w-8 h-8 text-white" />
//       </div>
//       <div className="text-3xl font-bold text-white mb-2">
//         {count.toLocaleString()}
//         {suffix}
//       </div>
//       <div className="text-indigo-100">{label}</div>
//     </div>
//   )
// }

// type FeatureCardProps = {
//   icon: React.ElementType
//   title: string
//   description: string
//   delay?: number
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
//   const [isVisible, setIsVisible] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), delay)
//     return () => clearTimeout(timer)
//   }, [delay])

//   return (
//     <div
//       className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-indigo-100 group hover:-translate-y-2 ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//       }`}
//     >
//       <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//         <Icon className="w-8 h-8 text-indigo-700 group-hover:text-purple-700 transition-colors" />
//       </div>
//       <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-indigo-700 transition-colors">
//         {title}
//       </h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   )
// }

// const TestimonialCard = ({
//   name,
//   role,
//   content,
//   rating,
//   isActive,
// }: {
//   name: string
//   role: string
//   content: string
//   rating: number
//   isActive: boolean
// }) => (
//   <div
//     className={`bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-500 ${
//       isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
//     }`}
//   >
//     <div className="flex items-center mb-4">
//       {[...Array(rating)].map((_, i) => (
//         <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//       ))}
//     </div>
//     <Quote className="w-8 h-8 text-indigo-200 mb-4" />
//     <p className="text-gray-600 mb-6 italic text-lg">"{content}"</p>
//     <div className="flex items-center">
//       <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//         {name.charAt(0)}
//       </div>
//       <div className="mr-4">
//         <h4 className="font-semibold text-gray-800">{name}</h4>
//         <p className="text-sm text-gray-500">{role}</p>
//       </div>
//     </div>
//   </div>
// )

// const TestimonialsCarousel = ({ testimonials }: { testimonials: any[] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//     }, 4000)

//     return () => clearInterval(timer)
//   }, [testimonials.length])

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
//   }

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//   }

//   return (
//     <div className="relative max-w-4xl mx-auto">
//       <div className="relative overflow-hidden">
//         <div
//           className="flex transition-transform duration-500 ease-in-out"
//           style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//         >
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="w-full flex-shrink-0 px-4">
//               <TestimonialCard {...testimonial} isActive={index === currentIndex} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         onClick={goToPrevious}
//         className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
//       >
//         <ChevronRight className="w-6 h-6 text-indigo-600" />
//       </button>

//       <button
//         onClick={goToNext}
//         className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
//       >
//         <ChevronLeft className="w-6 h-6 text-indigo-600" />
//       </button>

//       <div className="flex justify-center mt-8 gap-2">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full transition-all duration-200 ${
//               index === currentIndex ? "bg-indigo-600 scale-125" : "bg-gray-300 hover:bg-indigo-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <div className="border border-gray-200 rounded-lg">
//       <button
//         className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="font-semibold text-gray-800">{question}</span>
//         {isOpen ? <Minus className="w-5 h-5 text-indigo-600" /> : <Plus className="w-5 h-5 text-indigo-600" />}
//       </button>
//       {isOpen && (
//         <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
//           <p className="pt-4">{answer}</p>
//         </div>
//       )}
//     </div>
//   )
// }

// export default function Landing() {
//   const navigate = useNavigate()
//   const [scrollY, setScrollY] = useState(0)

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   const handleLogin = () => {
//     navigate("/login")
//   }

//   const handleRegister = () => {
//     navigate("/register")
//   }

//   const testimonials = [
//     {
//       name: "רחל כהן",
//       role: "מורה למתמטיקה",
//       content: "AutoGrade חסך לי שעות רבות בשבוע. הכלים החכמים מאפשרים לי להתמקד בהוראה ולא בניהול",
//       rating: 5,
//     },
//     {
//       name: "דוד לוי",
//       role: "מרצה באוניברסיטה",
//       content: "הפלטפורמה הכי טובה שהשתמשתי בה. הניתוח החכם עוזר לי להבין את הצרכים של הסטודנטים",
//       rating: 5,
//     },
//     {
//       name: "מירי אברהם",
//       role: "מורה לאנגלית",
//       content: "הצ'אט עם עמיתים והשיתוף של חומרים הפך את העבודה לחוויה מהנה ויעילה",
//       rating: 5,
//     },
//     {
//       name: "יוסי שמיר",
//       role: "מורה לפיזיקה",
//       content: "המערכת פשוט מדהימה! חסכה לי זמן רב ושיפרה את איכות ההוראה שלי באופן משמעותי",
//       rating: 5,
//     },
//     {
//       name: "שרה גולד",
//       role: "מורה לכימיה",
//       content: "לא יכולה לדמיין את העבודה בלי AutoGrade. הכלים החכמים פשוט מהפכניים",
//       rating: 5,
//     },
//   ]

//   const faqItems = [
//     {
//       question: "איך AutoGrade עוזר לחסוך זמן?",
//       answer:
//         "המערכת מאפשרת ניהול אוטומטי של קבצים, יצירת תוכן לימודי בעזרת AI, וכלים חכמים לניתוח וביצוע משימות חוזרות.",
//     },
//     {
//       question: "האם המערכת מתאימה לכל סוגי המורים?",
//       answer: "כן! AutoGrade מתאימה למורים בכל הרמות - מגן ילדים ועד אוניברסיטה, בכל התחומים.",
//     },
//     {
//       question: "איך פועל הניתוח החכם?",
//       answer: "המערכת משתמשת בטכנולוגיית AI מתקדמת לניתוח תוכן, יצירת שאלות, זיהוי דפוסים והצעת שיפורים.",
//     },
//     {
//       question: "האם הנתונים שלי מאובטחים?",
//       answer: "בהחלט! אנו משתמשים בהצפנה מתקדמת ועומדים בכל תקני האבטחה הנדרשים להגנה על מידע רגיש.",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
//       {/* Header */}
//       <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-indigo-200">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-gradient-to-br from-indigo-700 to-purple-700 rounded-lg flex items-center justify-center">
//             <Sparkles className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
//               AutoGrade
//             </span>
//             <p className="text-sm text-gray-600">כל מה שמורה צריך, במקום אחד.</p>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <Button
//             variant="outline"
//             className="border-indigo-500 text-indigo-700 hover:bg-indigo-50 hidden md:flex bg-transparent"
//             onClick={handleLogin}
//           >
//             התחברות
//           </Button>
//           <Button
//             className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white hover:opacity-90 shadow-md"
//             onClick={handleRegister}
//           >
//             הרשמה עכשיו
//           </Button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-16 px-4 md:py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/5 to-purple-700/5"></div>
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
//           <div className="space-y-8">
//             <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium">
//               <Zap className="w-4 h-4" />
//               חדש! תכונות AI מתקדמות
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
//               <span className="block mb-2">כל מה שמורה צריך,</span>
//               <span className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
//                 במקום אחד
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 leading-relaxed">
//               מערכת AutoGrade היא פלטפורמה חכמה לניהול הוראה עבור מורים, מרצים ומדריכים מקצועיים. נהלו את הקבצים, צרו
//               תוכן לימודי, קבלו ניתוחים חכמים והתקשרו עם עמיתים - הכל תחת קורת גג אחת.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white hover:opacity-90 shadow-lg text-lg py-6 group"
//                 onClick={handleLogin}
//               >
//                 התחילו עכשיו
//                 <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-indigo-500 text-indigo-700 hover:bg-indigo-50 text-lg py-6 bg-transparent"
//                 onClick={() => {
//                   const el = document.getElementById("features")
//                   if (el) el.scrollIntoView({ behavior: "smooth" })
//                 }}
//               >
//                 גלו עוד
//                 <ChevronDown className="mr-2 h-5 w-5" />
//               </Button>
//             </div>
//             <div className="flex items-center gap-8 pt-4">
//               <div className="flex items-center gap-2">
//                 <Shield className="w-5 h-5 text-green-500" />
//                 <span className="text-sm text-gray-600">מאובטח ופרטי</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-5 h-5 text-green-500" />
//                 <span className="text-sm text-gray-600">ללא התחייבות</span>
//               </div>
//             </div>
//           </div>
//           <div className="relative hidden lg:block">
//             <div
//               className="absolute -top-8 -right-8 w-64 h-64 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl"
//               style={{ transform: `translateY(${scrollY * 0.1}px)` }}
//             ></div>
//             <div
//               className="absolute -bottom-12 -left-12 w-80 h-80 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl"
//               style={{ transform: `translateY(${scrollY * -0.1}px)` }}
//             ></div>
//             <img
//               src="/placeholder.svg?height=600&width=800"
//               alt="דשבורד AutoGrade"
//               className="relative rounded-xl shadow-2xl border-8 border-white transform hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Statistics Section */}
//       <section className="py-20 px-4 bg-gradient-to-r from-indigo-700 to-purple-700 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="max-w-7xl mx-auto relative">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">המספרים מדברים בעד עצמם</h2>
//             <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
//               הצטרפו לקהילה גדולה של מורים שכבר חוו את הכוח של AutoGrade
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <StatCard icon={Users} number={15000} label="מורים רשומים" suffix="+" />
//             <StatCard icon={FileText} number={250000} label="קבצים עובדו" suffix="+" />
//             <StatCard icon={Clock} number={50000} label="שעות נחסכו" suffix="+" />
//             <StatCard icon={CheckCircle} number={98} label="שביעות רצון" suffix="%" />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="py-20 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">פיצ'רים מובילים</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               AutoGrade מציעה מגוון כלים חכמים שיעזרו לכם לנהל את ההוראה ביעילות ובקלות
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             <FeatureCard
//               icon={MessageCircle}
//               title="צ'אט בין מורים"
//               description="התקשרו עם עמיתים בזמן אמת, שתפו קבצים והחליפו רעיונות בקלות"
//               delay={0}
//             />
//             <FeatureCard
//               icon={Brain}
//               title="ניתוח AI"
//               description="קבלו תובנות חכמות, הפיקו שאלות אוטומטית וזהו תוכן דומה בעזרת טכנולוגיית AI מתקדמת"
//               delay={200}
//             />
//             <FeatureCard
//               icon={FileText}
//               title="ניהול קבצים חכם"
//               description="ארגנו את כל חומרי ההוראה שלכם במקום אחד עם תיוג אוטומטי וחיפוש מתקדם"
//               delay={400}
//             />
//             <FeatureCard
//               icon={BookOpen}
//               title="יצירת תוכן לימודי"
//               description="צרו מערכי שיעור, מבחנים ושאלונים בקלות עם כלים אוטומטיביים"
//               delay={600}
//             />
//             <FeatureCard
//               icon={BarChart2}
//               title="דוחות וסטטיסטיקות"
//               description="קבלו תמונה מלאה על הפעילות שלכם עם גרפים ודוחות אוטומטיים"
//               delay={800}
//             />
//             <FeatureCard
//               icon={Shield}
//               title="אבטחה מתקדמת"
//               description="הנתונים שלכם מוגנים בהצפנה מתקדמת ותקני אבטחה גבוהים"
//               delay={1000}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-indigo-50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">מה אומרים המורים</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               שמעו מהמורים שכבר משתמשים ב-AutoGrade ורואים את התוצאות
//             </p>
//           </div>
//           <TestimonialsCarousel testimonials={testimonials} />
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">שאלות נפוצות</h2>
//             <p className="text-xl text-gray-600">מצאו תשובות לשאלות הנפוצות ביותר על AutoGrade</p>
//           </div>
//           <div className="space-y-4">
//             {faqItems.map((item, index) => (
//               <FAQItem key={index} {...item} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-20 px-4 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/10"></div>
//         <div className="max-w-4xl mx-auto text-center relative">
//           <h2 className="text-3xl md:text-4xl font-bold mb-6">מוכנים להתחיל?</h2>
//           <p className="text-xl mb-10 text-indigo-100">
//             הצטרפו למאות מורים שכבר משתמשים ב-AutoGrade וחוסכים זמן יקר בעבודת ההוראה
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               size="lg"
//               className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg text-lg py-6 group"
//               onClick={handleLogin}
//             >
//               התחברות והתחלת השימוש
//               <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
//             </Button>
//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white/10 text-lg py-6 bg-transparent"
//               onClick={handleRegister}
//             >
//               הרשמה חינם
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-slate-900 text-white py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             <div className="col-span-1 md:col-span-2">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-700 to-purple-700 rounded-lg flex items-center justify-center">
//                   <Sparkles className="w-6 h-6 text-white" />
//                 </div>
//                 <span className="text-xl font-bold">AutoGrade</span>
//               </div>
//               <p className="text-gray-400 mb-4">הפלטפורמה המובילה לניהול הוראה חכם ויעיל</p>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">קישורים מהירים</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>
//                   <a href="#features" className="hover:text-white transition-colors">
//                     פיצ'רים
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     מחירים
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     תמיכה
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-4">צור קשר</h3>
//               <ul className="space-y-2 text-gray-400">
//                 <li>support@autograde.co.il</li>
//                 <li>03-1234567</li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-center md:text-right">&copy; 2025 AutoGrade. כל הזכויות שמורות.</p>
//             <div className="flex gap-4 mt-4 md:mt-0">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 תנאי שימוש
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 מדיניות פרטיות
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }
