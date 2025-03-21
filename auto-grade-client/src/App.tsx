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
import { initialState } from "./store/UserStore";

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
            {/* <Route path="/login" element={<Login onClose={() => setShowLogin(false)} />} /> */}
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
