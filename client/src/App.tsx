import { BrowserRouter } from 'react-router-dom'
import MainScreen from './components/MainScreen'
import { StoreProvider } from './context/StoreContext'
import { ThemeModeProvider } from './context/ThemeContext'
import { appointmentStore } from './stores/AppointmentStore'
import { customerStore } from './stores/CustomerStore'

function App() {
  return (
    <BrowserRouter>
      <ThemeModeProvider>
        <StoreProvider stores={{ customerStore, appointmentStore }}>
          <MainScreen />
        </StoreProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  )
}

export default App
