import { ActionContext, createStore } from 'vuex';
// import user, { UserStateProps } from './user';
// import post, { PostStateProps } from './post';

export interface StoreStateProps {
  todoList: TodoState[];
}

export const COLOR: Record<string, '#ffffff' | '#000000'> = {
  BLACK: '#000000',
  WHITE: '#ffffff',
};

export interface TodoState {
  id: string;
  content: string;
  height: string;
  noteColor: '#ffffff' | '#000000';
  color: '#ffffff' | '#000000';
  isFinish: boolean;
}

const getId = () => {
  return 'xxxxxxxx'.replace(/x/g, char => {
    const random = (Math.random() * 8) | 0;
    const id = char === 'x' ? random : (random & 0x3) | 0x8;
    return id.toString(8);
  });
};

// store.dispatch('add', payload) > actions > mutations > state > components
const store = createStore<StoreStateProps>({
  state: { todoList: [] },
  actions: {
    add({ commit }: ActionContext<StoreStateProps, StoreStateProps>, payload: string) {
      commit('insert', payload);
    },
    delete({ commit }: ActionContext<StoreStateProps, StoreStateProps>, payload: string) {
      commit('remove', payload);
    },
    sync({ commit }: ActionContext<StoreStateProps, StoreStateProps>, payload: Partial<TodoState>) {
      commit('update', payload);
    },
  },
  mutations: {
    insert(state: StoreStateProps, content: string) {
      state.todoList.push({ id: getId(), content, height: 'auto', noteColor: COLOR.WHITE, color: COLOR.BLACK, isFinish: false });
    },
    remove(state: StoreStateProps, todoId: string) {
      state.todoList = state.todoList.filter(({ id }) => id !== todoId);
    },
    update(state: StoreStateProps, payload: Partial<TodoState>) {
      const targetIndex = state.todoList.findIndex(({ id }) => id === payload.id);
      state.todoList.splice(targetIndex, 1, { ...state.todoList[targetIndex], ...payload });
    },
  },
});

// export interface ModuleAState {
//   count: number;
// }

// export interface RootState {
//   User: UserStateProps;
//   Post: PostStateProps;
// }

// const rootStore = createStore({
//   modules: { user, post },
// });

// export default rootStore;
export default store;
