import { Grid, Typography, Button, Box } from '@mui/material'
import PropTypes from 'prop-types'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import HE from '../utils/i18n'
import { useState } from 'react'
import Form from './Form'
import useIsMobile from '../hooks/useIsMobile'
import { useDataContext } from '../context/Data'
import { useAuthContext } from '../context/Auth'
import { shiftHours } from '../utils/shiftTemplate'
import { useTheme } from '@mui/material/styles'

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

const ViewSection = ({ name1, name2, hour, armed1, armed2 }) => {
  const theme = useTheme()

  return (
    <Grid item container mt={3} rowGap={2}>
      <Grid
        item
        container
        justifyContent={'center'}
        alignItems="center"
        flexDirection="row"
        sx={{ opacity: 0.7 }}
      >
        <Typography variant="body2" ml={1}>{` 🕓`}</Typography>
        <Typography variant="body1" noWrap>
          {hour}
        </Typography>
      </Grid>
      <Grid item container flexDirection="column" px={3} rowGap={1} mt={1}>
        <Grid item container flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">{`🧑🏼‍✈️ ${name1 || '--'}`}</Typography>
          <Typography variant="subtitle2">{armed1 ? '🔫' : ''}</Typography>
        </Grid>
        <Grid item container flexDirection="row" justifyContent="space-between">
          <Typography variant="subtitle1">{`🧑🏼‍✈️ ${name2 || '--'}`}</Typography>
          <Typography variant="subtitle2">{armed2 ? '🔫' : ''}</Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Grid
          item
          sx={{
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? '#353333' : '#d4cdcdba'}`,
            width: '80%',
          }}
        />
      </Grid>
    </Grid>
  )
}

ViewSection.propTypes = {
  name1: PropTypes.string,
  name2: PropTypes.string,
  hour: PropTypes.string,
  armed1: PropTypes.bool,
  armed2: PropTypes.bool,
}

const Card = ({ date, weekend, page }) => {
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()
  const { isMobile } = useIsMobile()
  const { shifts = {} } = useDataContext()
  const today = new Date().toLocaleDateString('en-US').replaceAll('/', '_')
  const key = date.toLocaleDateString('en-US').replaceAll('/', '_')
  const currentShift = shifts[key] || {}
  const active = currentShift.dayReady
  return (
    <Grid
      container
      flexDirection="column"
      m={1}
      mb={isMobile ? 8 : 1}
      key={date.getTime()}
      sx={{
        width: isMobile ? '90%' : '250px',
        height: isMobile ? '600px' : '620px',
        border: '1px solid #d4cdcdba',
        justifyContent: 'flex-start',
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

      <Grid
        item
        container
        flexDirection="column"
        alignItems="stretch"
        justifyContent="space-between"
        flex={1}
      >
        <Grid item container>
          {shiftHours.map((hour) => (
            <ViewSection
              key={hour}
              name1={currentShift[hour]?.name1}
              name2={currentShift[hour]?.name2}
              hour={hour}
              armed1={currentShift[hour]?.armed1}
              armed2={currentShift[hour]?.armed2}
            />
          ))}
        </Grid>
        <Grid item container justifyContent="center" mb={2}>
          {user.isAdmin && (
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
          )}
        </Grid>
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
