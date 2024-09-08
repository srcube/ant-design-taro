import { createContext, useContext } from 'react'
import type { FC, ReactNode, PropsWithChildren } from 'react'

import { Locale } from '../../locales/base'
import zhCN from '../../locales/zh-CN'

type Config = {
  locale: Locale
  checkList?: {
    activeIcon?: ReactNode
  }
  collapse?: {
    arrowIcon?: ReactNode | ((active: boolean) => ReactNode)
  }
  dropdown?: {
    arrowIcon?: ReactNode
  }
  form?: {
    helpIcon?: ReactNode
  }
  input?: {
    clearIcon?: ReactNode
  }
  list?: {
    arrowIcon?: ReactNode
  }
  navBar?: {
    backIcon?: ReactNode
  }
  noticeBar?: {
    icon?: ReactNode
    closeIcon?: ReactNode
  }
  popup?: {
    closeIcon?: ReactNode
  }
  result?: {
    successIcon?: ReactNode
    errorIcon?: ReactNode
    infoIcon?: ReactNode
    waitingIcon?: ReactNode
    warningIcon?: ReactNode
  }
  searchBar?: {
    searchIcon?: ReactNode
  }
}

export const defaultConfigRef: {
  current: Config
} = {
  current: {
    locale: zhCN,
  },
}

export function setDefaultConfig(config: Config) {
  defaultConfigRef.current = config
}

export function getDefaultConfig() {
  return defaultConfigRef.current
}

const ConfigContext = createContext<Config | null>(null)

export type ConfigProviderProps = PropsWithChildren<Partial<Config>>

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { children, ...config } = props
  const parentConfig = useConfig()

  return (
    <ConfigContext.Provider
      value={{
        ...parentConfig,
        ...config,
      }}
    >
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  return useContext(ConfigContext) ?? getDefaultConfig()
}
