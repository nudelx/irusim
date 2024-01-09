import { Grid, Typography, Button, Box } from '@mui/material'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import HE from '../utils/i18n'
import { useState } from 'react'
import Form from './Form'
import useIsMobile from '../hooks/useIsMobile'
import { useDataContext } from '../context/Data'

const Indicator = ({ active }) => (
  <Box
    sx={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: active ? ' #35d635' : '#ff7575',
    }}
  ></Box>
)

Indicator.propTypes = {
  active: PropTypes.bool,
}

const Card = ({ date, weekend }) => {
  const [open, setOpen] = useState(false)
  const { isMobile } = useIsMobile()
  const { shifts = {} } = useDataContext()
  const today = new Date().toLocaleDateString().replaceAll('/', '_')
  const key = date.toLocaleDateString().replaceAll('/', '_')
  const currentShift = shifts[key] || {}
  console.log('currentShift', currentShift)
  const active = currentShift?.name1 && currentShift?.name2
  return (
    <Grid
      container
      flexDirection="column"
      m={1}
      mb={isMobile ? 8 : 1}
      key={date.getTime()}
      sx={{
        width: isMobile ? '90%' : '250px',
        height: isMobile ? '300px' : '250px',
        border: '1px solid #d4cdcdba',
        justifyContent: 'space-between',
        borderRadius: '8px',
        overflow: 'hidden',
        pb: 2,
      }}
      className={`${today === key ? 'today' : 'card'}`}
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
        <Grid item pl={1}>
          <Indicator active={active} />
        </Grid>
      </Grid>
      <Grid item container flexDirection="column" px={isMobile ? 3 : 1} rowGap={1}>
        <Grid item>
          <Typography variant="h6">{`🧑🏼‍✈️ ${currentShift?.name1 || '--'}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{`🧑🏼‍✈️ ${currentShift?.name2 || '--'}`}</Typography>
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
      <Form open={open} date={date} close={() => setOpen(false)} shift={currentShift} />
    </Grid>
  )
}

Card.propTypes = {
  date: PropTypes.object,
  weekend: PropTypes.bool,
}

export default Card
