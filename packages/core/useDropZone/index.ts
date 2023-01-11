import { ref } from 'vue-demi'
import type { MaybeComputedRef } from '@vueuse/shared'
import { isClient } from '@vueuse/shared'
import { useEventListener } from '../useEventListener'

export type DropHandler = <T extends DataTransfer | File[] = DataTransfer>(arg: T | null) => void

export function useDropZone(
  target: MaybeComputedRef<HTMLElement | null | undefined>,
  onDrop?: DropHandler,
  filesOnly = true,
) {
  const isOverDropZone = ref(false)
  let counter = 0

  if (isClient) {
    useEventListener<DragEvent>(target, 'dragenter', (event) => {
      event.preventDefault()
      counter++
      isOverDropZone.value = true
    })
    useEventListener<DragEvent>(target, 'dragover', (event) => {
      event.preventDefault()
    })
    useEventListener<DragEvent>(target, 'dragleave', (event) => {
      event.preventDefault()
      counter--
      if (counter === 0)
        isOverDropZone.value = false
    })
    useEventListener<DragEvent>(target, 'drop', (event) => {
      event.preventDefault()
      counter = 0
      isOverDropZone.value = false
      if (onDrop) {
        if (filesOnly) {
          const files = Array.from(event.dataTransfer?.files ?? [])
          onDrop<File[]>(files.length === 0 ? null : files)
        }
        else {
          onDrop(event.dataTransfer)
        }
      }
    })
  }

  return {
    isOverDropZone,
  }
}

export type UseDropZoneReturn = ReturnType<typeof useDropZone>
