<template>
  <v-app>
    <Nav title="学生打卡详情"></Nav>
    <v-container>
      <v-row justify="center" class="flex-column align-center">
        <v-avatar size="160">
          <img :src="user.sysUserAvatar" />
        </v-avatar>
        <div class="ml-6 mt-5 content" justify="space-between">
          <v-list-item-group>
            <v-list-item>
              <v-list-item-content>姓名 </v-list-item-content>
              <v-list-item-content>{{ stuVo.sysUserName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>学号</v-list-item-content>
              <v-list-item-content>{{ stuVo.sysJobNumber }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>所属房间</v-list-item-content>
              <v-list-item-content>{{ stuVo.roomName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>所属班级</v-list-item-content>
              <v-list-item-content>{{ stuVo.clazzName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>所属学院</v-list-item-content>
              <v-list-item-content>{{ stuVo.academyName }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>联系方式</v-list-item-content>
              <v-list-item-content>{{ stuVo.sysUserPhone }} </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
        </div>
        <v-chip class="mt-5">
          <v-chip color="green" text-color="white" v-if="show"><v-icon color="dark">mdi-checkbox-marked-circle</v-icon>已打卡</v-chip>
          <v-chip color="red" text-color="white" v-if="!show"><v-icon color="dark">highlight_off</v-icon>未打卡</v-chip>
        </v-chip>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'

export default {
  name: 'StudentInfo',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      stuVo: {},
      show: true
    }
  },
  components: { Nav },
  created() {
    this.getStu()
  },
  mounted() {},
  methods: {
    async getStu() {
      let stu = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
      this.stuVo = stu.data
      if (stu.data.isAttendance === 0) {
        this.show = false
      }
      console.log(stu.data)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.content {
  width: 290px;
}
.v-chip {
  width: 200px;
  height: 35px;
  justify-content: center;
}
</style>
