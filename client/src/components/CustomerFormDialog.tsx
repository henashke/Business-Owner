import {useState, useEffect} from 'react';
import {TextField, FormControlLabel, Checkbox, Box} from '@mui/material';
import {CustomerDTO} from '../services/customerApi';
import {GenericDialog} from './GenericDialog';

interface CustomerFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (customer: CustomerDTO) => Promise<void>;
  customer: CustomerDTO | null;
}

export const CustomerFormDialog = ({
  open,
  onClose,
  onSave,
  customer,
}: CustomerFormDialogProps) => {
  const [formData, setFormData] = useState<CustomerDTO>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    notes: '',
    active: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        notes: '',
        active: true,
      });
    }
  }, [customer, open]);

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit}
      title={customer ? 'ערוך לקוח' : 'הוסף לקוח חדש'}
      confirmDisabled={!formData.firstName || !formData.lastName}
      loading={saving}
    >
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
        <TextField
          label="שם פרטי"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          required
          fullWidth
        />
        <TextField
          label="שם משפחה"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          required
          fullWidth
        />
        <TextField
          label="אימייל"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          fullWidth
        />
        <TextField
          label="טלפון"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          fullWidth
        />
        <TextField
          label="הערות"
          value={formData.notes}
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
          multiline
          rows={3}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.active}
              onChange={(e) => setFormData({...formData, active: e.target.checked})}
            />
          }
          label="לקוח פעיל"
        />
      </Box>
    </GenericDialog>
  );
};

export default CustomerFormDialog;
