import { Chip, useTheme } from '@mui/material';
import { LeadStatus } from '../services/leadApi';

interface LeadStatusBadgeProps {
    status: LeadStatus;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
    HOT: '🔥 חם',
    COLD: '❄️ קר',
    WAITING_FOR_DEPOSIT: '⏳ ממתין לדיפוזיט',
    CANCELED: '✖ בוטל',
    NOT_RELEVANT: '– לא רלוונטי',
    SUCCESSFULLY_BOOKED: '✔ נקבעה פגישה',
};

export const LeadStatusBadge = ({ status }: LeadStatusBadgeProps) => {
    const theme = useTheme();

    const getStatusStyles = (s: LeadStatus) => {
        switch (s) {
            case 'HOT':
                return { backgroundColor: '#e74c3c', color: '#fff' };
            case 'COLD':
                return { backgroundColor: '#3498db', color: '#fff' };
            case 'WAITING_FOR_DEPOSIT':
                return { backgroundColor: '#f39c12', color: '#fff' };
            case 'CANCELED':
                return { backgroundColor: theme.palette.grey[400], color: '#fff' };
            case 'NOT_RELEVANT':
                return { backgroundColor: theme.palette.grey[600], color: '#fff' };
            case 'SUCCESSFULLY_BOOKED':
                return { backgroundColor: theme.palette.success.dark, color: '#fff' };
            default:
                return { backgroundColor: theme.palette.grey[300], color: '#000' };
        }
    };

    const styles = getStatusStyles(status);

    return (
        <Chip
            label={STATUS_LABELS[status]}
            size="small"
            sx={{
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                border: 'none',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
            }}
        />
    );
};

export default LeadStatusBadge;
