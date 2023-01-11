---
category: Elements
---

# useNativeDraggable

Hook on native element dragging.

## Usage

```html
<script setup lang="ts">
import { useNativeDraggable } from '@vueuse/core'

const dragZoneRef = ref<HTMLDivElement>()

function onDragStart(dataTransfer: DataTransfer | null) {
  // called when elements are dragged in zone
}

const { element } = useNativeDraggable(dragZoneRef, onDragStart)
</script>

<template>
  <div ref="dragZoneRef">
    <div draggable="true">Drag Me!</div>
  </div>
</template>
```
