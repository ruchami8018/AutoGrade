// import { createContext } from "react";
// import { Exam } from "../models/Exam";
// import { List } from "immutable";

// export interface ExamsState {
//   exams: List<Exam>;
//   loading: boolean;
//   error: string | null;
// }

// export type ExamsAction =
//   | { type: "FETCH_EXAMS_START" }
//   | { type: "FETCH_EXAMS_SUCCESS"; payload: Exam[] }
//   | { type: "FETCH_EXAMS_ERROR"; payload: string }
//   | { type: "ADD_EXAM"; payload: Exam }
//   | { type: "UPDATE_EXAM"; payload: Exam }
//   | { type: "DELETE_EXAM"; payload: number };

// export const initialState: ExamsState = {
//   exams: List<Exam>(),
//   loading: false,
//   error: null
// };

// export const ExamsContext = createContext<{
//   state: ExamsState;
//   dispatch: React.Dispatch<ExamsAction>;
// }>({
//   state: initialState,
//   dispatch: () => null
// });

// export const examsReducer = (state: ExamsState, action: ExamsAction): ExamsState => {
//   switch (action.type) {
//     case "FETCH_EXAMS_START":
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };
    
//     case "FETCH_EXAMS_SUCCESS":
//       return {
//         ...state,
//         loading: false,
//         exams: List(action.payload)
//       };
    
//     case "FETCH_EXAMS_ERROR":
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };
    
//     case "ADD_EXAM":
//       return {
//         ...state,
//         exams: state.exams.push(action.payload)
//       };
    
//     case "UPDATE_EXAM":
//       return {
//         ...state,
//         exams: state.exams.map(exam => 
//           exam.id === action.payload.id ? action.payload : exam
//         ).toList()
//       };
    
//     case "DELETE_EXAM":
//       return {
//         ...state,
//         exams: state.exams.filter(exam => exam.id !== action.payload).toList()
//       };
    
//     default:
//       return state;
//   }
// };


import React, { createContext, useReducer } from 'react';
import { List } from 'immutable';
import { Exam } from '../models/Exam';

export interface ExamsState {
    exams: List<Exam>;
    loading: boolean;
    error: string | null;
}

export type ExamsAction =
    | { type: "FETCH_EXAMS_START" }
    | { type: "FETCH_EXAMS_SUCCESS"; payload: Exam[] }
    | { type: "FETCH_EXAMS_ERROR"; payload: string }
    | { type: "ADD_EXAM"; payload: Exam }
    | { type: "UPDATE_EXAM"; payload: Exam }
    | { type: "DELETE_EXAM"; payload: number };

export const initialState: ExamsState = {
    exams: List(),
    loading: false,
    error: null
};

export const ExamsContext = createContext<{
    state: ExamsState;
    dispatch: React.Dispatch<ExamsAction>;
}>({
    state: initialState,
    dispatch: () => null
});

export const examsReducer = (state: ExamsState, action: ExamsAction): ExamsState => {
    switch (action.type) {
        case "FETCH_EXAMS_START":
            return {
                ...state,
                loading: true,
                error: null
            };

        case "FETCH_EXAMS_SUCCESS":
            return {
                ...state,
                loading: false,
                exams: List(action.payload)
            };

        case "FETCH_EXAMS_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case "ADD_EXAM":
            return {
                ...state,
                exams: state.exams.push(action.payload)
            };

        case "UPDATE_EXAM":
            return {
                ...state,
                exams: state.exams.map(exam =>
                    exam.id === action.payload.id ? action.payload : exam
                ).toList()
            };

        case "DELETE_EXAM":
            return {
                ...state,
                exams: state.exams.filter(exam => exam.id !== action.payload).toList()
            };

        default:
            return state;
    }
};

export const ExamsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(examsReducer, initialState);

    return (
        <ExamsContext.Provider value={{ state, dispatch }}>
            {children}
        </ExamsContext.Provider>
    );
};

export default ExamsProvider;
