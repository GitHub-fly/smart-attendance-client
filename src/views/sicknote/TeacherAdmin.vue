<template>
  <div>
    <div>
      <Nav title="请假管理"></Nav>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'TeacherAdmin',
  data() {
    return {}
  },
  components: { Nav },
  created() {
    this.getNote()
  },
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss">
</style>
