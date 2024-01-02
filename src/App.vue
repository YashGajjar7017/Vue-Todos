<script setup lang="ts">
import InputForm from './components/InputForm.vue';
import Todos from './components/Todos.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { StoreStateProps } from './store';
const store = useStore();
const finishCount = ref<number>(0);
store.subscribe((_, state) => {
  finishCount.value = (state as StoreStateProps).todoList.filter(({ isFinish }) => isFinish).length;
});
</script>

<template>
  <main class="w-full h-full">
    <div class="body mt-14 px-4 py-8">
      <div class="m-auto" style="width: 1100px">
        <InputForm />
        <div class="text-center mt-6">
          완료된 일의 개수 <span class="text-lg font-bold">{{ finishCount }}</span>
        </div>
        <Todos />
      </div>
    </div>
  </main>
</template>
