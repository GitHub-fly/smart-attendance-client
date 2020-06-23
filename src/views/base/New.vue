<template>
  <v-app>
    <Nav title="消息"></Nav>
    <Load :isShow="dialog" :info="info"></Load>
    <div
      v-ripple
      class="d-flex justify-space-between align-center pl-2 pr-2"
      style="height: 75px; border-bottom: 1px solid gray;"
      v-for="(item, index) in news"
      :key="index"
      v-touch="{ left: () => swipeLeft(index), right: () => swipeRight(index) }"
    >
      <div :class="item.delShow ? 'margin-left' : ''" style="width: 100%;" class="d-flex justify-space-between align-center">
        <v-icon color="white" class="icon" :style="{ backgroundColor: item.bcColor }" @click="handle(index)">{{ item.icon }}</v-icon>
        <div class="d-flex flex-column justify-space-between" style="width: 80%" @click="handle(index)">
          <div class="mb-1 d-flex justify-space-between" style="width: 100%; height: 25px">
            <span style="color:#656565">{{ item.fromUser }}</span>
            <span style="color:#c7c7c7;">{{ item.gmtCreate }}</span>
          </div>
          <span style="color: #777777; font-size: 13px; height: 40px">{{ item.title }} {{ item.content }}</span>
        </div>
      </div>
      <v-btn class="ml-6" v-show="item.delShow" depressed small color="error" @click="delNew(index)">删除</v-btn>
    </div>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
import Load from '../../components/Load'
export default {
  name: 'New',
  data() {
    return {
      news: [],
      dialog: false,
      info: '',
      time: 1,
      roleId: JSON.parse(localStorage.getItem('user')).roleId
    }
  },
  components: { Nav, Load },
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
        item['delShow'] = false
        let type = item.title.substring(1, 3)
        if (type == '打卡') {
          this.info = '打卡'
          item.icon = 'mdi-bullseye'
          item.bcColor = 'rgb(62, 182, 124)'
          item.path = '/attendance'
        } else {
          this.info = '假条'
          item.icon = 'mdi-note-outline'
          item.bcColor = 'rgb(158, 144, 187)'
          if (this.roleId == 1) {
            item.path = '/mynoteall'
          } else if (this.roleId == 2) {
            item.path = '/teacheradmin'
          } else {
            item.path = '/counseloradmin'
          }
        }
      })
    },
    /**
     * 处理消息的方法
     */
    async handle(i) {
      let item = this.news[i]
      this.dialog = true
      setTimeout(() => {
        this.dialog = false
        this.delNew(i)
        this.$router.push(item.path)
      }, 1000)
    },
    /**
     * 删除消息的方法
     */
    async delNew(i) {
      let item = this.news[i]
      this.news.splice(i, 1)
      await this.GLOBAL.API.init('/msg/delete', { field2: item.pkMessageId }, 'post')
    },
    /**
     * 左滑监听方法
     */
    swipeLeft(i) {
      let item = this.news[i]
      item.delShow = true
      this.news.splice(i, 1, item)
    },
    /**
     * 右滑监听方法
     */
    swipeRight(i) {
      let item = this.news[i]
      item.delShow = false
      this.news.splice(i, 1, item)
    }
  },
  computed: {},
  watch: {}
}
</script>
<style scoped lang="scss">
.icon {
  width: 55px;
  height: 55px;
  border-radius: 10px;
}
.margin-left {
  margin-left: -65px;
}
div {
  transition: all 0.3s ease;
}
</style>
