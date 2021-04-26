export function throttling (fnc) {
  var timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    var self = this
    timer = setTimeout(function () {
      fnc.apply(self, arguments)
    })
  }
}

export function getNowTime () {
  const date = new Date()
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
