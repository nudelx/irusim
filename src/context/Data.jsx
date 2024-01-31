import { createContext, useMemo, useEffect, useContext, useState, useCallback } from 'react'
import { set, onValue, ref, database, dbName, remove } from '../db/firebase'
import PropTypes from 'prop-types'

const INITIAL_STATE = Object.freeze({
  shifts: null,
  currentWeek: true,
  page: 0,
  DELETE_THRESHOLD: 604800 * 3000, /// 3 weeks
})

export const DataContext = createContext(INITIAL_STATE)
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [shifts, setShifts] = useState({})
  const [currentWeek, setCurrentWeek] = useState(true)

  const deleteOldShifts = useCallback(() => {
    const lastDateLimit = new Date().getTime() - INITIAL_STATE.DELETE_THRESHOLD
    const shiftRefs = ref(database, `${dbName}/`)
    onValue(shiftRefs, (snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((d) => {
          const time = d.key.replaceAll('_', '/')
          const timestamp = new Date(time).getTime()
          if (timestamp < lastDateLimit) {
            console.log('to clean', time)
            remove(d.ref)
          }
        })
      }
    })
  }, [])

  const saveShift = useCallback(({ stringDate, shift }) => {
    set(ref(database, `${dbName}/` + stringDate.replaceAll('/', '_')), {
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
    const shiftRefs = ref(database, `${dbName}/`)
    onValue(shiftRefs, (snapshot) => {
      if (snapshot.exists()) {
        setShifts(snapshot.val())
      } else {
        console.log('No data available')
      }
    })
  }, [])

  useEffect(() => {
    deleteOldShifts()
  }, [deleteOldShifts])

  const value = useMemo(
    () => ({
      shifts,
      currentWeek,
      setShifts,
      setCurrentWeek,
      saveShift,
      deleteOldShifts,
    }),
    [shifts, currentWeek, setCurrentWeek, setShifts, saveShift, deleteOldShifts],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

DataProvider.displayName = 'DataProvider'
