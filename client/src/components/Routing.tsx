import DailyCalendarView from "./DailyCalendarView.tsx";
import WeeklyCalendarView from "./WeeklyCalendarView.tsx";
import CustomerList from "./CustomerList.tsx";
import {Route, Routes } from "react-router-dom";

export const Routing = () => (
    <Routes>
        <Route path="/" element={<DailyCalendarView/>}/>
        <Route path="/daily" element={<DailyCalendarView/>}/>
        <Route path="/weekly" element={<WeeklyCalendarView/>}/>
        <Route path="/customers" element={<CustomerList/>}/>
    </Routes>
);