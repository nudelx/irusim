import { Grid, Typography, Button } from '@mui/material'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import HE from '../utils/i18n'

const Card = ({ date, weekend }) => {
  const active = true
  return (
    <Grid
      container
      flexDirection="column"
      m={1}
      key={date.getTime()}
      sx={{
        width: '200px',
        height: '250px',
        border: '1px solid #d4cdcdba',
        justifyContent: 'space-between',
        borderRadius: '5px',
        overflow: 'hidden',
        pb: 2,
      }}
    >
      <Grid
        container
        item
        p={1}
        sx={{ backgroundColor: weekend ? '#304D30' : '#0F467E', color: 'white' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h6">
            {date.toLocaleDateString('he', { month: 'short', day: 'numeric', weekday: 'long' })}
          </Typography>
        </Grid>
        <Grid item>{active ? '🟢' : '🔴'}</Grid>
      </Grid>
      <Grid item container flexDirection="column" px={1} rowGap={1}>
        <Grid item>
          <Typography>🧑🏼‍✈️ Alex</Typography>
        </Grid>
        <Grid item>
          <Typography>🧑🏼‍✈️ David</Typography>
        </Grid>
      </Grid>

      <Grid item container justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          startIcon={active ? <EditIcon /> : <AddIcon />}
          sx={{ px: 2 }}
        >
          <Typography variant="h6" px={1}>
            {active ? HE.edit : HE.add}
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

Card.propTypes = {
  date: PropTypes.object,
  weekend: PropTypes.bool,
}

export default Card
