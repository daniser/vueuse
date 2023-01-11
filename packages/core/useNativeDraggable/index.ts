import { ref } from 'vue-demi'
import type { MaybeComputedRef } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'

export function useNativeDraggable(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  onDragStart?: (dataTransfer: DataTransfer | null) => void,
) {
  const element = ref<HTMLElement | null | undefined>()

  useEventListener<DragEvent>(target, 'dragstart', (event) => {
    event.preventDefault()
    element.value = event.target as HTMLElement
    onDragStart?.(event.dataTransfer)
  })
  useEventListener<DragEvent>(target, 'dragend', (event) => {
    event.preventDefault()
    element.value = null
  })

  return {
    element,
  }
}

export type UseNativeDraggableReturn = ReturnType<typeof useNativeDraggable>
