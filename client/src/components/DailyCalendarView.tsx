import { GenericCalendarView } from './GenericCalendarView';

export const DailyCalendarView = () => {
  const getDays = (selectedDate: Date) => [new Date(selectedDate)];

  return (
    <GenericCalendarView
      getDays={getDays}
      gridSize={{ xs: 12, sm: 12, md: 12 }}
    />
  );
};

export default DailyCalendarView;
