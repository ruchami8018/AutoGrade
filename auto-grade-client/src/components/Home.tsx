// import { Button } from '@mui/material';
// import { useContext, useState } from 'react';
// import { UserContext } from '../store/UserStore';
// import ExamList from './exams/ExamsDashboard';
// import ExamsDashboard from './exams/ExamsDashboard';

// const Home = () => {
//   const { currentUser } = useContext(UserContext);

//   return (
//     <div>
//       {currentUser.isLoggedIn ? (
//         <>
//           {/* <h2>MY EXAMS:</h2> */}
//           <ExamsDashboard />
//         </>
//       ) : (
//         <>
//           <h1>AUTO GRADE</h1>
//           <h2>YOUR SMART TESTER!!!</h2>
//         </>
//       )}
//     </div>
//   );
// };

// export default Home;


import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../store/UserStore';
import ExamList from './exams/ExamsDashboard';
import ExamsDashboard from './exams/ExamsDashboard';

const Home = () => {
    const { currentUser } = useContext(UserContext);

    // return (
    //     <div>
    //         {currentUser.isLoggedIn ? (
    //             <>
    //                 {/* <h2>MY EXAMS:</h2> */}
    //                 <ExamsDashboard />
    //             </>
    //         ) : (
    //             <>
    //                 <h1>AUTO GRADE</h1>
    //                 <h2>YOUR SMART TESTER!!!</h2>
    //             </>
    //         )}
    //     </div>
    // );
};

export default Home;