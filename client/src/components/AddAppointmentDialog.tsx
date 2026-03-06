import GenericDialog from "./GenericDialog.tsx";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { useStore } from "../context/StoreContext.tsx";
import { useState, useEffect } from "react";
import { AppointmentDTO } from "../services/appointmentApi.ts";
import TimeInput from "./TimeInput.tsx";

interface AddAppointmentDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    dialogDate: Date;
}
export const AddAppointmentDialog = ({ openDialog, handleCloseDialog, dialogDate }: AddAppointmentDialogProps) => {
    const { appointmentStore, customerStore, treatmentTypeStore } = useStore();
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
    const [selectedTreatmentTypeId, setSelectedTreatmentTypeId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        startTime: '',
        notes: '',
    });

    useEffect(() => {
        if (openDialog) {
            treatmentTypeStore.fetchTreatmentTypes();
        }
    }, [openDialog, treatmentTypeStore]);

    const handleClose = () => {
        setSelectedCustomerId(null);
        setSelectedTreatmentTypeId(null);
        setFormData({
            startTime: '',
            notes: ''
        })
        handleCloseDialog()
    }

    const handleSaveAppointment = async () => {
        if (!selectedCustomerId || !selectedTreatmentTypeId || !formData.startTime) {
            alert('יש למלא את כל השדות הנדרשים');
            return;
        }

        try {
            const payload: Omit<AppointmentDTO, 'id'> = {
                customerId: selectedCustomerId,
                treatmentTypeId: selectedTreatmentTypeId,
                startTime: new Date(`${dialogDate.toISOString().split('T')[0]}T${formData.startTime}`).toISOString(),
                endTime: new Date(`${dialogDate.toISOString().split('T')[0]}T${formData.startTime}`).toISOString(), // Backend ignores this placeholder and sets it properly
                notes: formData.notes,
            };
            await appointmentStore.createAppointment(payload);
            handleCloseDialog();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <GenericDialog
            open={openDialog}
            onClose={handleClose}
            onConfirm={handleSaveAppointment}
            title={`תור חדש ב-${dialogDate.toLocaleDateString('he-IL')}`}
            confirmDisabled={!selectedCustomerId || !selectedTreatmentTypeId || !formData.startTime}
        >
            <Grid container spacing={2} sx={{ pt: 2 }}>
                <Grid item xs={12}>
                    <Autocomplete
                        options={customerStore.customers}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        value={customerStore.customers.find(c => c.id === selectedCustomerId) || null}
                        onChange={(_, newValue) => setSelectedCustomerId(newValue?.id || null)}
                        renderInput={(params) => (
                            <TextField {...params} label="לקוח *" placeholder="חפש לקוח..." />
                        )}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        noOptionsText="לא נמצאו לקוחות"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Autocomplete
                        options={treatmentTypeStore.treatmentTypes}
                        getOptionLabel={(option) => `${option.name} (₪${option.price}, ${option.durationMinutes} דק')`}
                        value={treatmentTypeStore.treatmentTypes.find(t => t.id === selectedTreatmentTypeId) || null}
                        onChange={(_, newValue) => setSelectedTreatmentTypeId(newValue?.id || null)}
                        renderInput={(params) => (
                            <TextField {...params} label="סוג טיפול *" placeholder="בחר טיפול..." />
                        )}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        noOptionsText="לא נמצאו סוגי טיפול"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TimeInput title={"שעת התחלה *"} value={formData.startTime}
                        onChange={(value) => setFormData({ ...formData, startTime: value })} />
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
        </GenericDialog>
    )
}