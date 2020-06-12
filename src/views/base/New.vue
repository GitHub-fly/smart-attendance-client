<template>
  <div>
    <Nav title="消息" :items="items" @operation="operation"></Nav>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'New',
  data() {
    return {
      items: ['预览', '打印']
    }
  },
  components: { Nav },
  created() {},
  mounted() {},
  methods: {
    operation(item) {
      console.log(item[0])
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
