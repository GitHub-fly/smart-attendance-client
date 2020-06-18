<template>
  <div>
    <Nav title="消息"></Nav>
    <Alert :isShow="isShow" info="你好"></Alert>
    <button @click="test()">Show</button>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
import Alert from '../../components/Alert'
export default {
  name: 'New',
  data() {
    return {
      isShow: false
    }
  },
  components: { Nav, Alert },
  created() {},
  methods: {
    test() {
      this.GLOBAL.timer(this.isShow, 3)
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss">
.text {
  margin-top: 10px;
  text-align: center;
  font-weight: 700;
}
</style>
