import { IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'light' ? 'עבור למצב לילה' : 'עבור למצב יום'}>
      <IconButton
        onClick={toggleMode}
        size="large"
      >
        {mode === 'light' ? <DarkModeIcon fontSize="medium" /> : <LightModeIcon fontSize="medium" />}
      </IconButton>
    </Tooltip>
  );
}
