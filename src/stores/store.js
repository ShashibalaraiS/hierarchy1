import { createStore } from 'vuex';

function getDescendants(item) {
  let ids = [];
  if (item.children) {
    item.children.forEach(child => {
      ids.push(child.id);
      ids = ids.concat(getDescendants(child));
    });
  }
  return ids;
}

function findItemById(id, items) {
  for (let item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(id, item.children);
      if (found) return found;
    }
  }
  return null;
}

export default createStore({
  state: {
    data: [
      {
        id: 1,
        name: 'Parent 1',
        children: [
          {
            id: 2,
            name: 'Child 1',
            children: [
              {
                id: 3,
                name: 'Sub Child 1',
              },
              {
                id: 4,
                name: 'Sub Child 2',
              },
            ],
          },
          {
            id: 5,
            name: 'Child 2',
          },
        ],
      },
      {
        id: 6,
        name: 'Parent 2',
        children: [
          {
            id: 7,
            name: 'Child 1',
          },
          {
            id: 8,
            name: 'Child 2',
            children: [
              {
                id: 9,
                name: 'Sub Child 1',
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: 'Parent 3',
        children: [
          {
            id: 11,
            name: 'Child 1',
          },
          {
            id: 12,
            name: 'Child 2',
            children: [
              {
                id: 13,
                name: 'Sub Child 1',
              },
            ],
          },
        ],
      },
    ],
    selectedItems: JSON.parse(localStorage.getItem('selectedItems')) || [],
  },
  mutations: {
    selectItem(state, id) {
      if (!state.selectedItems.includes(id)) {
        state.selectedItems.push(id);
        localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems));
      }
    },
    deselectItem(state, id) {
      state.selectedItems = state.selectedItems.filter(item => item !== id);
      localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems));
    },
    deselectDescendants(state, id) {
      const item = findItemById(id, state.data);
      if (item) {
        const descendantIds = getDescendants(item);
        state.selectedItems = state.selectedItems.filter(item => !descendantIds.includes(item));
        localStorage.setItem('selectedItems', JSON.stringify(state.selectedItems));
      }
    },
  },
  actions: {},
  modules: {},
});
