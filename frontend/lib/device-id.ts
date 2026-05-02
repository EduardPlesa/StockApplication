"use client"

const DEVICE_ID_KEY = "apex-device-id"

function makeDeviceId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `device-${Math.random().toString(36).slice(2)}`
}

export function getDeviceId() {
  const existing = window.localStorage.getItem(DEVICE_ID_KEY)

  if (existing) {
    return existing
  }

  const generated = makeDeviceId()
  window.localStorage.setItem(DEVICE_ID_KEY, generated)
  return generated
}
