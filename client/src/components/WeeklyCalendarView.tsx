import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Button, Stack, Typography} from '@mui/material';
import {CalendarView} from './CalendarView';

export const WeeklyCalendarView = observer(() => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysToDisplay = () => {
    const today = new Date(selectedDate);
    const days = [];
    // Week view: show current week (Sunday to Saturday)
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    for (let i = 0; i < 6; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const days = getDaysToDisplay();

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          onClick={() => {
            const prev = new Date(selectedDate);
            prev.setDate(prev.getDate() - 7);
            setSelectedDate(prev);
          }}
        >
          ←
        </Button>
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', alignSelf: 'center' }}>
          {selectedDate.toLocaleDateString('he-IL')}
        </Typography>
        <Button
          onClick={() => {
            const next = new Date(selectedDate);
            next.setDate(next.getDate() + 7);
            setSelectedDate(next);
          }}
        >
          →
        </Button>
      </Stack>

      <CalendarView days={days} gridSize={{ xs: 6, sm: 6, md: 4 }} />
    </>
  );
});

export default WeeklyCalendarView;
