import { Grid, Typography, TextField, InputAdornment, Button } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import KeyIcon from '@mui/icons-material/Key'
import HE from '../utils/i18n'
import { useCallback, useState } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import { useAuthContext } from '../context/Auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { isMobile } = useIsMobile()
  const { SignIn } = useAuthContext()
  const handleLogin = useCallback(
    () =>
      SignIn({
        user: username,
        pass: password,
      }),
    [username, password, SignIn],
  )

  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', paddingTop: 15 }}
      justifyContent="center"
      alignItems="flex-start"
      dir="rtl"
    >
      <Grid container item xs={10} rowGap={7}>
        <Grid item container justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h1">{`🧑🏼‍✈️`} </Typography>
          <Typography pt={2} variant="h4">
            {HE.title}
          </Typography>
        </Grid>
        <Grid
          container
          mt={1}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          rowGap={3}
        >
          <Grid item xs={isMobile ? 10 : 4}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={HE.username}
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={HE.password}
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <KeyIcon />
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item mt={2}>
            <Button
              variant="contained"
              sx={{ width: '300px', padding: '15px 0' }}
              onClick={handleLogin}
            >
              {HE.login}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Login
