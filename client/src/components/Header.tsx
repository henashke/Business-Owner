import {
  Box,
  Typography
} from '@mui/material';
import DarkModeToggle from './DarkModeToggle';


export const Header = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
      זיו דנינו
    </Typography>
    <DarkModeToggle />
  </Box>
);