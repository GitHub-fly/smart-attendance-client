<template>
  <div style="z-index: 9999">
    <div style="position: fixed; width: 100%;" class="elevation-0">
      <v-app-bar style="background-image: linear-gradient(rgb(33, 150, 243), rgb(79, 195, 247))" dense dark>
        <v-btn icon @click="back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title>{{ title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="items.length === 0" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(n, index) in items" :key="index" @click="operation(n)">
              <v-list-item-title>{{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>
    <div style="height: 65px"></div>
  </div>
</template>
<script>
export default {
  name: 'Nav',
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    items: {
      type: Array,
      default() {
        return []
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
  methods: {
    back() {
      if (this.path == '') {
        this.$router.back(-1)
      } else {
        this.$router.push(this.path)
      }
    },
    operation(item) {
      this.$emit('operation', [item])
    }
  }
}
</script>
