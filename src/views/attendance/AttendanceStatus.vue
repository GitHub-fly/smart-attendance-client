<template>
  <div>
    <Nav title="宿舍考勤情况"></Nav>
    <v-container>
      <v-tabs centered>
        <v-tab to="/attendance/all">全部</v-tab>
        <v-tab to="/attendance/un">未打卡</v-tab>
      </v-tabs>
      <router-view />
    </v-container>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'AttendanceStatus',
  data() {
    return {
      user: {
        pkSysUserId: '1'
      }
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
