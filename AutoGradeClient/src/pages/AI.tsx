// import { useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Brain, FileQuestion, AlignJustify, BookOpen } from "lucide-react";
// import AIQuestionGenerator from '../components/ai/AIQuestionGenerator';
// import AISummaryGenerator from '../components/ai/AISummaryGenerator';
// import AITextAnalyzer from '../components/ai/AITextAnalyzer';
// import AILessonPlanGenerator from '../components/ai/AILessonPlanGenerator';

// export default function AI() {
//   const [activeTab, setActiveTab] = useState("questions");
  
//   return (
//     <div className="fade-in space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-900">עוזר מורה חכם</h1>
//       </div>
      
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Brain className="ml-2 h-6 w-6" />
//             כלי בינה מלאכותית לעבודת המורה
//           </CardTitle>
//           <CardDescription>
//             בחר באחד הכלים החכמים כדי לחסוך זמן ולהעשיר את ההוראה שלך
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="pb-8">
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
//               <TabsTrigger value="questions" className="flex items-center">
//                 <FileQuestion className="ml-2 h-4 w-4" />
//                 יצירת שאלות
//               </TabsTrigger>
//               <TabsTrigger value="summary" className="flex items-center">
//                 <AlignJustify className="ml-2 h-4 w-4" />
//                 יצירת סיכום
//               </TabsTrigger>
//               <TabsTrigger value="analysis" className="flex items-center">
//                 <Brain className="ml-2 h-4 w-4" />
//                 ניתוח טקסט
//               </TabsTrigger>
//               <TabsTrigger value="lesson" className="flex items-center">
//                 <BookOpen className="ml-2 h-4 w-4" />
//                 מערך שיעור
//               </TabsTrigger>
//             </TabsList>
            
//             <div className="mt-8">
//               <TabsContent value="questions">
//                 <AIQuestionGenerator />
//               </TabsContent>
              
//               <TabsContent value="summary">
//                 <AISummaryGenerator />
//               </TabsContent>
              
//               <TabsContent value="analysis">
//                 <AITextAnalyzer />
//               </TabsContent>
              
//               <TabsContent value="lesson">
//                 <AILessonPlanGenerator />
//               </TabsContent>
//             </div>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

//-----------------------------------
  "use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  FileQuestion,
  AlignJustify,
  BookOpen,
  Sparkles,
  Download,
  Copy,
  CheckCircle,
  Loader2,
  Wand2,
  FileText,
  Target,
  Users,
} from "lucide-react"

// AI Tool Components
const AIQuestionGenerator = () => {
  const [text, setText] = useState("")
  const [questionType, setQuestionType] = useState("multiple-choice")
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [questions, setQuestions] = useState<string[]>([])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setQuestions([
        "מהו המושג המרכזי שנדון בטקסט?",
        "איך ניתן ליישם את הרעיונות המוצגים בפועל?",
        "מה ההבדל בין הגישות השונות שהוצגו?",
        "כיצד הנושא קשור לחומר שלמדנו קודם?",
      ])
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
            <FileQuestion className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">יצירת שאלות אוטומטית</h3>
            <p className="text-sm text-gray-600">הכניסו טקסט וקבלו שאלות מותאמות לרמה ולסוג הרצוי</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">סוג שאלות</label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">רב ברירה</SelectItem>
                <SelectItem value="open">שאלות פתוחות</SelectItem>
                <SelectItem value="true-false">נכון/לא נכון</SelectItem>
                <SelectItem value="fill-blank">השלמת משפטים</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">רמת קושי</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">קל</SelectItem>
                <SelectItem value="medium">בינוני</SelectItem>
                <SelectItem value="hard">קשה</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea
          placeholder="הדביקו כאן את הטקסט שממנו תרצו ליצור שאלות..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-32 border-blue-200 focus:border-blue-400 mb-4"
        />

        <Button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 shadow-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              יוצר שאלות...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 ml-2" />
              צור שאלות
            </>
          )}
        </Button>
      </div>

      {questions.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-50">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
            שאלות שנוצרו
          </h4>
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-gray-800">
                  {index + 1}. {question}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
              <Copy className="w-4 h-4 ml-2" />
              העתק הכל
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent">
              <Download className="w-4 h-4 ml-2" />
              הורד כקובץ
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const AISummaryGenerator = () => {
  const [text, setText] = useState("")
  const [summaryLength, setSummaryLength] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [summary, setSummary] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setSummary(
        "זהו סיכום אוטומטי של הטקסט שהוזן. הסיכום מתמקד בנקודות המרכזיות והחשובות ביותר, תוך שמירה על הרצף הלוגי והמסר העיקרי של המקור המקורי.",
      )
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
            <AlignJustify className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">יצירת סיכום חכם</h3>
            <p className="text-sm text-gray-600">הכניסו טקסט ארוך וקבלו סיכום מרוכז ומדויק</p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">אורך הסיכום</label>
          <Select value={summaryLength} onValueChange={setSummaryLength}>
            <SelectTrigger className="border-indigo-200 focus:border-indigo-400">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">קצר (2-3 משפטים)</SelectItem>
              <SelectItem value="medium">בינוני (פסקה)</SelectItem>
              <SelectItem value="long">מפורט (מספר פסקאות)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Textarea
          placeholder="הדביקו כאן את הטקסט שתרצו לסכם..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 border-indigo-200 focus:border-indigo-400 mb-4"
        />

        <Button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              יוצר סיכום...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 ml-2" />
              צור סיכום
            </>
          )}
        </Button>
      </div>

      {summary && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-indigo-50">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
            הסיכום שנוצר
          </h4>
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-gray-800 leading-relaxed">{summary}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent">
              <Copy className="w-4 h-4 ml-2" />
              העתק
            </Button>
            <Button variant="outline" className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 bg-transparent">
              <Download className="w-4 h-4 ml-2" />
              הורד
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

const AITextAnalyzer = () => {
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setAnalysis({
        readabilityLevel: "בינוני",
        keyTopics: ["חינוך", "טכנולוgia", "למידה"],
        sentiment: "חיובי",
        wordCount: 245,
        readingTime: "2 דקות",
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">ניתוח טקסט מתקדם</h3>
            <p className="text-sm text-gray-600">קבלו ניתוח מעמיק של הטקסט - רמת קושי, נושאים מרכזיים ועוד</p>
          </div>
        </div>

        <Textarea
          placeholder="הדביקו כאן את הטקסט לניתוח..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-40 border-purple-200 focus:border-purple-400 mb-4"
        />

        <Button
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 shadow-md"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              מנתח טקסט...
            </>
          ) : (
            <>
              <Brain className="w-4 h-4 ml-2" />
              נתח טקסט
            </>
          )}
        </Button>
      </div>

      {analysis && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-50">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
            תוצאות הניתוח
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h5 className="font-medium text-gray-900 mb-2">רמת קריאות</h5>
              <p className="text-purple-600 font-semibold">{analysis.readabilityLevel}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h5 className="font-medium text-gray-900 mb-2">מספר מילים</h5>
              <p className="text-purple-600 font-semibold">{analysis.wordCount}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h5 className="font-medium text-gray-900 mb-2">זמן קריאה</h5>
              <p className="text-purple-600 font-semibold">{analysis.readingTime}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h5 className="font-medium text-gray-900 mb-2">טון הטקסט</h5>
              <p className="text-purple-600 font-semibold">{analysis.sentiment}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h5 className="font-medium text-gray-900 mb-2">נושאים מרכזיים</h5>
            <div className="flex flex-wrap gap-2">
              {analysis.keyTopics.map((topic: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const AILessonPlanGenerator = () => {
  const [subject, setSubject] = useState("")
  const [grade, setGrade] = useState("")
  const [duration, setDuration] = useState("45")
  const [topic, setTopic] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [lessonPlan, setLessonPlan] = useState<any>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setLessonPlan({
        title: `${topic} - כיתה ${grade}`,
        objectives: ["הבנת המושגים הבסיסיים", "יכולת יישום בפועל", "פיתוח חשיבה ביקורתית"],
        activities: [
          "פתיחה ומוטיבציה (10 דקות)",
          "הסבר והדגמה (15 דקות)",
          "תרגול מודרך (15 דקות)",
          "סיכום והערכה (5 דקות)",
        ],
        materials: ["לוח", "מחשב", "דפי עבודה", "מצגת"],
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">יצירת מערך שיעור</h3>
            <p className="text-sm text-gray-600">צרו מערך שיעור מפורט ומותאם לכיתה ולנושא</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">מקצוע</label>
            <Input
              placeholder="למשל: מתמטיקה, היסטוריה..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border-green-200 focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">כיתה</label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="בחר כיתה" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="א">כיתה א</SelectItem>
                <SelectItem value="ב">כיתה ב</SelectItem>
                <SelectItem value="ג">כיתה ג</SelectItem>
                <SelectItem value="ד">כיתה ד</SelectItem>
                <SelectItem value="ה">כיתה ה</SelectItem>
                <SelectItem value="ו">כיתה ו</SelectItem>
                <SelectItem value="ז">כיתה ז</SelectItem>
                <SelectItem value="ח">כיתה ח</SelectItem>
                <SelectItem value="ט">כיתה ט</SelectItem>
                <SelectItem value="י">כיתה י</SelectItem>
                <SelectItem value="יא">כיתה יא</SelectItem>
                <SelectItem value="יב">כיתה יב</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">נושא השיעור</label>
            <Input
              placeholder="למשל: משוואות ממעלה ראשונה"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-green-200 focus:border-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">משך השיעור (דקות)</label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 דקות</SelectItem>
                <SelectItem value="45">45 דקות</SelectItem>
                <SelectItem value="60">60 דקות</SelectItem>
                <SelectItem value="90">90 דקות</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!subject.trim() || !grade || !topic.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white hover:opacity-90 shadow-md"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              יוצר מערך שיעור...
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4 ml-2" />
              צור מערך שיעור
            </>
          )}
        </Button>
      </div>

      {lessonPlan && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-green-50">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
            {lessonPlan.title}
          </h4>

          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                <Target className="w-4 h-4 ml-2 text-green-600" />
                מטרות השיעור
              </h5>
              <ul className="space-y-2">
                {lessonPlan.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                <Users className="w-4 h-4 ml-2 text-green-600" />
                מהלך השיעור
              </h5>
              <div className="space-y-3">
                {lessonPlan.activities.map((activity: string, index: number) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <span className="text-gray-800">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3 flex items-center">
                <FileText className="w-4 h-4 ml-2 text-green-600" />
                חומרים נדרשים
              </h5>
              <div className="flex flex-wrap gap-2">
                {lessonPlan.materials.map((material: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent">
              <Copy className="w-4 h-4 ml-2" />
              העתק
            </Button>
            <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent">
              <Download className="w-4 h-4 ml-2" />
              הורד כ-PDF
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Main AI Component
export default function AI() {
  const [activeTab, setActiveTab] = useState("questions")

  const tabs = [
    {
      id: "questions",
      label: "יצירת שאלות",
      icon: FileQuestion,
      component: AIQuestionGenerator,
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      id: "summary",
      label: "יצירת סיכום",
      icon: AlignJustify,
      component: AISummaryGenerator,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: "analysis",
      label: "ניתוח טקסט",
      icon: Brain,
      component: AITextAnalyzer,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "lesson",
      label: "מערך שיעור",
      icon: BookOpen,
      component: AILessonPlanGenerator,
      gradient: "from-green-500 to-teal-500",
    },
  ]

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="py-8 px-4 sm:px-6 lg:px-8 border-b border-blue-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                עוזר מורה חכם
              </h1>
              <p className="text-lg text-gray-600 mt-1">כלי בינה מלאכותית מתקדמים לחיסכון בזמן והעשרת ההוראה</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all font-medium ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md`
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-blue-100 p-6">
          {activeTabData && <activeTabData.component />}
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Card
                key={tab.id}
                className="bg-white/80 backdrop-blur-sm border-blue-100 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${tab.gradient} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{tab.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {tab.id === "questions" && "צרו שאלות מותאמות לכל רמה וסוג"}
                    {tab.id === "summary" && "סכמו טקסטים ארוכים במהירות ובדיוק"}
                    {tab.id === "analysis" && "נתחו טקסטים וקבלו תובנות מעמיקות"}
                    {tab.id === "lesson" && "בנו מערכי שיעור מפורטים ומקצועיים"}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
