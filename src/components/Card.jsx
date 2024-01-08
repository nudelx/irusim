import { Grid, Typography, Button } from '@mui/material'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import HE from '../utils/i18n'
import { useState } from 'react'
import Form from './Form'
import useIsMobile from '../hooks/useIsMobile'

const Card = ({ date, weekend }) => {
  const active = true
  const [open, setOpen] = useState(false)
  const { isMobile } = useIsMobile()
  return (
    <Grid
      container
      flexDirection="column"
      m={1}
      mb={isMobile ? 8 : 1}
      key={date.getTime()}
      sx={{
        width: isMobile ? '90%' : '200px',
        height: isMobile ? '300px' : '250px',
        border: '1px solid #d4cdcdba',
        justifyContent: 'space-between',
        borderRadius: '5px',
        overflow: 'hidden',
        pb: 2,
      }}
      className="card"
    >
      <Grid
        container
        item
        p={1}
        // sx={{ backgroundColor: weekend ? '#304D30' : '#0F467E', color: 'white' }}
        justifyContent="space-between"
        alignItems="center"
        className={weekend ? 'weekendDay' : 'weekday'}
      >
        <Grid item>
          <Typography variant="h6" color={'white'}>
            {date.toLocaleDateString('he', { month: 'short', day: 'numeric', weekday: 'long' })}
          </Typography>
        </Grid>
        <Grid item>{active ? '🟢' : '🔴'}</Grid>
      </Grid>
      <Grid item container flexDirection="column" px={isMobile ? 3 : 1} rowGap={1}>
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
          onClick={() => setOpen(true)}
        >
          <Typography variant="h6" px={1}>
            {active ? HE.edit : HE.add}
          </Typography>
        </Button>
      </Grid>
      <Form open={open} date={date} close={() => setOpen(false)} />
    </Grid>
  )
}

Card.propTypes = {
  date: PropTypes.object,
  weekend: PropTypes.bool,
}

export default Card
