import axios from 'axios'

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

/**
 * Simple object check
 * @param item
 * @returns {boolean}
 */
export const isObject = (item) => {
  return item.constructor === Object
}

/**
 * Deep merge two objects
 * @param target
 * @param ...sources
 */
export const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

/**
 * Create query params as an array
 * @param string
 * @param array
 */
export const queryParamAsArray = (string, array) => {
  return array
    .map((id) => {
      return `${string}=${id}`
    })
    .join('&')
}
