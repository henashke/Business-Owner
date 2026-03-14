import { useState, useEffect } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    SelectChangeEvent,
    Autocomplete,
} from '@mui/material';
import { LeadDTO, LeadStatus } from '../services/leadApi';
import { GenericDialog } from './GenericDialog';
import { useStore } from '../context/StoreContext';

interface LeadFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: (lead: Omit<LeadDTO, 'id'>) => Promise<void>;
    lead: LeadDTO | null;
}

const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
    { value: 'HOT', label: '🔥 חם' },
    { value: 'COLD', label: '❄️ קר' },
    { value: 'WAITING_FOR_DEPOSIT', label: '⏳ ממתין לדיפוזיט' },
    { value: 'CANCELED', label: '✖ בוטל' },
    { value: 'NOT_RELEVANT', label: '– לא רלוונטי' },
    { value: 'SUCCESSFULLY_BOOKED', label: '✔ נקבעה פגישה' },
];

const EMPTY_FORM: Omit<LeadDTO, 'id'> = {
    name: '',
    initialInterestDate: '',
    contactInfo: '',
    treatmentTypeId: null,
    status: 'COLD',
    followUpDate: null,
    notes: '',
};

export const LeadFormDialog = ({
    open,
    onClose,
    onSave,
    lead,
}: LeadFormDialogProps) => {
    const { treatmentTypeStore } = useStore();
    const [formData, setFormData] = useState<Omit<LeadDTO, 'id'>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (open) {
            treatmentTypeStore.fetchTreatmentTypes();
        }
    }, [open, treatmentTypeStore]);

    useEffect(() => {
        if (lead) {
            setFormData({
                name: lead.name,
                initialInterestDate: lead.initialInterestDate,
                contactInfo: lead.contactInfo,
                treatmentTypeId: lead.treatmentTypeId,
                status: lead.status,
                followUpDate: lead.followUpDate ?? null,
                notes: lead.notes || '',
            });
        } else {
            setFormData(EMPTY_FORM);
        }
    }, [lead, open]);

    const handleTextChange = (field: keyof Omit<LeadDTO, 'id'>, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleStatusChange = (e: SelectChangeEvent<LeadStatus>) => {
        setFormData((prev) => ({ ...prev, status: e.target.value as LeadStatus }));
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            await onSave(formData);
        } finally {
            setSaving(false);
        }
    };

    const isValid =
        !!formData.name.trim() &&
        !!formData.initialInterestDate &&
        !!formData.contactInfo.trim() &&
        formData.treatmentTypeId !== null;

    return (
        <GenericDialog
            open={open}
            onClose={onClose}
            onConfirm={handleSubmit}
            title={lead ? 'ערוך ליד' : 'הוסף ליד חדש'}
            confirmDisabled={!isValid}
            loading={saving}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <TextField
                    label="שם *"
                    value={formData.name}
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    required
                    fullWidth
                />

                <TextField
                    label="תאריך עניין ראשוני *"
                    type="date"
                    value={formData.initialInterestDate}
                    onChange={(e) => handleTextChange('initialInterestDate', e.target.value)}
                    required
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                />

                <TextField
                    label="פרטי יצירת קשר (טלפון / אינסטגרם) *"
                    value={formData.contactInfo}
                    onChange={(e) => handleTextChange('contactInfo', e.target.value)}
                    required
                    fullWidth
                />

                <Autocomplete
                    options={treatmentTypeStore.treatmentTypes}
                    getOptionLabel={(option) => `${option.name} (₪${option.price}, ${option.durationMinutes} דק')`}
                    value={treatmentTypeStore.treatmentTypes.find(t => t.id === formData.treatmentTypeId) || null}
                    onChange={(_, newValue) => setFormData(prev => ({ ...prev, treatmentTypeId: newValue?.id || null }))}
                    renderInput={(params) => (
                        <TextField {...params} label="סוג טיפול *" required fullWidth />
                    )}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    noOptionsText="לא נמצאו סוגי טיפול"
                />

                <FormControl fullWidth>
                    <InputLabel>סטטוס</InputLabel>
                    <Select<LeadStatus>
                        value={formData.status}
                        label="סטטוס"
                        onChange={handleStatusChange}
                    >
                        {LEAD_STATUS_OPTIONS.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="תאריך מעקב"
                    type="date"
                    value={formData.followUpDate ?? ''}
                    onChange={(e) =>
                        handleTextChange('followUpDate', e.target.value || '')
                    }
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText="אופציונלי"
                />

                <TextField
                    label="הערות"
                    value={formData.notes || ''}
                    onChange={(e) => handleTextChange('notes', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                />
            </Box>
        </GenericDialog>
    );
};

export default LeadFormDialog;
