import { useCallback, useEffect, useState } from 'react'

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  const updateSize = useCallback(() => {
    window.outerWidth <= 600 ? setIsMobile(true) : setIsMobile(false)
  }, [setIsMobile])

  useEffect(() => {
    addEventListener('resize', updateSize)
    return () => removeEventListener('resize', updateSize)
  },[updateSize] )

  useEffect(() => {
    window.outerWidth <= 600 ? setIsMobile(true) : setIsMobile(false)
  },[])

  return {
    updateSize,
    isMobile,
    setIsMobile,
  }
}

export default useIsMobile
