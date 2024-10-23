import React, {
  forwardRef,
  ReactNode,
  useState,
  useImperativeHandle,
  useMemo,
  useEffect,
} from 'react'
import { View } from '@tarojs/components'
import { useUpdateEffect } from 'ahooks'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import cn from 'classnames'

import { mergeProps } from '../../utils/with-default-props'
// import { ArrowLeft } from './arrow-left'
// import { ArrowLeftDouble } from './arrow-left-double'

import { NativeProps, withNativeProps } from '../../utils/native-props'
import { usePropsValue } from '../../utils/use-props-value'
import { replaceMessage } from '../../utils/replace-message'
import { devWarning } from '../../utils/dev-log'
import {
  convertValueToRange,
  convertPageToDayjs,
  DateRange,
  Page,
} from './convert'

import { useConfig } from '../ConfigProvider'
import { ArrowLeft, ArrowLeftDouble } from '../../icons'

dayjs.extend(isoWeek)

const classPrefix = 'adt-calendar'

export type CalendarRef = {
  jumpTo: (page: Page | ((page: Page) => Page)) => void
  jumpToToday: () => void
}

export type CalendarProps = {
  prevMonthButton?: React.ReactNode
  prevYearButton?: React.ReactNode
  nextMonthButton?: React.ReactNode
  nextYearButton?: React.ReactNode
  onPageChange?: (year: number, month: number) => void
  weekStartsOn?: 'Monday' | 'Sunday'
  renderLabel?: (date: Date) => React.ReactNode
  renderDate?: (date: Date) => React.ReactNode
  allowClear?: boolean
  max?: Date
  min?: Date
  shouldDisableDate?: (date: Date) => boolean
  minPage?: Page
  maxPage?: Page
} & (
  | {
      selectionMode?: undefined
      value?: undefined
      defaultValue?: undefined
      onChange?: undefined
    }
  | {
      selectionMode: 'single'
      value?: Date | null
      defaultValue?: Date | null
      onChange?: (val: Date | null) => void
    }
  | {
      selectionMode: 'range'
      value?: [Date, Date] | null
      defaultValue?: [Date, Date] | null
      onChange?: (val: [Date, Date] | null) => void
    }
) &
  NativeProps

const defaultProps = {
  weekStartsOn: 'Sunday',
  defaultValue: null,
  allowClear: true,
  prevMonthButton: <ArrowLeft style={{ backgroundColor: '#000' }} />,
  prevYearButton: <ArrowLeftDouble style={{ backgroundColor: '#000' }} />,
  nextMonthButton: (
    <ArrowLeft
      style={{ backgroundColor: '#000', transform: 'rotate(180deg)' }}
    />
  ),
  nextYearButton: (
    <ArrowLeftDouble
      style={{ backgroundColor: '#000', transform: 'rotate(180deg)' }}
    />
  ),
}

export const Calendar = forwardRef<CalendarRef, CalendarProps>((p, ref) => {
  const today = dayjs()
  const props = mergeProps(defaultProps, p)
  const { locale } = useConfig()
  const markItems = [...locale.Calendar.markItems]
  if (props.weekStartsOn === 'Sunday') {
    const item = markItems.pop()
    if (item) markItems.unshift(item)
  }

  const [dateRange, setDateRange] = usePropsValue<DateRange>({
    value:
      props.value === undefined
        ? undefined
        : convertValueToRange(props.selectionMode, props.value),
    defaultValue: convertValueToRange(props.selectionMode, props.defaultValue),
    onChange: (v) => {
      if (props.selectionMode === 'single') {
        props.onChange?.(v ? v[0] : null)
      } else if (props.selectionMode === 'range') {
        props.onChange?.(v)
      }
    },
  })

  const [intermediate, setIntermediate] = useState(false)

  const [current, setCurrent] = useState(() =>
    dayjs(dateRange ? dateRange[0] : today).date(1),
  )

  useUpdateEffect(() => {
    props.onPageChange?.(current.year(), current.month() + 1)
  }, [current])

  useImperativeHandle(ref, () => ({
    jumpTo: (pageOrPageGenerator) => {
      let page: Page
      if (typeof pageOrPageGenerator === 'function') {
        page = pageOrPageGenerator({
          year: current.year(),
          month: current.month() + 1,
        })
      } else {
        page = pageOrPageGenerator
      }
      setCurrent(convertPageToDayjs(page))
    },
    jumpToToday: () => {
      setCurrent(dayjs().date(1))
    },
  }))

  const handlePageChange = (
    action: 'subtract' | 'add',
    num: number,
    type: 'month' | 'year',
  ) => {
    const nxtCurrent = current[action](num, type)
    if (action === 'subtract' && props.minPage) {
      const minPage = convertPageToDayjs(props.minPage)
      if (nxtCurrent.isBefore(minPage, type)) {
        return
      }
    }
    if (action === 'add' && props.maxPage) {
      const maxPage = convertPageToDayjs(props.maxPage)
      if (nxtCurrent.isAfter(maxPage, type)) {
        return
      }
    }
    setCurrent(nxtCurrent)
  }

  const header = (
    <View className={`${classPrefix}-header`}>
      <View
        className={`${classPrefix}-arrow-button ${classPrefix}-arrow-button-year`}
        onClick={() => {
          handlePageChange('subtract', 1, 'year')
        }}
      >
        {props.prevYearButton}
      </View>
      <View
        className={`${classPrefix}-arrow-button ${classPrefix}-arrow-button-month`}
        onClick={() => {
          handlePageChange('subtract', 1, 'month')
        }}
      >
        {props.prevMonthButton}
      </View>
      <View className={`${classPrefix}-title`}>
        {replaceMessage(locale.Calendar.yearAndMonth, {
          year: current.year().toString(),
          month: (current.month() + 1).toString(),
        })}
      </View>
      <View
        className={cn(
          `${classPrefix}-arrow-button`,
          `${classPrefix}-arrow-button-right`,
          `${classPrefix}-arrow-button-right-month`,
        )}
        onClick={() => {
          handlePageChange('add', 1, 'month')
        }}
      >
        {props.nextMonthButton}
      </View>
      <View
        className={cn(
          `${classPrefix}-arrow-button`,
          `${classPrefix}-arrow-button-right`,
          `${classPrefix}-arrow-button-right-year`,
        )}
        onClick={() => {
          handlePageChange('add', 1, 'year')
        }}
      >
        {props.nextYearButton}
      </View>
    </View>
  )

  const maxDay = useMemo(() => props.max && dayjs(props.max), [props.max])
  const minDay = useMemo(() => props.min && dayjs(props.min), [props.min])

  function renderCells() {
    const cells: ReactNode[] = []
    let iterator = current.subtract(current.isoWeekday(), 'day')
    if (props.weekStartsOn === 'Monday') {
      iterator = iterator.add(1, 'day')
    }
    while (cells.length < 6 * 7) {
      const d = iterator
      let isSelect = false
      let isBegin = false
      let isEnd = false
      let isSelectRowBegin = false
      let isSelectRowEnd = false
      if (dateRange) {
        const [begin, end] = dateRange
        isBegin = d.isSame(begin, 'day')
        isEnd = d.isSame(end, 'day')
        isSelect =
          isBegin ||
          isEnd ||
          (d.isAfter(begin, 'day') && d.isBefore(end, 'day'))
        if (isSelect) {
          isSelectRowBegin =
            (cells.length % 7 === 0 || d.isSame(d.startOf('month'), 'day')) &&
            !isBegin
          isSelectRowEnd =
            (cells.length % 7 === 6 || d.isSame(d.endOf('month'), 'day')) &&
            !isEnd
        }
      }
      const inThisMonth = d.month() === current.month()
      const disabled = props.shouldDisableDate
        ? props.shouldDisableDate(d.toDate())
        : (maxDay && d.isAfter(maxDay, 'day')) ||
          (minDay && d.isBefore(minDay, 'day'))
      cells.push(
        <View
          key={d.valueOf()}
          className={cn(
            `${classPrefix}-cell`,
            (disabled || !inThisMonth) && `${classPrefix}-cell-disabled`,
            inThisMonth && {
              [`${classPrefix}-cell-today`]: d.isSame(today, 'day'),
              [`${classPrefix}-cell-selected`]: isSelect,
              [`${classPrefix}-cell-selected-begin`]: isBegin,
              [`${classPrefix}-cell-selected-end`]: isEnd,
              [`${classPrefix}-cell-selected-row-begin`]: isSelectRowBegin,
              [`${classPrefix}-cell-selected-row-end`]: isSelectRowEnd,
            },
          )}
          onClick={() => {
            if (!props.selectionMode) return
            if (disabled) return
            const date = d.toDate()
            if (!inThisMonth) {
              setCurrent(d.clone().date(1))
            }
            function shouldClear() {
              if (!props.allowClear) return false
              if (!dateRange) return false
              const [begin, end] = dateRange
              return d.isSame(begin, 'date') && d.isSame(end, 'day')
            }
            if (props.selectionMode === 'single') {
              if (props.allowClear && shouldClear()) {
                setDateRange(null)
                return
              }
              setDateRange([date, date])
            } else if (props.selectionMode === 'range') {
              if (!dateRange) {
                setDateRange([date, date])
                setIntermediate(true)
                return
              }
              if (shouldClear()) {
                setDateRange(null)
                setIntermediate(false)
                return
              }
              if (intermediate) {
                const another = dateRange[0]
                setDateRange(another > date ? [date, another] : [another, date])
                setIntermediate(false)
              } else {
                setDateRange([date, date])
                setIntermediate(true)
              }
            }
          }}
        >
          <View className={`${classPrefix}-cell-top`}>
            {props.renderDate ? props.renderDate(d.toDate()) : d.date()}
          </View>
          <View className={`${classPrefix}-cell-bottom`}>
            {props.renderLabel?.(d.toDate())}
          </View>
        </View>,
      )
      iterator = iterator.add(1, 'day')
    }
    return cells
  }
  const body = <View className={`${classPrefix}-cells`}>{renderCells()}</View>

  const mark = (
    <View className={`${classPrefix}-mark`}>
      {markItems.map((item, index) => (
        <View key={index} className={`${classPrefix}-mark-cell`}>
          {item}
        </View>
      ))}
    </View>
  )

  // Dev only warning
  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      devWarning(
        'Calendar',
        'Calendar will be removed in the future, please use CalendarPickerView instead.',
      )
    }, [])
  }

  return withNativeProps(
    props,
    <View className={classPrefix}>
      {header}
      {mark}
      {body}
    </View>,
  )
})
