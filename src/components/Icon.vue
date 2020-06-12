<template>
  <router-link :to="path" class="body-2">
    <div class="d-flex flex-column align-center">
      <v-icon>{{ icon }}</v-icon>
    </div>
    {{ name }}
  </router-link>
</template>
<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default() {
        return ''
      }
    },
    name: {
      type: String,
      default() {
        return ''
      }
    },
    path: {
      type: String,
      default() {
        return ''
      }
    }
  },
  watch: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
<style scoped lang="scss"></style>
