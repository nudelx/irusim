import NavBar from './NavBar'
import Page from './Page'
import Login from './Login'
import { useAuthContext } from '../context/Auth'
import CircularProgress from '@mui/material/CircularProgress'
import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import { DataProvider } from '../context/Data'

const Loading = () => (
  <Grid
    container
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress size={100} />
  </Grid>
)

const Gate = ({ setDark }) => {
  const { user, loading, SignOut } = useAuthContext()

  if (loading) return <Loading />
  return (
    <>
      {user ? (
        <DataProvider>
          <div dir="rtl">
            <NavBar signOut={SignOut} user={user} setDark={setDark} />
            <Page />
          </div>
        </DataProvider>
      ) : (
        <Login />
      )}
    </>
  )
}

Gate.propTypes = {
  setDark: PropTypes.func,
}

export default Gate
