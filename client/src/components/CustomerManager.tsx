import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useStore } from '../context/StoreContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import CalendarView from './CalendarView';

export const CustomerManager = observer(() => {
  const { customerStore, appointmentStore } = useStore();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [calendarRange, setCalendarRange] = useState<'day' | 'week'>('day');

  useEffect(() => {
    customerStore.fetchCustomers();
    appointmentStore.fetchAll();
  }, [customerStore, appointmentStore]);

  const handleViewChange = (_: React.MouseEvent<HTMLElement>, next: 'list' | 'calendar') => {
    if (next) setView(next);
  };

  const handleCalendarRangeChange = (_: React.MouseEvent<HTMLElement>, next: 'day' | 'week') => {
    if (next) setCalendarRange(next);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
          ניהול לקוחות ותורים
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={handleViewChange}
            size="small"
          >
            <ToggleButton value="list">רשימה</ToggleButton>
            <ToggleButton value="calendar">לוח</ToggleButton>
          </ToggleButtonGroup>

          {view === 'calendar' && (
            <ToggleButtonGroup
              value={calendarRange}
              exclusive
              onChange={handleCalendarRangeChange}
              size="small"
            >
              <ToggleButton value="day">יומי</ToggleButton>
              <ToggleButton value="week">שבועי</ToggleButton>
            </ToggleButtonGroup>
          )}
        </Stack>

        {customerStore.error && (
          <Alert
            severity="error"
            onClose={() => customerStore.clearError()}
            sx={{ mb: 3 }}
          >
            {customerStore.error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => customerStore.openForm()}
            sx={{
              backgroundColor: '#6c5ce7',
              '&:hover': {
                backgroundColor: '#5f3dc4',
              },
            }}
          >
            הוסף לקוח חדש
          </Button>
        </Box>
      </Box>

      {customerStore.showForm && <CustomerForm />}

      {customerStore.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : customerStore.customers.length === 0 && !customerStore.showForm ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary">
            לא נמצאו לקוחות. הוסף לקוח כדי להתחיל.
          </Typography>
        </Box>
      ) : (
        customerStore.customers.length > 0 && (view === 'list' ? <CustomerList /> : <CalendarView range={calendarRange} />)
      )}
    </Container>
  );
});

export default CustomerManager;
