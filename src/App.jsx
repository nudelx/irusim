import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthContextProvider } from './context/Auth'
import Gate from './components/Gate'
import { useCallback, useEffect, useState } from 'react'
function App() {
  const [dark, setDark] = useState(!!localStorage.getItem('isDark'))
  const setTheme = useCallback(() => {
    setDark((dark) => !dark)
  }, [])

  useEffect(() => {
    dark ? localStorage.setItem('isDark', dark) : localStorage.removeItem('isDark')
  }, [dark])

  const darkTheme = createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthContextProvider>
        <CssBaseline />
        <Gate setDark={setTheme} />
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default App
