// Small helpers mirroring the original vanilla-JS get()/set() localStorage helpers.
export const get = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}

export const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getNote = (id) => sessionStorage.getItem('note:' + id) || ''
export const setNote = (id, value) => sessionStorage.setItem('note:' + id, value)
