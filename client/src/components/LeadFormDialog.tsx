import { useState, useEffect } from 'react';
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    SelectChangeEvent,
} from '@mui/material';
import { LeadDTO, LeadStatus } from '../services/leadApi';
import { GenericDialog } from './GenericDialog';

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
    treatmentType: '',
    status: 'COLD',
    followUpDate: null,
};

export const LeadFormDialog = ({
    open,
    onClose,
    onSave,
    lead,
}: LeadFormDialogProps) => {
    const [formData, setFormData] = useState<Omit<LeadDTO, 'id'>>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (lead) {
            setFormData({
                name: lead.name,
                initialInterestDate: lead.initialInterestDate,
                contactInfo: lead.contactInfo,
                treatmentType: lead.treatmentType,
                status: lead.status,
                followUpDate: lead.followUpDate ?? null,
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
        !!formData.treatmentType.trim();

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

                <TextField
                    label="סוג טיפול *"
                    value={formData.treatmentType}
                    onChange={(e) => handleTextChange('treatmentType', e.target.value)}
                    required
                    fullWidth
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
            </Box>
        </GenericDialog>
    );
};

export default LeadFormDialog;
