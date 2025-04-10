import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserContext, userReducer } from './store/UserStore'
import Header from './layout/Header'
import Home from './components/Home'
import About from './components/About'
import ExamsDashboard from './components/exams/ExamsDashboard'
import AddExam from './components/exams/AddExam'
import { initialState } from "./store/UserStore";
import DeleteExam from './components/exams/DeleteExam'
import UpdateExam from './components/exams/UpdateExam'

const theme = createTheme();

function App() {
  const [user, userDispatch] = useReducer(userReducer, initialState);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ currentUser: user, userDispatch }}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ExamsDashboard" element={<ExamsDashboard />} />
            <Route path="/add-exam" element={<AddExam />} />
            {/* <Route path="/delete-exam" element={<DeleteExam />} /> */}
            <Route path="/add-exam" element={<AddExam />} />
            <Route path="/update-exam" element={<UpdateExam />} />

            
          </Routes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
