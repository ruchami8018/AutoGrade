import { useReducer } from 'react'
// import { useReducer, useState } from 'react'
import './App.css'
// import { createTheme } from '@mui/material/styles'
import { RouterProvider } from 'react-router-dom'
// import { BrowserRouter as Router, RouterProvider } from 'react-router-dom'
// import { UserContext } from './context/UserReducer'
// import { initialState } from "./store/UserStore";
import { router } from './Router'
import UserReducer, { initialUser, UserContext } from './context/UserReducer'


function App() {
  const [user, userDispatch] = useReducer(UserReducer, initialUser);

  return (
    // <ThemeProvider theme={theme}>
    //   <UserContext.Provider value={{ currentUser: user, userDispatch }}>
    //     <Router>
    //       <Header />
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/ExamsDashboard" element={<ExamsDashboard />} />
    //         <Route path="/add-exam" element={<AddExam />} />
    //         {/* <Route path="/delete-exam" element={<DeleteExam />} /> */}
    //         <Route path="/add-exam" element={<AddExam />} />
    //         {/* <Route path="/update-exam" element={<UpdateExam />} /> */}
    //         <Route path="/upload-student-exam/:examId" element={<UploadStudentExam />} />
    //         <Route path="/teachers-chat" element={<TeachersChat />} />
    //       </Routes>
    //     </Router>
    //   </UserContext.Provider>
    // </ThemeProvider>

    <>
    <UserContext.Provider value={{ user, userDispatch }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
    </>
  )
}
export default App


// import React, { useReducer } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserContext, userReducer } from './store/UserStore';
// import Header from './layout/Header';
// import Home from './components/Home';
// import About from './components/About';
// import ExamsDashboard from './components/exams/ExamsDashboard';
// import AddExam from './components/exams/AddExam';
// import UpdateExam from './components/exams/UpdateExam';
// import UploadStudentExam from './components/exams/UploadStudentExam';
// import { User } from './models/User';
// import { List } from 'immutable';

// const theme = createTheme();

// const initialState: User = {
//   id: 0,
//   name: '',
//   password: '',
//   email: '',
//   school: '',
//   role: '',
//   exams: List(),
//   isLoggedIn: false,
// };

// function App() {
//   const [user, userDispatch] = useReducer(userReducer, initialState);

//   return (
//     <ThemeProvider theme={theme}>
//       <UserContext.Provider value={{ currentUser: user, userDispatch }}>
//         <Router>
//           <Header />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/ExamsDashboard" element={<ExamsDashboard />} />
//             <Route path="/add-exam" element={<AddExam />} />
//             <Route path="/update-exam/:examId" element={<UpdateExam />} />
//             <Route path="/upload-student-exam/:examId" element={<UploadStudentExam />} />
//           </Routes>
//         </Router>
//       </UserContext.Provider>
//     </ThemeProvider>
//   );
// }

// export default App;
