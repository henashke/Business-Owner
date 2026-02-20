import {Box, Card, CardContent, Chip, IconButton, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useThemeMode} from '../context/ThemeContext';

interface CustomerCardProps {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    active: boolean;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const CustomerCard = ({
    id,
    firstName,
    lastName,
    phoneNumber,
    active,
    onEdit,
    onDelete,
}: CustomerCardProps) => {
    const theme = useThemeMode();

    return (
        <Card
            sx={{
                backgroundColor: theme.mode === 'dark' ? '#253242' : 'white',
                mb: 1.5,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 2,
                    '&:last-child': { pb: 2 },
                }}
            >
                <Box sx={{flex: 1}}>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mb: 0.5}}>
                        {firstName} {lastName}
                    </Typography>
                    {phoneNumber && (
                        <Typography variant="body2" color="textSecondary" sx={{mb: 0.5}}>
                            {phoneNumber}
                        </Typography>
                    )}
                    <Chip
                        label={active ? 'פעיל' : 'לא פעיל'}
                        color={active ? 'success' : 'default'}
                        size="small"
                        sx={{
                            backgroundColor: active ? '#27ae60' : '#95a5a6',
                            color: 'white',
                            fontWeight: 'bold',
                        }}
                    />
                </Box>

                <Box sx={{display: 'flex', gap: 1}}>
                    <IconButton
                        size="small"
                        onClick={() => onEdit(id)}
                        color="primary"
                        title="ערוך לקוח"
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onDelete(id)}
                        color="error"
                        title="מחק לקוח"
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CustomerCard;

