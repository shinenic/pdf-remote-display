const isProdMode = () => {
  // ['DEVELOPMENT', 'PRODUCTION']
  return process.env.API_MODE === 'PRODUCTION'
}

const SERVER_URL = isProdMode() ? 'https://pdfviewer.kadenzwei.com' : 'http://localhost:5005'

export const pdfjsWorkerSrc = version => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

export const samepleFile = 'https://cdn.rawgit.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf'

export const api = {
  addHistory: `${SERVER_URL}/api/pdf`,
  getFileList: `${SERVER_URL}/api/filelist`,
  getPdfFile: `${SERVER_URL}/api/pdffile`,
  webSocket: SERVER_URL,
}
