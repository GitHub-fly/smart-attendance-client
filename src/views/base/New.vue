<template>
  <v-app>
    <Nav title="消息"></Nav>
    <div
      v-ripple
      class="d-flex justify-space-between align-center pl-2 pr-2"
      style="width: 100%; height: 70px; border-bottom: 1px solid gray;"
      v-for="(item, index) in news"
      :key="index"
      @click="handle(item)"
    >
      <v-icon color="white" class="icon" :style="{ backgroundColor: item.bcColor }">{{ item.icon }}</v-icon>
      <div style="width: 80%">
        <div class="mb-1" style="width: 100%; display: flex; justify-content: space-between;">
          <span style="color:#656565">{{ item.fromUser }}</span>
          <span style="color:#c7c7c7">{{ item.gmtCreate }}</span>
        </div>
        <span style="color: #777777">{{ item.title }} {{ item.content }}</span>
      </div>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'New',
  data() {
    return {
      isShow: false,
      news: []
    }
  },
  components: { Nav },
  created() {
    this.getData()
  },
  methods: {
    /**
     * 获取数据的方法
     */
    async getData() {
      let res = await this.GLOBAL.API.init('/msg/info', { field1: JSON.parse(localStorage.getItem('user')).pkSysUserId }, 'post')
      this.news = res.data
      this.news.forEach((item) => {
        let type = item.title.substring(1, 3)
        if (type == '打卡') {
          item.icon = 'mdi-bullseye'
          item.bcColor = 'rgb(62, 182, 124)'
        } else {
          item.icon = 'mdi-note-outline'
          item.bcColor = 'rgb(158, 144, 187)'
        }
      })
      console.log(res)
    },
    /**
     * 处理消息的方法
     */
    handle(item) {
      console.log(item)
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.icon {
  width: 55px;
  height: 55px;
  border-radius: 10px;
}
</style>
