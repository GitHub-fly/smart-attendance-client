<template>
  <div>
    <div>
      <Nav title="假条详情（预览）"></Nav>
    </div>
    <div>
      <span>学生事(病)假申请单</span>
      <template>
        <v-container class="grey lighten-5">
          <v-col outlined class="mb-6" no-gutters tile>
            <v-row class="mb-6" no-gutters>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>
                  请假人
                </v-card>
              </v-col>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>
                  王登科
                </v-card>
              </v-col>
              <v-col sm="5" md="6">
                <v-card class="pa-2" outlined tile>
                  性别
                </v-card>
              </v-col>
              <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                男
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-6" no-gutters>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                学号
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1802343118
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" mx-auto outlined tile>
                联系方式
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1886666999
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-6" no-gutters>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                学号
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1802343118
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>性别 </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1886666999
              </v-card>
            </v-col>
          </v-row>
          <v-row class="mb-6" no-gutters>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                学号
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1802343118
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                联系方式
              </v-card>
            </v-col>
            <v-col sm="5" md="6">
              <v-card class="pa-2" outlined tile>
                1886666999
              </v-card>
            </v-col>
          </v-row>
          </v-col>
          
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav'
export default {
  name: 'NotePreview',
  data() {
    return {}
  },
  components: { Nav },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
