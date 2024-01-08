import { createContext, useMemo, useEffect, useContext, useState, useCallback } from 'react'
import { auth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '../db/firebase'
import PropTypes from 'prop-types'

const INITIAL_STATE = Object.freeze({
  user: null,
  loading: true,
})

export const AuthContext = createContext(INITIAL_STATE)
export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const SignIn = useCallback(({ user, pass }) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, user, pass)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('userCredential', userCredential)
        console.log('user', user)
        setUser(user)
        setLoading(false)
      })
      .catch((errors) => {
        console.log(errors)
        setLoading(false)
      })
  }, [])

  const SignOut = useCallback(() => {
    setLoading(true)
    signOut(auth)
      .then(() => {
        console.log('Signed out successfully')
        setUser(null)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        console.log('uid', uid)
        setUser(user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
      }
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      setUser,
      SignIn,
      loading,
      SignOut,
    }),
    [setUser, user, SignIn, loading, SignOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

AuthContextProvider.displayName = 'AuthContextProvider'
