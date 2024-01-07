import { Grid, Typography } from '@mui/material'
import HE from '../utils/i18n'
import Week from './Week'

const Page = () => (
  <Grid
    container
    sx={{ height: '100vh', width: '100vw', paddingTop: 10, border: '1px solid red' }}
    justifyContent="center"
    alignItems="flex-start"
  >
    <Grid item sx={{ border: '1px solid blue' }} xs={10}>
      <Grid item sx={{ border: '1px solid red' }}>
        <Typography variant="body2">{HE.today} </Typography>
      </Grid>
      <Grid container>
        <Grid item>
          <Week />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)

export default Page
