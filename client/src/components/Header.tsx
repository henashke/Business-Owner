import {AppBar} from '@mui/material';
import DarkModeToggle from './DarkModeToggle';
import logo from '../assets/ziv_danino.png';
import {useThemeMode} from "../context/ThemeContext.tsx";
import {ScreenSelector} from "./ScreenSelector.tsx";


export const Header = () => {
    const {mode} = useThemeMode();
    const isDark = mode === 'dark';

    return (
        <AppBar sx={{
            position: 'sticky',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: 2
        }}>
            dsfjfhsdakjfas;kdjfvazana
            <img src={logo} alt="logo" width="50px"
                 style={{
                     top: "1rem",
                     right: "1rem",
                     filter: isDark ? 'invert(1)' : 'invert(0)'
                 }}
            />
            <ScreenSelector/>
            <DarkModeToggle/>
        </AppBar>
    );
}
