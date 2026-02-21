import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { CalendarView } from './CalendarView';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface GenericCalendarViewProps {
  // Function that takes the selected date and returns the array of days to display
  getDays: (selectedDate: Date) => Date[];
  // Grid size configuration for CalendarView
  gridSize: { xs: number; sm: number; md: number };
  // Optional: custom label (defaults to formatted selectedDate)
  getLabel?: (selectedDate: Date) => string;
  // Optional: number of days to move forward/backward (defaults to 1)
  stepSize?: number;
}

export const GenericCalendarView = observer(
  ({
    getDays,
    gridSize,
    getLabel,
    stepSize = 1,
  }: GenericCalendarViewProps) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const days = getDays(selectedDate);

    const handleDateChange = (offset: number) => {
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + offset * stepSize);
      setSelectedDate(newDate);
    };

    const label =
      getLabel?.(selectedDate) ??
      (days.length > 1
        ? `${days[0].toLocaleDateString('he-IL')} - ${days[days.length - 1].toLocaleDateString('he-IL')}`
        : selectedDate.toLocaleDateString('he-IL'));

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <IconButton onClick={() => handleDateChange(-1)}>
            <ArrowForward />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >
            {label}
          </Typography>
          <IconButton onClick={() => handleDateChange(1)}>
            <ArrowBack />
          </IconButton>
        </Stack>

        <CalendarView days={days} gridSize={gridSize} />
      </Box>
    );
  }
);

export default GenericCalendarView;

