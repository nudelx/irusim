import { Grid } from '@mui/material'
import PropTypes from 'prop-types'
import Card from './Card'

const Week = ({ days }) => {
  const week = days && days.slice(0, 5)
  const weekend = days && days.slice(-2)

  return (
    <Grid container justifyContent="center" rowGap={4}>
      <Grid item container justifyContent="center">
        {week.map((d) => (
          <Card date={d} key={d.getTime()} />
        ))}
      </Grid>

      <Grid item container justifyContent="center">
        {weekend.map((d) => (
          <Card weekend date={d} key={d.getTime()} />
        ))}
      </Grid>
    </Grid>
  )
}
Week.propTypes = {
  days: PropTypes.array,
}

export default Week
