var child_process = require('child_process')
const fs = require('fs')
const axios = require('axios')

const text = fs.readFileSync('./CHANGELOG.md', 'utf-8')

axios
  .post(
    'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=5c4e69de-4068-483a-a5cd-ed4fb888b22f',
    {
      msgtype: 'markdown',
      markdown: {
        content: `
        # 新版本已发布，查看详情 [<font color=\"info\">CHANGELOG.md</font>](https://github.com/think2011/test/blob/master/CHANGELOG.md)

        ${text.substr(0, 300)}...`,
      },
    }
  )
  .then(console.log)
  .catch(console.log)
