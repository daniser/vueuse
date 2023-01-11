import { ref } from 'vue-demi'
import type { MaybeComputedRef } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'

export type DragStartHandler = (dataTransfer: DataTransfer | null) => void

export function useNativeDraggable(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  onDragStart?: DragStartHandler,
) {
  const element = ref<HTMLElement | null | undefined>()

  useEventListener<DragEvent>(target, 'dragstart', (event) => {
    element.value = event.target as HTMLElement
    onDragStart?.(event.dataTransfer)
  })

  useEventListener<DragEvent>(target, 'dragend', () => {
    element.value = null
  })

  return {
    element,
  }
}

export type UseNativeDraggableReturn = ReturnType<typeof useNativeDraggable>
