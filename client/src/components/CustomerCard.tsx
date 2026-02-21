import {Box, Card, CardContent, IconButton, Typography, useTheme} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

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
    const theme = useTheme();

    const ActionButtons = () =>
        <Box sx={{display: 'flex'}}>
            <IconButton onClick={() => onEdit(id)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => onDelete(id)}>
                <DeleteIcon/>
            </IconButton>
        </Box>

    return (
        <Card
            sx={{
                display: 'flex',
                border: `1px solid ${theme.palette.divider}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: theme.palette.primary.main,
                },
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                }}
            >
                <Avatar initials={`${firstName[0]}${lastName[0]}`}/>

                <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    <Typography variant="h6">
                        {firstName} {lastName}
                    </Typography>

                    {phoneNumber && (
                        <Typography variant="body2">
                            {phoneNumber}
                        </Typography>
                    )}
                    <StatusBadge status={active ? 'active' : 'inactive'}/>
                </Box>
                <ActionButtons/>
            </CardContent>
        </Card>
    );
};

export default CustomerCard;

