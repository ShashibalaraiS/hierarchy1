<template>
  <div id="app">
    <h2>Checkbox Hierarchy</h2>
    <HierarchyCheckbox v-for="item in hierarchyData" :key="item.id" :item="item" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HierarchyCheckbox from './components/HierarchyCheckbox.vue';

export default {
  name: 'App',
  components: {
    HierarchyCheckbox,
  },
  computed: {
    ...mapState(['data']),
    hierarchyData() {
      return this.data;
    },
  },
};
</script>

<style>
#app {
 /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
