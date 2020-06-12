<template>
  <v-container>
    <h1>考勤界面</h1>
    <v-row justify="center" class="flex-column align-center">
      <v-avatar size="160">
        <img :src="user.sysUserAvatar" />
      </v-avatar>
      <v-card width="320" class="mt-5" justify="space-between">
        <v-list-item-group>
          <v-list-item>
            <v-list-content>姓名 </v-list-content>
            <v-list-content>{{ user.sysUserName }} </v-list-content>
          </v-list-item>
          <v-list-item>
            <v-list-content>学号</v-list-content>
            <v-list-content>{{ user.sysJobNumber }} </v-list-content>
          </v-list-item>
          <v-list-item>
            <v-list-content>所属房间</v-list-content>
          </v-list-item>
          <v-list-item>
            <v-list-content>所属班级</v-list-content>
          </v-list-item>
          <v-list-item>
            <v-list-content>所属学院</v-list-content>
          </v-list-item>
        </v-list-item-group>
      </v-card>
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
    this.studentVo = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
    console.log(this.studentVo.data)
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
