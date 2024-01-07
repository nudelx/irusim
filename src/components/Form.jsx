import { Modal, Grid, Typography, Button, TextField, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { useCallback, useState } from 'react'
import HE from '../utils/i18n'
import useIsMobile from '../hooks/useIsMobile'

const Form = ({ date, close, open }) => {
  const hours = '19:00-21:00'
  const [duty, setDuty] = useState({})

  const { isMobile } = useIsMobile()

  const handleSave = useCallback(() => {
    console.log(setDuty)
    console.log(duty)
    console.log(date)
    close()
  }, [setDuty, duty, date, close])

  return (
    <Modal
      open={open}
      onClose={close}
      size
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Grid
        item
        sx={{ backgroundColor: 'white', borderRadius: '10px', maxWidth: '600px' }}
        xs={isMobile ? 12 : 8}
        px={isMobile ? 1 : 10}
        py={2}
      >
        <Grid container flexDirection="column" justifyContent="flex-end" dir="rtl">
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap={2}
            mb={6}
          >
            <Typography variant="h3">{`${HE.formHeader} 🕐`}</Typography>
            <Divider orientation="horizontal" flexItem variant="middle" />
          </Grid>

          <Grid
            item
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            columnGap={2}
          >
            <Typography variant="h4">{`🗓️ ${HE.formTitle}:`}</Typography>
            <Typography variant="h5">
              {date.toLocaleDateString('he', { month: 'short', day: 'numeric', weekday: 'long' })}
            </Typography>
          </Grid>

          <Grid
            item
            container
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="center"
            columnGap={2}
          >
            <Typography variant="h4">{`⏰ ${HE.hours}:`}</Typography>
            <Typography variant="h5">{hours}</Typography>
          </Grid>

          <Grid item container justifyContent="center" columnGap={2} mt={3}>
            <Grid item sx={{ border: '1px solid #ccc' }} p={4}>
              <Grid item>
                <Typography variant="h5">🧑🏼‍✈️ {HE.name} 1</Typography>
              </Grid>
              <Grid>
                <TextField id="outlined-basic" label={HE.name} variant="outlined" />
              </Grid>
            </Grid>

            <Grid item sx={{ border: '1px solid #ccc' }} p={4}>
              <Grid item>
                <Typography variant="h5">🧑🏼‍✈️ {HE.name} 2 </Typography>
              </Grid>
              <Grid>
                <TextField id="outlined-basic" label={HE.name} variant="outlined" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item container justifyContent="center" columnGap={1} mt={6} mb={2}>
            <Button variant="contained" sx={{ width: '100px' }} onClick={handleSave}>
              {HE.save}
            </Button>
            <Button variant="outlined" onClick={close}>
              {HE.cancel}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

Form.propTypes = {
  date: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
}

export default Form
