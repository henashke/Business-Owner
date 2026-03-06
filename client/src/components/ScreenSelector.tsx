import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export enum AvailableScreens {
    CALENDAR = 'calendar',
    CUSTOMERS = 'customers',
    LEADS = 'leads',
    TREATMENTS = 'treatments',
}

export enum CalendarSubView {
    DAILY = 'daily',
    WEEKLY = 'weekly',
}

export const ScreenSelector = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getMainView = (): AvailableScreens => {
        if (location.pathname === '/customers') return AvailableScreens.CUSTOMERS;
        if (location.pathname === '/leads') return AvailableScreens.LEADS;
        if (location.pathname === '/treatments') return AvailableScreens.TREATMENTS;
        return AvailableScreens.CALENDAR;
    };

    const currentMainView = getMainView();

    const handleMainChange = (_: React.MouseEvent<HTMLElement>, next: AvailableScreens | null) => {
        if (!next) return;
        if (next === AvailableScreens.CALENDAR) {
            if (location.pathname === '/customers' || location.pathname === '/leads' || location.pathname === '/treatments') {
                navigate(`/${CalendarSubView.DAILY}`);
            } else {
                navigate(location.pathname);
            }
        } else {
            navigate(`/${next}`);
        }
    };

    return (
        <ToggleButtonGroup
            value={currentMainView}
            exclusive
            sx={{ direction: 'ltr', paddingBottom: 2 }}
            onChange={handleMainChange}
            size="small"
            aria-label="main view selector"
        >
            <ToggleButton value={AvailableScreens.CALENDAR}>טיפולים</ToggleButton>
            <ToggleButton value={AvailableScreens.CUSTOMERS}>לקוחות</ToggleButton>
            <ToggleButton value={AvailableScreens.LEADS}>לידים</ToggleButton>
            <ToggleButton value={AvailableScreens.TREATMENTS}>סוגי טיפול</ToggleButton>
        </ToggleButtonGroup>
    )
}

export const CalendarSubSelector = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getCalendarView = (): CalendarSubView => {
        if (location.pathname === '/weekly') return CalendarSubView.WEEKLY;
        return CalendarSubView.DAILY;
    };

    if (location.pathname === '/customers' || location.pathname === '/leads' || location.pathname === '/treatments') return null;

    const currentCalendarView = getCalendarView();

    const handleCalendarSubChange = (_: React.MouseEvent<HTMLElement>, next: CalendarSubView | null) => {
        if (!next) return;
        navigate(`/${next}`);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ToggleButtonGroup
                value={currentCalendarView}
                exclusive
                onChange={handleCalendarSubChange}
                size="small"
                aria-label="calendar subview selector"
            >
                <ToggleButton value={CalendarSubView.DAILY}>יומי</ToggleButton>
                <ToggleButton value={CalendarSubView.WEEKLY}>שבועי</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}