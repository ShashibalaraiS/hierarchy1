<template>
  <div>
    <label>
      <input type="checkbox" :checked="isSelected" @change="toggleSelection" />
      {{ item.name }}
    </label>
    <div v-if="isSelected && item.children && item.children.length" class="children">
      <HierarchyCheckbox v-for="child in item.children" :key="child.id" :item="child" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'HierarchyCheckbox',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(['selectedItems']),
    isSelected() {
      return this.selectedItems.includes(this.item.id);
    },
  },
  methods: {
    ...mapMutations(['selectItem', 'deselectItem', 'deselectDescendants']),
    toggleSelection(event) {
      if (event.target.checked) {
        this.selectItem(this.item.id);
      } else {
        this.deselectItem(this.item.id);
        this.deselectDescendants(this.item.id);
      }
    },
  },
};
</script>

<style scoped>
.children {
  margin-left: 60px;
}
</style>
