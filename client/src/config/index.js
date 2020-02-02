const CLIENT_URL = window.location.host // www.somedomain.com (includes port if there is one)
// const SERVER_URL = 'http://localhost:5005'
const SERVER_URL = 'https://pdfviewer.kadenzwei.com'

export const pdfjsWorkerSrc = version => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

export const samepleFile = 'https://cdn.rawgit.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf'

export const api = {
  addHistory: 'https://songsearch.kadenzwei.com/api/ss',
  getFileList: `${SERVER_URL}/filelist`,
  getPdfFile: `${SERVER_URL}/pdf`,
  webSocket: SERVER_URL,
}
