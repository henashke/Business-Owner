import {useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Box, Grid} from '@mui/material';
import {useStore} from '../context/StoreContext';
import {AddAppointmentDialog} from "./AddAppointmentDialog.tsx";
import {CalendarDayCard} from "./CalendarDayCard.tsx";

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

    return (
        <Box>
            <Grid container spacing={2}>
                {days.map((day, idx) => {
                    const appointments = getAppointmentsForDay(day);

                    return (
                        <Grid item xs={gridSize.xs} sm={gridSize.sm} md={gridSize.md} key={idx}>
                            <CalendarDayCard
                                day={day}
                                appointments={appointments}
                                onAddAppointment={handleOpenDialog}
                            />
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
