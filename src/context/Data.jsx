import { createContext, useMemo, useEffect, useContext, useState, useCallback } from 'react'
import { set, onValue, ref, database } from '../db/firebase'
import PropTypes from 'prop-types'

const INITIAL_STATE = Object.freeze({
  shifts: null,
  currentWeek: true,
  page: 0,
})

export const DataContext = createContext(INITIAL_STATE)
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [shifts, setShifts] = useState({})
  const [currentWeek, setCurrentWeek] = useState(true)

  const saveShift = useCallback(({ stringDate, shift }) => {
    set(ref(database, 'shifts/' + stringDate.replaceAll('/', '_')), {
      ...shift,
    })
      .then(() => {
        console.log('data saved')
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  useEffect(() => {
    const shiftRefs = ref(database, 'shifts/')
    onValue(shiftRefs, (snapshot) => {
      if (snapshot.exists()) {
        setShifts(snapshot.val())
      } else {
        console.log('No data available')
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      shifts,
      currentWeek,
      setShifts,
      setCurrentWeek,
      saveShift,
    }),
    [shifts, currentWeek, setCurrentWeek, setShifts, saveShift],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

DataProvider.displayName = 'DataProvider'
