import {Box} from '@mui/material';
import {observer} from 'mobx-react-lite';
import {Header} from './Header';
import {ScreenSelector} from "./ScreenSelector.tsx";

export const MainScreen = observer(() => {

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: '100vw',
            height: '100vh'
        }}>
            <Header/>
            <ScreenSelector/>
        </Box>
    );
});

export default MainScreen;