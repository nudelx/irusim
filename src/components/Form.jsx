import { Modal, Grid, Typography, Button, TextField, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import HE from '../utils/i18n'
import useIsMobile from '../hooks/useIsMobile'
import { useDataContext } from '../context/Data'
import { useTheme } from '@mui/material/styles'

const Form = ({ date, close, open, shift }) => {
  const theme = useTheme()
  const hours = '19:00-21:00'
  const [name1, setName1] = useState(shift?.name1 || '')
  const [name2, setName2] = useState(shift?.name2 || '')
  const { saveShift } = useDataContext()
  const { isMobile } = useIsMobile()
  const handleSave = useCallback(() => {
    const shift = {
      name1,
      name2,
      date,
      hours,
    }
    saveShift({ stringDate: date.toLocaleDateString(), shift })
    close()
  }, [date, close, name1, name2, saveShift])

  useEffect(() => {
    setName1(shift?.name1 || '')
    setName2(shift?.name2 || '')
  }, [shift])

  return (
    <Modal
      open={open}
      onClose={close}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Grid
        item
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: '10px',
          maxWidth: '600px',
        }}
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
            mb={3}
          >
            <Typography variant="h3" textAlign="center">{`${HE.formHeader} `}</Typography>
            {/* <Divider orientation="horizontal" flexItem variant="middle" /> */}
          </Grid>

          <Grid
            item
            container
            flexDirection={isMobile ? 'column' : 'row'}
            justifyContent={'center'}
            alignItems="center"
            columnGap={2}
            flexWrap="nowrap"
          >
            <Grid
              item
              container
              justifyContent={isMobile ? 'center' : 'flex-end'}
              alignItems="center"
              flexDirection="row"
              flexWrap="nowrap"
            >
              <Typography variant="h4" ml={1}>{`🗓️  `}</Typography>
              <Typography variant="h5" noWrap>
                {date.toLocaleDateString('he', { month: 'short', day: 'numeric', weekday: 'long' })}
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent={isMobile ? 'center' : 'flex-start'}
              alignItems="center"
              flexDirection="row"
              flexWrap="nowrap"
            >
              <Typography variant="h4" ml={1}>{`⏰ `}</Typography>
              <Typography variant="h5" noWrap>
                {hours}
              </Typography>
            </Grid>
          </Grid>

          <Grid item mt={3}>
            <Divider orientation="horizontal" flexItem variant="middle" />
          </Grid>

          <Grid item container justifyContent="center" columnGap={2} mt={3}>
            <Grid item sx={{ border: '0px solid #ccc' }} p={4} xs={isMobile ? 11 : 5}>
              <Grid item>
                <Typography variant="subtitle1">🧑🏼‍✈️ {HE.sayar} 1</Typography>
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label={HE.name}
                  variant="outlined"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  inputProps={{ style: { fontSize: 22 } }}
                />
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
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  inputProps={{ style: { fontSize: 22 } }}
                />
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
  shift: PropTypes.object,
  open: PropTypes.bool,
  close: PropTypes.func,
}

export default Form
