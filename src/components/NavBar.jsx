import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
// import MenuIcon from '@mui/icons-material/Menu'
import HE from '../utils/i18n'
import PropTypes from 'prop-types'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import { useTheme } from '@mui/material/styles'
import LogoutIcon from '@mui/icons-material/Logout'

const NavBar = ({ signOut, user, setDark }) => {
  const theme = useTheme()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} pr={2}>
            {`🧑🏼‍✈️ ${HE.title}`}
          </Typography>
          <IconButton size="large" onClick={setDark}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness5Icon />}
          </IconButton>
          {user && (
            <IconButton size="small" onClick={() => signOut()}>
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
NavBar.propTypes = {
  signOut: PropTypes.func,
  setDark: PropTypes.func,
  user: PropTypes.object,
}

export default NavBar
