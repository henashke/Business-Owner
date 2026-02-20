import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box, Button, Stack, Typography} from '@mui/material';
import {CalendarView} from './CalendarView';

export const DailyCalendarView = observer(() => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysToDisplay = () => {
    return [new Date(selectedDate)];
  };

  const days = getDaysToDisplay();

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          onClick={() => {
            const prev = new Date(selectedDate);
            prev.setDate(prev.getDate() - 1);
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
            next.setDate(next.getDate() + 1);
            setSelectedDate(next);
          }}
        >
          →
        </Button>
      </Stack>

      <CalendarView days={days} gridSize={{ xs: 12, sm: 12, md: 12 }} />
    </Box>
  );
});

export default DailyCalendarView;
