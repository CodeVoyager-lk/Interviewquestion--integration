var fs = require('fs'),
  path = require('path')
var sidebarTxt = '- [首页](/)\n'
var path = require('path')
var curPath = path.resolve('./')
var baseDirArr = []

function walkSync (currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    var filePath = path.join(currentDirPath, name)
    var stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory() && !filePath.includes(".git")) {
      walkSync(filePath, callback)
    }
  })
}

walkSync(curPath, function (filePath, stat) {
  if (".md" == path.extname(filePath).toLowerCase()
    && "_" != path.basename(filePath).substr(0, 1)
    && path.basename(filePath).includes(`.md`)) {
    var relativeFilePath = filePath.substr(curPath.length + 1)// 这里取得相对路径 直接删除'/'
    if (relativeFilePath == path.basename(filePath)) { //这个地方直接把根目录的 md 文件排除了
      return
    }

    var relativeFilePathArr = relativeFilePath.split('/') //进行字符串 / 分割

    for (var i = 0; i < relativeFilePathArr.length - 1; i++) { //-1的原因是直接不走 README.md 节约性能，relativeFilePathArr.length 此处最低为 2，长度不可能是 1
      if (baseDirArr[i] == relativeFilePathArr[i]) { // 如果这个目录已经存在了就 直接跳过
        continue
      }
      for (var j = 0; j < i; j++) {
        sidebarTxt += '  '
      }
      if (i == relativeFilePathArr.length - 2) { // 理论上-2 逻辑不会bug 该判断直接生成最终文件链接
        // console.log(relativeFilePath)
        // read contents of the file
        const data = fs.readFileSync(relativeFilePath, 'UTF-8')

        // split the contents by new line
        const lines = data.split(/\r?\n/)
        // 获取MD第一行title
        // console.log(lines[0].split('#')[1].trim())
        // sidebarTxt += '- [' + relativeFilePathArr[i] + '](/' + relativeFilePath + ')\n'
        sidebarTxt += '- [' + lines[0].split('#')[1].trim() + '](/' + relativeFilePath + ')\n'

        continue
      }
      if (i == 0) {
        sidebarTxt += '- **' + relativeFilePathArr[i] + '**\n'
      } else {
        sidebarTxt += '- ' + relativeFilePathArr[i] + '\n'
      }
      baseDirArr[i] = relativeFilePathArr[i]
      // console.log(baseDirArr);
    }
  }
})

var path = require('path')
var fs = require('fs')
// fs.copyFile(path.resolve('./')+"/_sidebar.md",path.resolve('./')+"/_sidebar.md.bak",function(err){
//     if(err) throw new Error('something wrong was happended') });

// console.log(sidebarTxt)
fs.writeFile(path.resolve('./') + '/_sidebar.md', sidebarTxt, function (err) {
  if (err) {
    //console.error(err);
  }
})