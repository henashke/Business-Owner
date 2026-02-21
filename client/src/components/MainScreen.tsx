import {observer} from 'mobx-react-lite';
import {Header} from './Header';
import {Routing} from "./Routing.tsx";
import {Box} from "@mui/material";
import {CalendarSubSelector} from './ScreenSelector';

export const MainScreen = observer(() => {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', gap: 2}}>
            <Header/>
            <CalendarSubSelector />
            <Routing/>
        </Box>
    );
});

export default MainScreen;