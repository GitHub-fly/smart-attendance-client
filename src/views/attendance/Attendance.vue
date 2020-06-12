<template>
  <div>
    <Nav title="归寝打卡"></Nav>
    <v-container>
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
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'Attendance',
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')).user,
      studentVo: {}
    }
  },
  components: { Nav },
  created() {
    this.getInfo()
  },
  mounted() {},
  methods: {
    async getInfo() {
      this.studentVo = await this.GLOBAL.API.init('/attendance/user/info', this.user, 'post')
      console.log(this.studentVo.data)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
