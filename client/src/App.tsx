import React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { StoreProvider } from './context/StoreContext'
import { customerStore } from './stores/CustomerStore'
import { appointmentStore } from './stores/AppointmentStore'
import CustomerManager from './components/CustomerManager'

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#6c5ce7',
    },
    secondary: {
      main: '#a29bfe',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider stores={{ customerStore, appointmentStore }}>
        <CustomerManager />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
