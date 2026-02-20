import {Container, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import WeeklyCalendarView from "./WeeklyCalendarView.tsx";
import DailyCalendarView from "./DailyCalendarView.tsx";
import CustomerList from "./CustomerList.tsx";

enum AvailableScreens {
    CUSTOMERS = 'customers',
    WEEKLY_CALENDAR = 'weekly',
    DAILY_CALENDAR = 'daily',
}

export const ScreenSelector = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCurrentView = () => {
        if (location.pathname === '/customers') return AvailableScreens.CUSTOMERS;
        if (location.pathname === '/weekly') return AvailableScreens.WEEKLY_CALENDAR;
        return AvailableScreens.DAILY_CALENDAR;
    };

    const currentView = getCurrentView();

    const handleViewChange = (_: React.MouseEvent<HTMLElement>, next: AvailableScreens) => {
        if (next) navigate(`/${next}`);
    };

    return (
        <>
            <ToggleButtonGroup
                value={currentView}
                exclusive
                sx={{direction: 'ltr'}}
                onChange={handleViewChange}
                size="small"
            >
                <ToggleButton value={AvailableScreens.CUSTOMERS}>לקוחות</ToggleButton>
                <ToggleButton value={AvailableScreens.WEEKLY_CALENDAR}>תורים - שבועי</ToggleButton>
                <ToggleButton value={AvailableScreens.DAILY_CALENDAR}>תורים - יומי</ToggleButton>
            </ToggleButtonGroup>

            <Container sx={{paddingY: 2}}>
                <Routes>
                    <Route path="/" element={<DailyCalendarView/>}/>
                    <Route path="/daily" element={<DailyCalendarView/>}/>
                    <Route path="/weekly" element={<WeeklyCalendarView/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                </Routes>
            </Container>
        </>
    )
}