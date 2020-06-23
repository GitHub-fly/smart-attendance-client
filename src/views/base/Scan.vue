<template>
  <v-app>
    <Nav title="扫一扫"></Nav>
    <v-file-input label="File input" filled prepend-icon="mdi-camera"></v-file-input>
  </v-app>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'Scan',
  data() {
    return {}
  },
  components: { Nav },
  created() {},
  methods: {},
  computed: {}
}
</script>
<style scoped lang="scss"></style>
