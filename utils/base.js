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

exports.omitKeyInArray = (arr, key) => {
  const newArr = arr.map((value) => {
    const obj = Object.assign({}, value)
    delete obj[key]
    return obj
  })
  return newArr
}

exports.getFileListForClient = arr => {
  return arr.map(obj => {
    const data = []
    obj.hasOwnProperty('index') && data.push(obj['index'])
    obj.hasOwnProperty('name') && data.push(obj['name'])
    obj.hasOwnProperty('locatedFolder') && data.push(obj['locatedFolder'])
    return data
  })
}

exports.dateFormat = (num, fmt) => {
  let date = new Date(parseInt(num))
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  return fmt
}

exports.isLocalMode = () => {
  // ['LOCAL', 'PRODUCTION']
  if (process.env.NODE_API_MODE) {
    return process.env.NODE_API_MODE === 'LOCAL'
  } else {
    return true
  }
}

exports.getNowTime = () => {
  return new Date().getTime()
}
