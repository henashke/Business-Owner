import {Container, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import CalendarView from "./CalendarView.tsx";
import CustomerList from "./CustomerList.tsx";

enum AvailableScreens {
    CUSTOMERS = 'customers',
    APPOINTMENTS = 'appointments',
}

export const ScreenSelector = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentView = location.pathname === '/customers' ? AvailableScreens.CUSTOMERS : AvailableScreens.APPOINTMENTS;

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
                <ToggleButton value={AvailableScreens.APPOINTMENTS}>תורים</ToggleButton>
            </ToggleButtonGroup>

            <Container sx={{paddingY: 2}}>
                <Routes>
                    <Route path="/" element={<CalendarView range={"day"}/>}/>
                    <Route path="/appointments" element={<CalendarView range={"day"}/>}/>
                    <Route path="/customers" element={<CustomerList/>}/>
                </Routes>
            </Container>
        </>
    )
}