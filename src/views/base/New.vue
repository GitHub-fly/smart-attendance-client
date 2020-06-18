<template>
  <div>
    <Nav title="消息"></Nav>
    <Alert :isShow="isShow" info="你好"></Alert>
    <button @click="test()">Show</button>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
import Alert from '../../components/Alert'
import axios from 'axios'
export default {
  name: 'New',
  data() {
    return {
      isShow: false
    }
  },
  components: { Nav, Alert },
  created() {
    axios({
      method: 'get',
      url:
        'https://restapi.amap.com/v3/geocode/regeo?output=json&key=c366ab4d4a894354574b28c1e817c247&radius=1000&roadlevel=1&location=118.938254,32.121761'
    }).then((res) => {
      console.log(res)
    })
  },
  methods: {
    test() {
      this.GLOBAL.timer(this.isShow, 3)
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.text {
  margin-top: 10px;
  text-align: center;
  font-weight: 700;
}
</style>
