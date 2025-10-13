const zpad = (x) => String(x).padStart(2, '0')
export const getdatedisplay = (dt) => {
  return `${zpad(dt.getDate())}-${zpad(dt.getMonth()+1)}-${zpad(dt.getFullYear())}`
}
export const gettimedisplay = (dt) => {
  return `${zpad(dt.getHours())}:${zpad(dt.getMinutes())}`
}