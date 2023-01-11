<script setup lang="ts">
import { ref } from 'vue'
import { useDropZone, useNativeDraggable } from '@vueuse/core'

function shuffle(array: Array<any>) {
  const arr = array

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr
}

const lorem = (
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do '
+ 'eiusmod tempor incididunt ut labore et dolore magna aliqua'
).split(' ')

const ipsum = ref(lorem)

const dragZoneRef = ref<HTMLElement>()
const { element } = useNativeDraggable(dragZoneRef, (dataTransfer) => {
  dataTransfer?.setData('text/plain', element.value?.textContent ?? '')
})

const dropZoneRef = ref<HTMLElement>()
const { isOverDropZone } = useDropZone(dropZoneRef, (dataTransfer) => {
  if (dropZoneRef.value) {
    let addendum = dataTransfer?.getData('text/plain') ?? ''
    ipsum.value = ipsum.value.filter(word => word !== addendum)
    if (addendum.length)
      addendum += ' '
    dropZoneRef.value.textContent += addendum
    // element.value?.remove()
  }
}, false)
</script>

<template>
  <div ref="dragZoneRef">
    <TransitionGroup name="ticket-pool">
      <button v-for="(lorem, index) in ipsum" :key="index" draggable="true">
        {{ lorem }}
      </button>
    </TransitionGroup>
  </div>
  <div id="dropzone" ref="dropZoneRef" class="flex flex-col w-full min-h-200px h-auto bg-gray-400/10 justify-center items-center mt-6" />
</template>

<style scoped>
#dropzone:empty::before {
  content: 'Drop words here';
  color: darkgray;
}

.ticket-pool-move,
.ticket-pool-enter-active {
  transition: all 0.5s ease;
}

.ticket-pool-enter-from {
  transform: translateX(300px);
}

.ticket-pool-leave-active {
  transition: opacity 0.5s;
}

.ticket-pool-leave-to {
  opacity: 0;
}
</style>
