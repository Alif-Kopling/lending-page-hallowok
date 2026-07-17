import { useState, useEffect } from 'react'

interface DevicePerformance {
  isLowEnd: boolean
  isMobile: boolean
  reducedMotion: boolean
  multiplier: number
}

const getDevicePerformance = (): DevicePerformance => {
  if (typeof window === 'undefined') {
    return { isLowEnd: false, isMobile: false, reducedMotion: false, multiplier: 1 }
  }

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let isLowEnd = false
  if ('hardwareConcurrency' in navigator) {
    isLowEnd = navigator.hardwareConcurrency <= 4
  }
  if ('deviceMemory' in navigator) {
    isLowEnd = isLowEnd || (navigator as any).deviceMemory <= 4
  }

  const multiplier = reducedMotion ? 0 : isLowEnd ? 0.3 : 1

  return { isLowEnd, isMobile, reducedMotion, multiplier }
}

export const useDevicePerformance = (): DevicePerformance => {
  const [perf, setPerf] = useState<DevicePerformance>(getDevicePerformance)

  useEffect(() => {
    setPerf(getDevicePerformance())
  }, [])

  return perf
}
