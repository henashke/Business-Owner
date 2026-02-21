import {Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useThemeMode} from '../context/ThemeContext';

interface FloatingActionButtonProps {
    onClick: () => void;
    ariaLabel?: string;
}

export const FloatingActionButton = ({
                                         onClick,
                                     }: FloatingActionButtonProps) => {
    const {mode} = useThemeMode();
    const isDark = mode === 'dark';

    return (
        <Fab
            onClick={onClick}
            color="primary"
            sx={{
                position: 'fixed',
                bottom: theme => theme.spacing(4),
                left: theme => theme.spacing(4),
                boxShadow: isDark
                    ? '0 8px 32px rgba(124,77,255,0.6)'
                    : '0 8px 32px rgba(99,102,241,0.45)',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
                '&:active': {
                    transform: 'scale(0.97)',
                },
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <AddIcon/>
        </Fab>
    );
};

export default FloatingActionButton;

