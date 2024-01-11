import { Grid, Typography, Button, Box } from '@mui/material'
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
      sx={{ height: '100vh', width: '100vw', paddingTop: 15, position: 'relative' }}
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
            <Button variant="text" startIcon={<ArrowForwardIcon />} onClick={backPage}>
              <Typography pr={1}>{HE.back}</Typography>
            </Button>
          )}
          {page !== 0 && (
            <Button variant="text" onClick={nowPage}>
              <Typography pr={1}>{HE.goBack}</Typography>
            </Button>
          )}
          {page === 0 && (
            <Button variant="text" endIcon={<ArrowBackIcon />} onClick={nextPage}>
              <Typography pl={1}>{HE.next}</Typography>
            </Button>
          )}
        </Grid>
        <Grid container mt={5} justifyContent="center">
          <Grid item>
            <Week days={days} page={page} />
            {/* <Typography variant="subtitle2" sx={{ opacity: 0.3 }} noWrap textAlign="center">
              {'Created and developed by Alex Nudelman © 2024'}
            </Typography> */}
          </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          bottom: '0px',
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
        }}
      ></Box>
    </Grid>
  )
}

export default Page
