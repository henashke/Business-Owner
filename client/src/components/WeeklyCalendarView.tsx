import { GenericCalendarView } from './GenericCalendarView';

export const WeeklyCalendarView = () => {
  const getDays = (selectedDate: Date) => {
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

  return (
    <GenericCalendarView
      getDays={getDays}
      gridSize={{ xs: 6, sm: 6, md: 4 }}
      stepSize={7}
    />
  );
};

export default WeeklyCalendarView;
