import { Grid, Typography } from '@mui/material'

const getWeekDays = (date) => {
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)))
}

const Week = () => {
  const days = getWeekDays(new Date())
  console.log('days', days)
  return (
    <Grid container justifyContent="center">
      {days.map((d) => (
        <Grid
          container
          flexDirection="column"
          m={1}
          key={d.getTime()}
          sx={{
            width: '200px',
            height: '250px',
            border: '1px solid green',
            justifyContent: 'flex-start',
          }}
        >
          <Grid item p={1} sx={{ backgroundColor: '#0F467E', color: 'white'}}>
            <Typography variant='h6'>{d.toLocaleDateString('he', {month: "short", day:"numeric", weekday: 'long',})}</Typography>
          </Grid>
          <Grid item container flexDirection="column">
            <Grid item>
              <Typography> Alex</Typography>
            </Grid>
            <Grid item>
              <Typography> David</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default Week
