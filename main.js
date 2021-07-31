var child_process = require('child_process')
const fs = require('fs')

var curl = `curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=693axxx6-7aoc-4bc4-97a0-0ec2sifa5aaa' \
-H 'Content-Type: application/json' \
-d '
{
     "msgtype": "text",
     "text": {
         "content": "${fs.readFileSync('./CHANGELOG.md', 'utf-8')}"
     }
}`
var child = child_process.exec(curl, function(err, stdout, stderr) {
  console.log(stdout)
})
