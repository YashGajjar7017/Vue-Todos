<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const rows = ref(1);
const content = ref('');

const handleTextarea = (size: 1 | 5) => (rows.value = size);
const handleTodo = () => {
  if (content.value.trim() === '') return;
  store.dispatch('add', content.value);
  content.value = '';
};
</script>
<template>
  <div class="flex items-center justify-center">
    <div class="mt-1 flex rounded-md">
      <textarea
        v-model="content"
        name="todo-input"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-7 sm:text-sm border-gray-300 rounded-md mr-3 resize-none"
        :rows="rows"
        cols="33"
        @focus="handleTextarea(5)"
        @blur="handleTextarea(1)"
      ></textarea>
      <button class="h-10 w-20 text-white rounded-lg bg-red-500 hover:bg-red-600" @click="handleTodo">추가</button>
    </div>
  </div>
</template>
