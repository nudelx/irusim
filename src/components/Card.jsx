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
      backgroundColor: active ? '#26bf26' : '#d95252',
    }}
  ></Box>
)

Indicator.propTypes = {
  active: PropTypes.bool,
}

const Card = ({ date, weekend, page }) => {
  const [open, setOpen] = useState(false)
  const { isMobile } = useIsMobile()
  const { shifts = {} } = useDataContext()
  const today = new Date().toLocaleDateString('en-US').replaceAll('/', '_')
  const key = date.toLocaleDateString('en-US').replaceAll('/', '_')
  const currentShift = shifts[key] || {}
  const active = !!(currentShift?.name1 && currentShift?.name2)
  return (
    <Grid
      container
      flexDirection="column"
      m={1}
      mb={isMobile ? 8 : 1}
      key={date.getTime()}
      sx={{
        width: isMobile ? '90%' : '250px',
        height: isMobile ? '300px' : '260px',
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
        justifyContent="space-between"
        alignItems="center"
        className={weekend ? 'weekendDay' : 'weekday'}
        px={3}
      >
        <Grid item>
          <Typography variant="h6" color={'#fff'}>
            {date.toLocaleDateString('he', { month: 'short', day: 'numeric', weekday: 'long' })}
          </Typography>
        </Grid>
        <Grid item>
          <Indicator active={active} />
        </Grid>
      </Grid>
      <Grid item container flexDirection="column" px={3} rowGap={1}>
        <Grid item>
          <Typography variant="h6">{`🧑🏼‍✈️ ${currentShift?.name1 || '--'}`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{`🧑🏼‍✈️ ${currentShift?.name2 || '--'}`}</Typography>
        </Grid>
      </Grid>

      <Grid item container justifyContent="center" mb={2}>
        <Button
          disabled={page < 0}
          variant="contained"
          // color="#606FC8"
          startIcon={active ? <EditIcon /> : <AddIcon />}
          sx={{ px: 2, borderRadius: '8px', boxShadow: 'unset' }}
          onClick={page >= 0 ? () => setOpen(true) : () => {}}
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
  page: PropTypes.number,
}

export default Card
