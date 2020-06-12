<template>
  <div>
    <v-icon>{{ icon }}</v-icon>
    <p class="body-2">{{ name }}</p>
  </div>
</template>
<script>
export default {
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
    }
  },
  watch: {},
  data() {
    return {}
  },
  methods: {}
}
</script>
