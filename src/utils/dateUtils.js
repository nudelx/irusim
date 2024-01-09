export const getWeekDays = (date) => {
  return Array(7)
    .fill(new Date(date))
    .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)))
}

export const getWeekNumber = (date) => {
  const now = new Date(date)
  const onejan = new Date(now.getFullYear(), 0, 1)
  return Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7)
}

export const calcWeekStartPoint = (page) => {
  const DAY = 86400060
  if (page === 0) {
    return new Date()
  }
  if (page === -1) {
    const days = getWeekDays(new Date())
    const [first] = days.slice(0, 1)
    const timestamp = first.getTime() - DAY
    return new Date(timestamp)
  }

  if (page === 1) {
    const days = getWeekDays(new Date())
    const [last] = days.slice(-1)
    const timestamp = last.getTime() + DAY
    return new Date(timestamp)
  }
}

export const getWeekPerPage = (page) => {
  const d = calcWeekStartPoint(page)
  const days = getWeekDays(d)
  const [[first], [last]] = [days.slice(0, 1), days.slice(-1)]

  return {
    days,
    first,
    last,
  }
}
