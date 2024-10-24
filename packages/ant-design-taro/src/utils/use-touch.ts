import { useRef } from 'react'

const MIN_DISTANCE = 10

type Direction = '' | 'vertical' | 'horizontal'

function getDirection(x: number, y: number) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal'
  }
  if (y > x && y > MIN_DISTANCE) {
    return 'vertical'
  }
  return ''
}

export function useTouch() {
  const startX = useRef(0)
  const startY = useRef(0)
  const deltaX = useRef(0)
  const deltaY = useRef(0)
  const offsetX = useRef(0)
  const offsetY = useRef(0)
  const direction = useRef<Direction>('')

  const isVertical = () => direction.current === 'vertical'
  const isHorizontal = () => direction.current === 'horizontal'

  const reset = () => {
    deltaX.current = 0
    deltaY.current = 0
    offsetX.current = 0
    offsetY.current = 0
    direction.current = ''
  }

  const start = ((event: TouchEvent) => {
    reset()
    startX.current = event.touches[0]?.clientX ?? 0
    startY.current = event.touches[0]?.clientY ?? 0
  }) as EventListener

  const move = ((event: TouchEvent) => {
    const touch = event.touches[0]
    // Fix: Safari back will set clientX to negative number
    const clientX = touch?.clientX ?? 0
    const clientY = touch?.clientY ?? 0

    deltaX.current = clientX < 0 ? 0 : clientX - startX.current
    deltaY.current = clientY < 0 ? 0 : clientY - startY.current
    offsetX.current = Math.abs(deltaX.current)
    offsetY.current = Math.abs(deltaY.current)

    if (!direction.current) {
      direction.current = getDirection(offsetX.current, offsetY.current)
    }
  }) as EventListener

  return {
    move,
    start,
    reset,
    startX,
    startY,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    direction,
    isVertical,
    isHorizontal,
  }
}
