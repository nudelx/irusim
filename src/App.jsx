import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthContextProvider } from './context/Auth'
import { DataProvider } from './context/Data'
import Gate from './components/Gate'

function App() {
  return (
    <AuthContextProvider>
      <CssBaseline />
      <DataProvider>
        <Gate />
      </DataProvider>
    </AuthContextProvider>
  )
}

export default App
