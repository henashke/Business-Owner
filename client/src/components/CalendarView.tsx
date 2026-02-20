import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box, Button, Card, CardContent, Grid, Typography,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useStore} from '../context/StoreContext';
import AppointmentCard from './AppointmentCard';
import {AddAppointmentDialog} from "./AddAppointmentDialog.tsx";

interface CalendarViewProps {
    days: Date[];
    gridSize: { xs: number; sm: number; md: number };
}

export const CalendarView = observer(({days, gridSize}: CalendarViewProps) => {
    const {appointmentStore} = useStore();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogDate, setDialogDate] = useState(new Date());


    const handleOpenDialog = (date: Date) => {
        setDialogDate(date);
        setOpenDialog(true);
    };

    const getAppointmentsForDay = (day: Date) => {
        const dayStr = day.toISOString().split('T')[0];
        return appointmentStore.appointments.filter((apt) => {
            const aptDay = apt.startTime.split('T')[0];
            return aptDay === dayStr;
        });
    };

    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    return (
        <Box>
            <Grid container spacing={2}>
                {days.map((day, idx) => {
                    const appointments = getAppointmentsForDay(day);
                    const dayName = dayNames[day.getDay()];
                    const dayStr = day.toLocaleDateString('he-IL');

                    return (
                        <Grid item xs={gridSize.xs} sm={gridSize.sm} md={gridSize.md} key={idx}>
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
                                                אין תורים
                                            </Typography>
                                        ) : (
                                            appointments.map((apt) => (
                                                <AppointmentCard appointmentDTO={apt}/>
                                            ))
                                        )}
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<AddIcon/>}
                                        onClick={() => handleOpenDialog(day)}
                                        sx={{mt: 1}}
                                    >
                                        הוסף תור
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <AddAppointmentDialog dialogDate={dialogDate}
                                  openDialog={openDialog}
                                  handleCloseDialog={() => setOpenDialog(false)}/>
        </Box>

    );
});

export default CalendarView;

