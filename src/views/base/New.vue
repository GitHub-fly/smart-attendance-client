<template>
  <v-app>
    <Nav title="消息"></Nav>
    <div>
      <div class="new-box" v-for="(item, index) in news" :key="index">
        <div style="width: 80%; margin-left: 60px;display: flex;  justify-content: space-between;">
          <span style="font-family: 宋体; color:#656565">{{ item.title }}</span>
          <span style="font-family: 宋体; color:#c7c7c7">{{ item.gmtCreate }}</span>
        </div>
        <span style="margin-left: 60px;;font-family: 宋体; color:#777777">{{ item.content }}</span>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import axios from 'axios'
export default {
  name: 'New',
  data() {
    return {
      isShow: false,
      news: [
        {
          title: '提醒',
          content: '【工作提醒】安全教育平台尽快完成',
          gmtCreate: '2020-6-12'
        },
        {
          title: '会议提醒',
          content: '【会议通知】总结大会',
          gmtCreate: '2020-6-13'
        },
        {
          title: '监考提醒',
          content: '【监考通知】监考监考',
          gmtCreate: '2020-6-14'
        },
        {
          title: '提醒',
          content: '【工作提醒】周会',
          gmtCreate: '2020-6-12'
        },
        {
          title: '提醒',
          content: '【工作提醒】安全教育平台尽快完成',
          gmtCreate: '2020-6-12'
        }
      ]
    }
  },
  components: { Nav },
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
.new-box {
  height: 60px;
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 5px;
  border-bottom: 1px solid gray;
}
</style>
