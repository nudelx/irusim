import { Grid, Typography, TextField, FormGroup, Checkbox, FormControlLabel } from '@mui/material'
import PropTypes from 'prop-types'
import HE from '../utils/i18n'

const Section = ({ isMobile, hours, shiftState, setShiftState }) => {
  const mergeState = (state, newState) => ({ ...state, [hours]: { ...state[hours], ...newState } })

  return (
    <Grid sx={{ border: '1px solid #2d2828' }} py={2} my={1}>
      <Grid
        item
        container
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent={'center'}
        alignItems="center"
        flexWrap="nowrap"
      >
        <Grid
          item
          container
          justifyContent={'center'}
          alignItems="center"
          flexDirection="row"
          flexWrap="nowrap"
          mt={2}
        >
          <Typography variant="h4" ml={1}>{` 🕓`}</Typography>
          <Typography variant="h5" noWrap>
            {hours}
          </Typography>
        </Grid>
      </Grid>

      <Grid item container justifyContent="center" columnGap={2}>
        <Grid item sx={{ border: 'px solid #ccc' }} p={4} xs={isMobile ? 11 : 5}>
          <Grid item>
            <Typography variant="subtitle1">🧑🏼‍✈️ {HE.sayar} 1</Typography>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              id="outlined-basic"
              label={HE.name}
              variant="outlined"
              value={shiftState.name1}
              onChange={(e) =>
                setShiftState((state) => mergeState(state, { name1: e.target.value }))
              }
              inputProps={{ style: { fontSize: 22 } }}
            />
          </Grid>

          <Grid container item justifyContent="flex-start">
            <FormGroup>
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    checked={shiftState.armed1}
                    onChange={(e) =>
                      setShiftState((state) => mergeState(state, { armed1: e.target.checked }))
                    }
                  />
                }
                label={`${HE.armed}`}
              />
            </FormGroup>
          </Grid>
        </Grid>

        <Grid item sx={{ border: '0px solid #ccc' }} p={4} xs={isMobile ? 11 : 5}>
          <Grid item>
            <Typography variant="subtitle1">🧑🏼‍✈️ {HE.sayar} 2 </Typography>
          </Grid>
          <Grid>
            <TextField
              fullWidth
              id="outlined-basic"
              label={HE.name}
              variant="outlined"
              value={shiftState.name2}
              onChange={(e) =>
                setShiftState((state) => mergeState(state, { name2: e.target.value }))
              }
              inputProps={{ style: { fontSize: 22 } }}
            />
          </Grid>

          <Grid>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={shiftState.armed2}
                    onChange={(e) =>
                      setShiftState((state) => mergeState(state, { armed2: e.target.checked }))
                    }
                  />
                }
                label={HE.armed}
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

Section.propTypes = {
  date: PropTypes.object,
  isMobile: PropTypes.bool,
  hours: PropTypes.string,
  shiftState: PropTypes.object,
  setShiftState: PropTypes.func,
}

export default Section
