export const getViewport = () => {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return { height: vh, width: vw }
}

export const clearAllBlank = str => {
  return str.replace(/[\r\n\s]/g, '')
}

export const isZhuyin = str => {
  const zhuyin = /[\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]/
  return zhuyin.test(str)
}
