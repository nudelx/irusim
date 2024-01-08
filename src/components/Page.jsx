import { Grid, Typography, Divider } from '@mui/material'
import HE from '../utils/i18n'
import Week from './Week'
import { getWeekDays } from '../utils/dateUtils'

const Page = () => {
  const days = getWeekDays(new Date())
  const [[first], [last]] = [days.slice(0, 1), days.slice(-1)]
  const firstString = first && first.toLocaleDateString('he', { month: 'short', day: 'numeric' })
  const lastString = last && last.toLocaleDateString('he', { month: 'short', day: 'numeric' })
  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', paddingTop: 15 }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid container item xs={10} rowGap={7}>
        <Grid item container justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h3">{`${HE.today}`} </Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography pt={2} variant="h4">
            {` ${firstString} - ${lastString}`}{' '}
          </Typography>
        </Grid>
        <Grid container mt={5}>
          <Grid item>
            <Week days={days} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Page
