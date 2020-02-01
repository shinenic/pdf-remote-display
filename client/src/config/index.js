const clientUrl = window.location.host // www.somedomain.com (includes port if there is one)
const ServerUrl = 'http://localhost:5005'
// const ServerUrl = 'http://192.168.43.32:5005'

export const pdfjsWorkerSrc = version => `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

export const samepleFile = 'https://cdn.rawgit.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf'

export const api = {
  addHistory: 'https://songsearch.kadenzwei.com/api/ss',
  getFileList: `${ServerUrl}/filelist`,
  getPdfFile: `${ServerUrl}/pdf`,
  webSocket: ServerUrl,
}
