export const getViewport = () => {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return { height: vh, width: vw }
}

export const clearAllBlank = str => {
  return str.replace(/[\r\n\s]/g, '')
}

export const getNowTime = () => {
  return new Date().getTime()
}

export const isZhuyin = str => {
  const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
  return zhuyin.test(str)
}

// Return a "Array" of url path
export const getUrlPath = () => {
  const path = window.location.pathname.slice(1)
  return path.split('/')
}

// Return a "Object" of url query params (default value is TRUE)
export const getUrlQueryParams = () => {
  const searchUrl = decodeURI(window.location.search)
  if(searchUrl === '') return {}

  const query = searchUrl.slice(1).split('&')
  return query.reduce((acc, value) => {
    const pair = value.split('=')
    return {
      ...acc,
      [pair[0]]: pair.length === 1 ? true : pair[1]
    }
  }, {})
}
