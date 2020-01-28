export const getViewport = () => {
  const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  return { height: vh, width: vw }
}

export const RENDER_SIZE_BY_HEIGHT = 'renderSizeByHeight'

export const RENDER_SIZE_BY_WIDTH = 'renderSizeByWidth'
