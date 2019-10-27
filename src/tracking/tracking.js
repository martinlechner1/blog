import React, { useEffect } from "react"

export const useTracking = page =>
  useEffect(async () => {
    try {
      await fetch(`/.netlify/functions/hit?page=${page}`)
    } catch (e) {}
  }, [page])
