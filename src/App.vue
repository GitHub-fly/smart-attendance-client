<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},
  created() {},
  methods: {},

  data: () => ({})
}
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}
</style>
