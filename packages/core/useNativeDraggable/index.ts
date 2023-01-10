import { ref } from 'vue-demi'
import type { Ref } from 'vue-demi'
import type { MaybeComputedRef } from '@vueuse/shared'
import { isClient } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'

export interface UseNativeDraggableReturn {
  isDragging: Ref<boolean>
}

export function useNativeDraggable(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  onDragStart?: (dataTransfer: DataTransfer | null) => void,
): UseNativeDraggableReturn {
  const isDragging = ref(false)

  if (isClient) {
    useEventListener<DragEvent>(target, 'dragstart', (event) => {
      event.preventDefault()
      isDragging.value = true
      const files = Array.from(event.dataTransfer?.files ?? [])
      onDragStart?.(files.length === 0 ? null : files)
    })
    useEventListener<DragEvent>(target, 'dragend', (event) => {
      event.preventDefault()
      isDragging.value = false
    })
  }

  return {
    isDragging,
  }
}
