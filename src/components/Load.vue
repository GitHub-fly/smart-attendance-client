<template>
  <div class="text-center">
    <v-dialog v-model="isShow" hide-overlay persistent width="250">
      <v-card color="deep-purple" dark>
        <v-card-text>
          正在前往{{ info }}
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    },
    info: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
