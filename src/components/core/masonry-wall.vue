<!-- MIT License

Copyright (c) 2021 Fuxing Loh, Jan Müller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. -->

<!-- FIXME: https://dev.to/imomaliev/til-2021-10-04-fix-script-setup-defineprops-is-not-defined-38ic -->

<template>
  <div ref="wall" class="masonry-wall" :style="{ display: 'flex', gap: `${gap}px` }">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="masonry-column"
      :data-index="columnIndex"
      :style="{
        display: 'flex',
        'flex-basis': 0,
        'flex-direction': 'column',
        'flex-grow': 1,
        height: 'max-content',
        gap: `${gap}px`,
      }"
    >
      <div v-for="itemIndex in column" :key="itemIndex" class="masonry-item flex items-center justify-center">
        <slot :item="items[itemIndex]" :index="itemIndex">
          {{ items[itemIndex] }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, Ref, ref, toRefs, watch } from 'vue';
import { TodoState } from '../../store';

type Column = number[];

const props = withDefaults(
  defineProps<{
    columnWidth?: number;
    items: TodoState[];
    gap?: number;
    rtl?: boolean;
    ssrColumns?: number;
  }>(),
  {
    columnWidth: 400,
    gap: 0,
    rtl: false,
    ssrColumns: 0,
  },
);

const { columnWidth, items, gap, rtl, ssrColumns } = toRefs(props);
const columns = ref<Column[]>([]);
const wall = ref<HTMLDivElement>() as Ref<HTMLDivElement>;

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (event: 'redraw'): void;
  // eslint-disable-next-line no-unused-vars
  (event: 'redraw-skip'): void;
}>();

function columnCount(): number {
  const count = Math.floor((wall.value.getBoundingClientRect().width + gap.value) / (columnWidth.value + gap.value));
  return count > 0 ? count : 1;
}

function createColumns(count: number): Column[] {
  return [...new Array(count)].map(() => []);
}

if (ssrColumns.value > 0) {
  const newColumns = createColumns(ssrColumns.value);
  items.value.forEach((_: unknown, i: number) => newColumns[i % ssrColumns.value].push(i));
  columns.value = newColumns;
}

async function fillColumns(itemIndex: number) {
  if (itemIndex >= items.value.length) {
    return;
  }
  await nextTick();
  const columnDivs = Array.from(wall.value.children) as HTMLDivElement[];
  if (rtl.value) {
    columnDivs.reverse();
  }
  const target = columnDivs.reduce((prev, curr) =>
    curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev,
  );
  columns.value[+target.dataset.index!].push(itemIndex);
  await fillColumns(itemIndex + 1);
}

async function redraw(force = false) {
  if (columns.value.length === columnCount() && !force) {
    emit('redraw-skip');
    return;
  }
  columns.value = createColumns(columnCount());
  const scrollY = window.scrollY;
  await fillColumns(0);
  window.scrollTo({ top: scrollY });
  emit('redraw');
}

const resizeObserver = new ResizeObserver(() => redraw());

onMounted(() => {
  redraw();
  resizeObserver.observe(wall.value);
});

onBeforeUnmount(() => resizeObserver.unobserve(wall.value));

watch([items, rtl], () => redraw(true));
watch([columnWidth, gap], () => redraw());
</script>
