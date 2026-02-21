import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

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
            <ToggleButtonGroup
                value={currentView}
                exclusive
                sx={{direction: 'ltr', paddingbottom: 2}}
                onChange={handleViewChange}
                size="small"
            >
                <ToggleButton value={AvailableScreens.DAILY_CALENDAR}>טיפולים - היום</ToggleButton>
                <ToggleButton value={AvailableScreens.WEEKLY_CALENDAR}>טיפולים - שבועי</ToggleButton>
                <ToggleButton value={AvailableScreens.CUSTOMERS}>לקוחות</ToggleButton>
            </ToggleButtonGroup>
    )
}