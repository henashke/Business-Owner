import GenericDialog from "./GenericDialog.tsx";
import { Grid, Autocomplete, TextField } from "@mui/material";
import {useStore} from "../context/StoreContext.tsx";
import { useState } from "react";
import {AppointmentDTO} from "../services/appointmentApi.ts";
import TimeInput from "./TimeInput.tsx";

interface AddAppointmentDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    dialogDate: Date;
}
export const AddAppointmentDialog = ({openDialog, handleCloseDialog, dialogDate }: AddAppointmentDialogProps) => {
    const {appointmentStore, customerStore} = useStore();
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);


    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        endTime: '',
        notes: '',
    });

    const handleClose = () => {
        setSelectedCustomerId(null);
        setFormData({
            title: '',
            startTime: '',
            endTime: '',
            notes: ''
        })
        handleCloseDialog()
    }

    const handleSaveAppointment = async () => {
        if (!selectedCustomerId || !formData.title || !formData.startTime || !formData.endTime) {
            alert('יש למלא את כל השדות הנדרשים');
            return;
        }

        try {
            const payload: Omit<AppointmentDTO, 'id'> = {
                customerId: selectedCustomerId,
                title: formData.title,
                startTime: new Date(`${dialogDate.toISOString().split('T')[0]}T${formData.startTime}`).toISOString(),
                endTime: new Date(`${dialogDate.toISOString().split('T')[0]}T${formData.endTime}`).toISOString(),
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
            confirmDisabled={!selectedCustomerId || !formData.title || !formData.startTime || !formData.endTime}
        >
            <Grid container spacing={2} sx={{pt: 2}}>
                <Grid item xs={12}>
                    <Autocomplete
                        options={customerStore.customers}
                        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                        value={customerStore.customers.find(c => c.id === selectedCustomerId) || null}
                        onChange={(_, newValue) => setSelectedCustomerId(newValue?.id || null)}
                        renderInput={(params) => (
                            <TextField {...params} label="לקוח" placeholder="חפש לקוח..."/>
                        )}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        noOptionsText="לא נמצאו לקוחות"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="כותרת"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TimeInput title={"שעת התחלה"} value={formData.startTime}
                               onChange={(value) => setFormData({...formData, startTime: value})}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TimeInput title={"שעת סיום"} value={formData.endTime}
                               onChange={(value) => setFormData({...formData, endTime: value})}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="הערות"
                        multiline
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                </Grid>
            </Grid>
        </GenericDialog>
    )
}