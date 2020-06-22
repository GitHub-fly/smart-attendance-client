<template>
  <v-dialog persistent v-model="isShow" max-width="180">
    <v-card height="50" class="d-flex flex-column align-center" style="padding: 15px 0 0 0" color="rgb(255, 255, 255)">
      <!-- <v-icon size="40" color="rgb(1, 217, 39)">check_circle_outline</v-icon> -->
      <p class="text">{{ info }}</p>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    info: {
      type: String,
      default() {
        return ''
      }
    },
    isShow: {
      type: Boolean,
      default() {
        return false
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
