<template>
  <div>
    <div class="user-info d-flex flex-column justify-center">
      <p class="headline d-flex justify-center">个人中心</p>
      <div class="img d-flex justify-center">
        <v-avatar color="orange" size="160">
          <img :src="user.sysUserAvatar" alt="头像" />
        </v-avatar>
      </div>
      <p class="title d-flex justify-center">{{ user.sysUserNickname }}</p>
    </div>
    <div class="function-area d-flex flex-column align-center">
      <div class="d-flex justify-space-around" style="width: 100%">
        <div class="d-flex flex-column justify-center align-center">
          <span>2</span>
          <span>打卡次数</span>
        </div>
        <div class="d-flex flex-column ml-7 justify-center align-center">
          <span>0</span>
          <span>缺勤次数</span>
        </div>
        <div class="d-flex flex-column ml-7 justify-center align-center">
          <span>3</span>
          <span>请假条数</span>
        </div>
      </div>

      <v-card class="mt-4 mx-auto" width="100%" tile elevation="0">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon :color="item.color" v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <div class="line"></div>
      <v-card class="mx-auto" width="100%" tile elevation="0">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in items2" :key="i">
              <v-list-item-icon>
                <v-icon :color="item.color" v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      swipeDirection: 'None',
      isShow: false,
      items: [
        { text: '我的所有假条', icon: 'mdi-clock', color: 'rgb(249, 192, 12)' },
        { text: '打卡记录', icon: 'mdi-account', color: 'rgb(0, 185, 241)' },
        { text: '隐私设置', icon: 'mdi-flag', color: 'rgb(114, 0, 218)' }
      ],
      items2: [
        { text: '关于我们', icon: 'group', color: 'rgb(249, 50, 12)' },
        { text: '意见反馈', icon: 'contact_support', color: 'rgb(233, 78, 119)' }
      ]
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.box {
  width: 100px;
  width: 50px;
  background-color: red;
}
.user-info {
  padding: 10px;
  background-image: linear-gradient(to bottom, rgb(30, 192, 255), rgb(78, 161, 211));
  .img {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  p {
    color: white;
  }
}
.function-area {
  padding: 5px;
  .row-box {
    width: 90%;
    padding: 20px;
    margin-bottom: 30px;
    border: 0.5px solid rgb(188, 188, 188);
    border-radius: 5px;
  }
  margin-top: 15px;
  .icon {
    margin-right: 40px;
  }
}
.line {
  width: 100%;
  height: 10px;
  background-color: rgb(236, 232, 233);
}
</style>
