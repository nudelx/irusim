import NavBar from './NavBar'
import Page from './Page'
import Login from './Login'
import { useAuthContext } from '../context/Auth'
import CircularProgress from '@mui/material/CircularProgress'
import { Grid } from '@mui/material'

const Loading = () => (
  <Grid
    container
    sx={{
      border: '1px solid red',
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

const Gate = () => {
  const { user, loading, SignOut } = useAuthContext()
  console.log('user', user)
  console.log('loading', loading)
  if (loading) return <Loading />
  return (
    <>
      {user ? (
        <div dir="rtl">
          <NavBar signOut={SignOut} user={user} />
          <Page />
        </div>
      ) : (
        <Login />
      )}
    </>
  )
}

export default Gate
