import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
} from '@mui/material';
import { useStore } from '../context/StoreContext';
import { CustomerDTO } from '../services/customerApi';

interface FormErrors {
  [key: string]: string;
}

export const CustomerForm = observer(() => {
  const { customerStore } = useStore();
  const [formData, setFormData] = useState<CustomerDTO>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
    active: true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (customerStore.editingCustomer) {
      setFormData(customerStore.editingCustomer);
    }
  }, [customerStore.editingCustomer]);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'יש להזין שם פרטי';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'יש להזין שם משפחה';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      if (customerStore.isEditing && customerStore.editingCustomer?.id) {
        await customerStore.updateCustomer(customerStore.editingCustomer.id, formData);
      } else {
        await customerStore.createCustomer(formData);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={customerStore.showForm} onClose={() => customerStore.closeForm()} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        {customerStore.isEditing ? 'עריכת לקוח' : 'הוספת לקוח חדש'}
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        {customerStore.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {customerStore.error}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="שם פרטי"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="שם משפחה"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="אימייל"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="טלפון"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="הערות"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
              }
              label="פעיל"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={() => customerStore.closeForm()}
          disabled={submitting}
          sx={{ color: '#7f8c8d' }}
        >
          בטל
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting}
          sx={{
            backgroundColor: '#6c5ce7',
            '&:hover': {
              backgroundColor: '#5f3dc4',
            },
          }}
        >
          {submitting ? 'שומר...' : customerStore.isEditing ? 'עדכן לקוח' : 'צור לקוח'}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CustomerForm;

