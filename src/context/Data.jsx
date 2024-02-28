import { createContext, useMemo, useEffect, useContext, useState, useCallback } from 'react'
import { set, onValue, ref, database, dbName, remove, adm } from '../db/firebase'
import PropTypes from 'prop-types'
import { useAuthContext } from './Auth'

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
  const [admins, setAdmins] = useState({})
  const [currentWeek, setCurrentWeek] = useState(true)
  const { user, setUser } = useAuthContext()

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
    console.log('here', shift)
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
    const adminRefs = ref(database, `${adm}/`)
    onValue(adminRefs, (snapshot) => {
      if (snapshot.exists()) {
        setAdmins(snapshot.val())
      } else {
        console.log('No data available')
      }
    })
  }, [])

  useEffect(() => {
    deleteOldShifts()
  }, [deleteOldShifts])

  const isInAdmin = useCallback((user) => admins[user.uid], [admins])

  useEffect(() => {
    if (
      user.uid &&
      Object.keys(admins).length &&
      !Object.prototype.hasOwnProperty.call(user, 'isAdmin')
    ) {
      setUser({ ...user, isAdmin: isInAdmin(user) })
    }
  }, [admins, setUser, user, isInAdmin])

  const value = useMemo(
    () => ({
      shifts,
      admins,
      currentWeek,
      setShifts,
      setCurrentWeek,
      saveShift,
      deleteOldShifts,
      isInAdmin,
    }),
    [shifts, currentWeek, setCurrentWeek, setShifts, saveShift, deleteOldShifts, admins, isInAdmin],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

DataProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

DataProvider.displayName = 'DataProvider'
