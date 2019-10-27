import { useEffect } from "react"

export const useTracking = page =>
  useEffect(() => {
    const trackHit = async () => {
      try {
        await fetch(`/.netlify/functions/hit?page=${page}`)
      } catch (e) {}
    }
    trackHit()
  }, [page])
