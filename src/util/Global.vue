<script type="text/javascript">
const API = require('./api.js')

/**
 * 计时器的方法
 *
 * @param status 给定一个状态
 * @param time 倒计时
 */
function timer(status, time) {
  status = !status
  let timer = setInterval(() => {
    time--
    if (time == 0) {
      clearInterval(timer)
      status = false
      time = 1
    } else {
      status = true
    }
  }, 1000)
}

/**
 * 老师处理假条后发送消息的方法
 *
 * @param title 消息标题
 * @param content 消息内容
 * @param toId 接收者id
 * @returns 接口返回值
 */
async function sendNew(title, content, toId) {
  let newDto = {
    title: title,
    content: content,
    fromId: JSON.parse(localStorage.getItem('user')).pkSysUserId,
    toId: toId
  }
  let res = await this.API.init('/msg/send', newDto, 'post')
  return res.data
}

export default {
  API,
  timer,
  sendNew
}
</script>
