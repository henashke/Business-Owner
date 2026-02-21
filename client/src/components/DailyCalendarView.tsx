import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box, IconButton, Stack, Typography} from '@mui/material';
import {CalendarView} from './CalendarView';
import {ArrowBack, ArrowForward} from "@mui/icons-material";

export const DailyCalendarView = observer(() => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const days = [new Date(selectedDate)];

    const handleDateChange = (days: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, flex: 1}}>
            <Stack direction="row" spacing={2} sx={{p: 2}}>
                <IconButton onClick={() => handleDateChange(-1)}>
                    <ArrowForward/>
                </IconButton>
                <Typography variant="h6" sx={{flex: 1, textAlign: 'center', alignSelf: 'center'}}>
                    {selectedDate.toLocaleDateString('he-IL')}
                </Typography>
                <IconButton onClick={() => handleDateChange(1)}>
                    <ArrowBack/>
                </IconButton>
            </Stack>

            <CalendarView days={days} gridSize={{xs: 12, sm: 12, md: 12}}/>
        </Box>
    );
});

export default DailyCalendarView;
