const isLocalMode = () => {
  // ['LOCAL', 'PRODUCTION']
  // return process.env.REACT_APP_API_MODE == 'LOCAL'
  return false
}

const SERVER_URL = isLocalMode() ? 'http://localhost:5005' : 'https://pdfviewer.kadenzwei.com'

export const getPdfjsWorkerSrc = version => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

export const samepleFile = 'https://cdn.rawgit.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf'

export const api = {
  addHistory: `${SERVER_URL}/api/pdf`,
  getFileList: `${SERVER_URL}/api/filelist`,
  getPdfFile: `${SERVER_URL}/api/pdffile`,
  webSocket: SERVER_URL,
}
