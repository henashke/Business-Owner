import {Button, Card, CardContent, Typography, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {AppointmentDTO} from '../services/appointmentApi';
import AppointmentCard from './AppointmentCard';

interface CalendarDayCardProps {
    day: Date;
    appointments: AppointmentDTO[];
    onAddAppointment: (date: Date) => void;
}

const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

export const CalendarDayCard = ({day, appointments, onAddAppointment}: CalendarDayCardProps) => {
    const dayName = dayNames[day.getDay()];
    const dayStr = day.toLocaleDateString('he-IL');

    return (
        <Card sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{
                flex: 1,
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column"
            }}>
                <Typography variant="h6" sx={{mb: 1}}>
                    {dayName} - {dayStr}
                </Typography>

                <Box sx={{mb: 2}}>
                    {appointments.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            אין טיפולים
                        </Typography>
                    ) : (
                        appointments.map((apt) => (
                            <AppointmentCard key={apt.id} appointmentDTO={apt}/>
                        ))
                    )}
                </Box>

                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    onClick={() => onAddAppointment(day)}
                    sx={{mt: 1}}
                >
                    הוסף תור
                </Button>
            </CardContent>
        </Card>
    );
};

export default CalendarDayCard;

