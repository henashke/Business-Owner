import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box
} from '@mui/material';
import { TreatmentTypeDTO } from '../services/treatmentTypeApi';

interface Props {
    open: boolean;
    onClose: () => void;
    onSave: (data: Omit<TreatmentTypeDTO, 'id'>) => Promise<void>;
    treatmentType: TreatmentTypeDTO | null;
}

export const TreatmentTypeFormDialog = ({ open, onClose, onSave, treatmentType }: Props) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [durationMinutes, setDurationMinutes] = useState<number | ''>('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (open) {
            if (treatmentType) {
                setName(treatmentType.name);
                setPrice(treatmentType.price);
                setDurationMinutes(treatmentType.durationMinutes);
            } else {
                setName('');
                setPrice('');
                setDurationMinutes('');
            }
        }
    }, [open, treatmentType]);

    const handleSave = async () => {
        if (!name || price === '' || durationMinutes === '') return;

        setIsSaving(true);
        try {
            await onSave({
                name,
                price: Number(price),
                durationMinutes: Number(durationMinutes)
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{treatmentType ? 'ערוך סוג טיפול' : 'הוסף סוג טיפול'}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        autoFocus
                        label="שם הטיפול"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="מחיר (₪)"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                        inputProps={{ min: 0 }}
                    />
                    <TextField
                        label="משך זמן (בדקות)"
                        type="number"
                        fullWidth
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(e.target.value === '' ? '' : Number(e.target.value))}
                        required
                        inputProps={{ min: 1 }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" disabled={isSaving}>ביטול</Button>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    disabled={isSaving || !name || price === '' || durationMinutes === ''}
                >
                    שמור
                </Button>
            </DialogActions>
        </Dialog>
    );
};
