import React, { useEffect } from "react"

export const useTracking = page =>
  useEffect(async () => {
    await fetch(`/.netlify/functions/hit?page=${page}`)
  }, [page])
