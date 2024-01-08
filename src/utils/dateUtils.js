export const getWeekDays = (date) => {
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)))
}

export const getWeek = (dd) => {
  const date = new Date(dd)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  const week1 = new Date(date.getFullYear(), 0, 4)
  return (
    1 +
    Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
  )
}
