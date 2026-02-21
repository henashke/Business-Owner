import {Chip, useTheme} from '@mui/material';

type StatusType = 'active' | 'inactive';

interface StatusBadgeProps {
    status: StatusType;
}

export const StatusBadge = ({status}: StatusBadgeProps) => {
    const theme = useTheme()

    const getStatusStyles = (status: StatusType) => {
        if (status === 'active') {
            return {
                backgroundColor: theme.palette.success.dark,
                color: "white",
                label: 'פעיל',
            };
        }
        return {
            backgroundColor: theme.palette.warning.light,
            color: "black",
            label: 'לא פעיל',
        };
    };

    const styles = getStatusStyles(status);

    return (
        <Chip
            label={styles.label}
            size="small"
            sx={{
                fontSize: '12px',
                fontWeight: 600,
                backgroundColor: styles.backgroundColor,
                color: styles.color,
                border: 'none',
            }}
        />
    );
};

export default StatusBadge;