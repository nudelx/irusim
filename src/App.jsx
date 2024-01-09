import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthContextProvider } from './context/Auth'
import Gate from './components/Gate'
function App() {
  return (
    <AuthContextProvider>
      <CssBaseline />
      <Gate />
    </AuthContextProvider>
  )
}

export default App
