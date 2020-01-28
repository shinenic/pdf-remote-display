const path = require('path')
const fs = require('fs')

const directoryPath = path.join(__dirname, '/pdfs/')

const isPDFfile = fileName => {
  const PDFfile = /\.pdf$/
  return PDFfile.test(fileName)
}

const numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const getFileSizeText = fileSize => {
  const sizeKB = Math.round(fileSize / 1024)
  return numberWithCommas(sizeKB)
}

const walkSync = (dir, fileList) => {
  fileList = fileList || []
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', fileList)
    }
    else if (isPDFfile(file)) {
      const filePath = dir + file
      const fileSize = fs.statSync(filePath).size
      fileList.push({
        name: file.replace(/(\.pdf|_XXX)/g, ''),
        locatedFolder: filePath.split('/')[filePath.split('/').length - 2],
        path: filePath,
        size: `${getFileSizeText(fileSize)} KB`
      })
    }
  })
  return fileList
}

fs.writeFileSync('./abc.txt', JSON.stringify(walkSync(directoryPath)))
