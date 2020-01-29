exports.isPDFfile = fileName => {
  const PDFfile = /\.pdf$/
  return PDFfile.test(fileName)
}

exports.numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

exports.getFileSizeText = fileSize => {
  const sizeKB = Math.round(fileSize / 1024)
  return sizeKB
}

