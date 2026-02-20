import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../context/StoreContext';
import { AppointmentDTO } from '../services/appointmentApi';

interface CalendarViewProps {
  range: 'day' | 'week';
}

export const CalendarView = observer(({ range }: CalendarViewProps) => {
  const { appointmentStore, customerStore } = useStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [formData, setFormData] = useState({
    customerId: '',
    title: '',
    startTime: '',
    endTime: '',
    notes: '',
  });

  const handleOpenDialog = (date: Date) => {
    setSelectedDate(date);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      customerId: '',
      title: '',
      startTime: '',
      endTime: '',
      notes: '',
    });
  };

  const handleSaveAppointment = async () => {
    if (!formData.customerId || !formData.title || !formData.startTime || !formData.endTime) {
      alert('יש למלא את כל השדות הנדרשים');
      return;
    }

    try {
      const payload: Omit<AppointmentDTO, 'id'> = {
        customerId: parseInt(formData.customerId),
        title: formData.title,
        startTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${formData.startTime}`).toISOString(),
        endTime: new Date(`${selectedDate.toISOString().split('T')[0]}T${formData.endTime}`).toISOString(),
        notes: formData.notes,
      };
      await appointmentStore.createAppointment(payload);
      handleCloseDialog();
    } catch (err) {
      console.error(err);
    }
  };

  // Generate calendar days based on range
  const getDaysToDisplay = () => {
    const today = new Date(selectedDate);
    const days = [];

    if (range === 'day') {
      days.push(today);
    } else {
      // Week view: show current week (Sunday to Saturday)
      const dayOfWeek = today.getDay();
      const start = new Date(today);
      start.setDate(today.getDate() - dayOfWeek);
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        days.push(d);
      }
    }
    return days;
  };

  const getAppointmentsForDay = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0];
    return appointmentStore.appointments.filter((apt) => {
      const aptDay = apt.startTime.split('T')[0];
      return aptDay === dayStr;
    });
  };

  const days = getDaysToDisplay();
  const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          onClick={() => {
            const prev = new Date(selectedDate);
            prev.setDate(prev.getDate() - (range === 'week' ? 7 : 1));
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
            next.setDate(next.getDate() + (range === 'week' ? 7 : 1));
            setSelectedDate(next);
          }}
        >
          →
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {days.map((day, idx) => {
          const appointments = getAppointmentsForDay(day);
          const dayName = dayNames[day.getDay()];
          const dayStr = day.toLocaleDateString('he-IL');

          return (
            <Grid item xs={range === 'day' ? 12 : 6} sm={range === 'day' ? 12 : 6} md={range === 'day' ? 12 : 4} key={idx}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {dayName} - {dayStr}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    {appointments.length === 0 ? (
                      <Typography variant="body2" color="textSecondary">
                        אין תורים
                      </Typography>
                    ) : (
                      appointments.map((apt) => (
                        <Card key={apt.id} sx={{ mb: 1, p: 1, backgroundColor: '#f0f0f0' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {apt.title}
                          </Typography>
                          <Typography variant="caption">
                            {new Date(apt.startTime).toLocaleTimeString('he-IL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                            -{' '}
                            {new Date(apt.endTime).toLocaleTimeString('he-IL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                          {apt.notes && (
                            <Typography variant="caption" display="block">
                              הערות: {apt.notes}
                            </Typography>
                          )}
                        </Card>
                      ))
                    )}
                  </Box>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog(day)}
                    sx={{ mt: 1 }}
                  >
                    הוסף תור
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>הוסף תור ל {selectedDate.toLocaleDateString('he-IL')}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="לקוח"
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                SelectProps={{ native: true }}
              >
                <option value="">בחר לקוח</option>
                {customerStore.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="כותרת"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="שעת התחלה"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="שעת סיום"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="הערות"
                multiline
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#7f8c8d' }}>
            בטל
          </Button>
          <Button onClick={handleSaveAppointment} variant="contained" sx={{ backgroundColor: '#6c5ce7' }}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default CalendarView;

