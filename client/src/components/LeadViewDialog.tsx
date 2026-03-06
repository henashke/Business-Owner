import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Typography,
    Stack,
} from '@mui/material';
import { LeadDTO } from '../services/leadApi';
import LeadStatusBadge from './LeadStatusBadge';

interface LeadViewDialogProps {
    open: boolean;
    onClose: () => void;
    onEdit: (lead: LeadDTO) => void;
    lead: LeadDTO | null;
}

export const LeadViewDialog = ({
    open,
    onClose,
    onEdit,
    lead,
}: LeadViewDialogProps) => {
    if (!lead) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>פרטי הליד</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            שם
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {lead.name}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            תאריך עניין ראשוני
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {lead.initialInterestDate || '-'}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            פרטי יצירת קשר
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {lead.contactInfo || '-'}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            סוג טיפול
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {lead.treatmentTypeName || '-'}
                        </Typography>
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            סטטוס
                        </Typography>
                        <LeadStatusBadge status={lead.status} />
                    </Stack>

                    <Stack spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                            תאריך מעקב
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {lead.followUpDate || '-'}
                        </Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
                <Button onClick={onClose} sx={{ color: '#7f8c8d' }}>
                    סגור
                </Button>
                <Button
                    onClick={() => {
                        onEdit(lead);
                        onClose();
                    }}
                    variant="contained"
                    sx={{
                        backgroundColor: '#6c5ce7',
                        '&:hover': {
                            backgroundColor: '#5f4dd3',
                        },
                    }}
                >
                    ערוך
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LeadViewDialog;

