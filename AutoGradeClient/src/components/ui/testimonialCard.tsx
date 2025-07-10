// import { Star, Quote } from "lucide-react";

// export const TestimonialCard = ({ name, role, content, rating }: { name: string, role: string, content: string, rating: number }) => (//מלבני המלצות
//     <div className="bg-white rounded-xl p-6 shadow-lg min-w-[300px] mx-4 hover:shadow-xl transition-shadow">
//       <div className="flex items-center mb-4">
//         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//           {name.charAt(0)}
//         </div>
//         <div className="mr-4">
//           <h4 className="font-semibold text-gray-800">{name}</h4>
//           <p className="text-sm text-gray-600">{role}</p>
//         </div>
//       </div>
//       <div className="flex mb-4">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//         ))}
//       </div>
//       <Quote className="w-6 h-6 text-blue-500 mb-2" />
//       <p className="text-gray-600 italic leading-relaxed">{content}</p>
//     </div>
//   );
  
// components/ui/testimonialCard.jsx (או היכן ש-TestimonialCard מוגדר)
import { Star, Quote } from "lucide-react";

export const TestimonialCard = ({ name, role, content, rating }: { name: string, role: string, content: string, rating: number }) => (
    // הסרנו את ה-mx-4 מכאן. ה-padding (px-4) מטופל על ידי ה-div ההורה ב-TestimonialCarousel.
    <div className="bg-white rounded-xl p-6 shadow-lg min-w-[300px] hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div className="mr-4">
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
      <Quote className="w-6 h-6 text-blue-500 mb-2" />
      <p className="text-gray-600 italic leading-relaxed">{content}</p>
    </div>
  );
