// import { ActionContext, createStore, Module } from 'vuex';
// import { RootState } from '.';

// export interface UserStateProps {
//   userList: UserState[];
// }

// interface UserState {
//   id: string;
//   content: string;
//   noteColor: string;
//   isFinish: boolean;
// }

// const getId = () => {
//   return 'xxxxxxxx'.replace(/x/g, char => {
//     const random = (Math.random() * 8) | 0;
//     const id = char === 'x' ? random : (random & 0x3) | 0x8;
//     return id.toString(8);
//   });
// };

// // store.dispatch('add', payload) > actions > mutations > state > components
// const store: Module<UserStateProps, RootState> = {
//   state: { userList: [] },
//   actions: {
//     add({ commit }: ActionContext<UserStateProps, RootState>, payload: string) {
//       commit('insert', payload);
//     },
//   },
//   mutations: {
//     insert(state: UserStateProps, content: string) {
//       state.userList.push({ id: getId(), content, noteColor: '#ffffff', isFinish: false });
//     },
//   },
// };

// export default store;
