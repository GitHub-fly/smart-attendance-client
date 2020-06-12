<template>
  <v-container>
    <h1>考勤界面</h1>
    <v-row justify="center" class="flex-column align-center">
      <v-avatar size="160">
        <img :src="user.sysUserAvatar" />
      </v-avatar>
      <div class="ml-6 mt-5 content" justify="space-between">
        <v-list-item-group>
          <v-list-item>
            <v-list-item-content>姓名 </v-list-item-content>
            <v-list-item-content>{{ user.sysUserName }} </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>学号</v-list-item-content>
            <v-list-item-content>{{ user.sysJobNumber }} </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>所属房间</v-list-item-content>
            <v-list-item-content>{{ studentVo.roomName }} </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>所属班级</v-list-item-content>
            <v-list-item-content>{{ studentVo.clazzName }} </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>所属学院</v-list-item-content>
            <v-list-item-content>{{ studentVo.academyName }} </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-content>当前位置</v-list-item-content>

            <v-btn><v-icon>place</v-icon>点击定位</v-btn>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-item-group>
      </div>
      <div class="mt-5">
        <v-btn width="220" color="rgb(1, 152, 255)" dark>立即打卡</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Attendance',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')).user,
      studentVo: {}
    }
  },
  components: {},
  async created() {
    let student = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
    this.studentVo = student.data
    // console.log(student.data.roomName)
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.content {
  width: 290px;
}
</style>
