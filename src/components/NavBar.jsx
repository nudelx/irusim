import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import HE from '../utils/i18n'
import PropTypes from 'prop-types'

const NavBar = ({ signOut, user }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} pr={2}>
          {`🧑🏼‍✈️ ${HE.title}`}
        </Typography>
        {user && (
          <Button color="inherit" onClick={() => signOut()}>
            {HE.logout}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </Box>
)

NavBar.propTypes = {
  signOut: PropTypes.func,
  user: PropTypes.object,
}

export default NavBar
