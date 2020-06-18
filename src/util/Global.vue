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

export default {
  API,
  timer
}
</script>
