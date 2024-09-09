import { isDev } from './is-dev'

export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[antd-taro: ${component}] ${message}`)
  }
}

export function devError(component: string, message: string) {
  if (isDev) {
    console.error(`[antd-taro: ${component}] ${message}`)
  }
}

let infoBox: HTMLTextAreaElement
export function devPrint(...message: any[]) {
  if (isDev && process.env.TARO_ENV === 'h5') {
    if (!infoBox) {
      infoBox = document.createElement('textarea')
      document.body.appendChild(infoBox)
      infoBox.style.position = 'fixed'
      infoBox.style.top = '0'
      infoBox.style.left = '0'
      infoBox.style.width = '100vw'
      infoBox.style.height = '100vh'
      infoBox.style.zIndex = '999999'
      infoBox.style.fontSize = '12px'
      // infoBox.style.opacity = '0.85'
      infoBox.style.pointerEvents = 'none'
      infoBox.style.background = 'transparent'
      infoBox.style.textShadow =
        '-1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px -1px 0 #FFF, 1px 1px 0 #FFF'
    }

    infoBox.value = `${infoBox.value}\n${message.join(' ')}`.trim()
    infoBox.scrollTop = infoBox.scrollHeight
  }
}
