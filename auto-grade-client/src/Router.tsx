import { Login, Dashboard, Chat } from "@mui/icons-material";
import { createBrowserRouter } from "react-router-dom";
import AILessonPlanGenerator from "./components/ai/AILessonPlanGenerator";
import AIQuestionGenerator from "./components/ai/AIQuestionGenerator";
import AISummaryGenerator from "./components/ai/AISummaryGenerator";
import AITextAnalyzer from "./components/ai/AITextAnalyzer";
import Layout from "./layout/Layout";
import AI from "./pages/AI";
import Files from "./pages/Files";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
// import Reports from "./pages/Reports";
import Register from "./components/login/register";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />,
      errorElement: <h1>Error!</h1>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      element: <Layout />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/AI-question-generator', element: <AIQuestionGenerator /> },
        { path: '/AI-summary-generator', element: <AISummaryGenerator /> },
        { path: '/AI-text-analyzer', element: <AITextAnalyzer /> },
        { path: '/AI-lesson-plan-generator', element: <AILessonPlanGenerator /> },
        { path: '/AI', element: <AI /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/files', element: <Files /> },
        { path: '/chat', element: <Chat /> },
        // { path: '/reports', element: <Reports /> },
        { path: '/profile', element: <Profile /> },
      ]
    }
  ]);
  