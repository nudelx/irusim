import { createContext, useMemo, useEffect, useContext, useState, useCallback } from 'react'
import {
  // auth,
  // signInWithEmailAndPassword,
  // onAuthStateChanged,
  // signOut,
  set,
  get,
  child,
  db,
  dbName,
  ref,
  database,
} from '../db/firebase'
import PropTypes from 'prop-types'

const INITIAL_STATE = Object.freeze({
  shifts: null,
  currentWeek: true,
})

export const DataContext = createContext(INITIAL_STATE)
export const useDataContext = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const [shifts, setShifts] = useState(null)
  const [currentWeek, setCurrentWeek] = useState(true)
  const saveShift = useCallback(({ stringDate, shift }) => {
    set(ref(database, 'shifts/' + stringDate.replaceAll('/', '_')), {
      ...shift,
    })
  }, [])

  useEffect(() => {
    get(child(db, `${dbName}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log('data shifts', snapshot.val())
          setShifts(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
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
