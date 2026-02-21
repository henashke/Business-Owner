import {Box, Button, Typography, useTheme} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EmptyCustomerListProps {
  searchQuery?: string;
  onAddClick?: () => void;
}

export const EmptyCustomerList = ({
  searchQuery,
  onAddClick,
}: EmptyCustomerListProps) => {
  const theme = useTheme()

  const isSearchEmpty = searchQuery && searchQuery.trim().length > 0;

  return (
    <Box
      maxWidth="sm"
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
          }}
        >
          {isSearchEmpty ? 'לא נמצאו לקוחות התואמים לחיפוש' : 'אין לקוחות עדיין'}
        </Typography>
        {!isSearchEmpty && onAddClick && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
          >
            הוסף לקוח חדש
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EmptyCustomerList;

