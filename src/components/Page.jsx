import { Grid, Typography, Button } from '@mui/material'
import HE from '../utils/i18n'
import Week from './Week'
import { getWeekPerPage } from '../utils/dateUtils'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useState, useCallback } from 'react'

const Page = () => {
  const [page, setPage] = useState(0)
  const { days, first, last } = getWeekPerPage(page)
  const backPage = useCallback(() => setPage(-1), [])
  const nowPage = useCallback(() => setPage(0), [])

  const firstString = first && first.toLocaleDateString('he', { month: 'short', day: 'numeric' })
  const lastString = last && last.toLocaleDateString('he', { month: 'short', day: 'numeric' })
  const nextPage = useCallback(() => setPage(1), [])

  return (
    <Grid
      container
      sx={{ height: '100vh', width: '100vw', paddingTop: 15 }}
      justifyContent="center"
      alignItems="flex-start"
    >
      <Grid container item xs={10} rowGap={4}>
        <Grid item container justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h3">{`${HE.today}`} </Typography>
          {/* <Divider orientation="horizontal" flexItem /> */}
          <Typography pt={2} variant="h4">
            {` ${firstString} - ${lastString}`}
          </Typography>
        </Grid>
        <Grid item container justifyContent="center" columnGap={1}>
          {page === 0 && (
            <Button variant="text" startIcon={<ArrowForwardIcon />} onClick={nextPage}>
              <Typography pr={1}>{HE.next}</Typography>
            </Button>
          )}
          {page !== 0 && (
            <Button variant="text" onClick={nowPage}>
              <Typography pr={1}>{HE.goBack}</Typography>
            </Button>
          )}
          {page === 0 && (
            <Button variant="text" endIcon={<ArrowBackIcon />} onClick={backPage}>
              <Typography pl={1}>{HE.back}</Typography>
            </Button>
          )}
        </Grid>
        <Grid container mt={5} justifyContent="center">
          <Grid item>
            <Week days={days} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Page
