import { Card, Typography } from '@mui/material';
import { AppointmentDTO } from "../services/appointmentApi.ts";

const formatTime = (dateTime: string): string => {
  return new Date(dateTime).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface AppointmentCardProps {
  appointmentDTO: AppointmentDTO;
}
export const AppointmentCard = ({ appointmentDTO }: AppointmentCardProps) => {
  return (
    <Card sx={(theme) => { return { mb: 1, p: 1, backgroundColor: theme.palette.primary.dark } }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        {appointmentDTO.treatmentTypeName || 'טיפול לא ידוע'}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block' }}>
        {formatTime(appointmentDTO.startTime)} - {formatTime(appointmentDTO.endTime)}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', opacity: 0.8 }}>
        ₪{appointmentDTO.treatmentPrice || 0} ({appointmentDTO.treatmentDurationMinutes || 0} דק')
      </Typography>
      {appointmentDTO.notes && (
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
          הערות: {appointmentDTO.notes}
        </Typography>
      )}
    </Card>
  );
};

export default AppointmentCard;
