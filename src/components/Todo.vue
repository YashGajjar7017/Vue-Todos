<script setup lang="ts">
import MasonryWall from './core/masonry-wall.vue';
import TodoAction from './TodoAction.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { TodoState } from '../store';

const store = useStore();
const items = ref<TodoState[]>([]);
store.subscribe((_, state) => (items.value = [...state.todoList]));

const handleResize = (event: KeyboardEvent, item: TodoState) => {
  let $textarea = event.target as HTMLTextAreaElement;
  $textarea.style.height = 'auto';
  item.height = $textarea.scrollHeight + 'px';
  $textarea.style.height = item.height;
};

const handleChange = ({ target }: Event, id: string) => {
  const content = (target as HTMLTextAreaElement).value;
  store.dispatch('sync', { id, content });
};
</script>
<template>
  <MasonryWall :items="items" :column-width="350" :gap="16">
    <template #default="{ item }">
      <div
        class="w-80 p-4 flex flex-col border-2 rounded-lg border-rose-600 float-left"
        :style="{
          backgroundColor: item.noteColor,
          color: item.color,
          textDecoration: item.isFinish ? 'line-through' : '',
        }"
      >
        <textarea
          v-model="item.content"
          class="form-control w-full px-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border-none rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:border-solid focus:outline-none p-3 overflow-hidden resize-none transition ease-in-out text-base form-control block tracking-widest"
          :style="{ height: item.height }"
          @keyup="e => handleResize(e, item)"
          @blur="e => handleChange(e, item.id)"
        >
        </textarea>
        <TodoAction :item="item" />
      </div>
    </template>
  </MasonryWall>
</template>
