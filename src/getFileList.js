const path = require('path')
const fs = require('fs')
const {
  isPDFfile,
  numberWithCommas,
  getFileSizeText
} = require('../utils/base')

const directoryPath = path.join(__dirname, '/../pdfs/')

const getLastIndexValue = fileList => {
  const length = fileList.length
  if (length === 0) return -1
  return fileList[length - 1].index
}

const getLastArrayIndex = fileList => {
  const length = fileList.length
  if (length === 0) return -1
  return fileList[length - 1][0]
}

const walkSync = (dir, _fileList) => {
  let fileList = _fileList || []
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', fileList)
    }
    else if (isPDFfile(file)) {
      const filePath = dir + file
      const fileSize = fs.statSync(filePath).size
      fileList.push({
        index: getLastIndexValue(fileList) + 1,
        name: file.replace(/(\.pdf|_XXX)/g, ''),
        locatedFolder: filePath.split('/')[filePath.split('/').length - 2],
        path: filePath,
        // size: `${numberWithCommas(getFileSizeText(fileSize))} KB`
      })
      // fileList.push([
      //   // [index, fileName, locatedFolder, filePath]
      //   getLastArrayIndex(fileList) + 1,
      //   file.replace(/(\.pdf|_XXX)/g, ''),
      //   filePath.split('/')[filePath.split('/').length - 2],
      //   filePath
      // ])
    }
  })
  return fileList
}

// fs.writeFileSync('./_fileListAr', JSON.stringify(walkSync(directoryPath)))
module.exports = walkSync
