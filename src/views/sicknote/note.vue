<template>
  <v-app>
    <v-card flat>
      <v-container fluid>
        <v-row class="child-flex">
          <div style="flex-basis: 20%">
            <v-toolbar blue>
              <v-btn icon>
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>学生请假</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
        </v-row>
      </v-container>
    </v-card>
    <v-app-bar>
      <h5>测试</h5>
    </v-app-bar>
  </v-app>
</template>

<script>
export default {
  name: 'Note',
  data() {
    return {}
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
