<template>
  <v-app>
    <Nav title="宿舍考勤情况" path="/home"></Nav>
    <v-container class="d-flex flex-column align-center">
      <v-tabs class="mb-6" centered height="30">
        <v-tab to="/attendance/all">全部</v-tab>
        <v-tab to="/attendance/un">未打卡</v-tab>
      </v-tabs>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'AttendanceStatus',
  data() {
    return {
      user: {
        pkSysUserId: JSON.parse(localStorage.getItem('user')).pkSysUserId,
        roleId: 5
      },
      dormitoryVo: {},
      showList: [],
      studentList: [],
      dorName: ''
    }
  },
  components: { Nav },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
