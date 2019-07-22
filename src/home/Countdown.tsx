import React, { useEffect, useState, useMemo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 100
  },

  component: {
    flexDirection: 'column',
    marginRight: 8,
    marginLeft: 8,
    minWidth: 50
  },

  number: {
    fontSize: 22
  },

  label: {

  }
})

function timeToCountdown(destination: Readonly<Date>, now: Readonly<Date>): number {
  return destination.getTime() - now.getTime()
}

const MS_PER_SECOND = 1000
const MS_PER_MINUTE = MS_PER_SECOND * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24

type TimeComponent = 'days' | 'hours' | 'minutes' | 'seconds'

function getTimeDiffComponents(diffInMs: number): Record<TimeComponent, number> {
  const days = Math.floor(diffInMs / MS_PER_DAY)
  diffInMs = diffInMs % MS_PER_DAY
  const hours = Math.floor(diffInMs / MS_PER_HOUR)
  diffInMs = diffInMs % MS_PER_HOUR
  const minutes = Math.floor(diffInMs / MS_PER_MINUTE)
  diffInMs = diffInMs % MS_PER_MINUTE
  const seconds = Math.floor(diffInMs / MS_PER_SECOND)

  return { days, hours, minutes, seconds }
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural
}

export function Countdown({ date }: { date: string }): JSX.Element | null {
  const [now, setNow] = useState(new Date())
  const destination = useMemo(() => new Date(date), [date])
  const diffInMs = timeToCountdown(destination, now)

  if (diffInMs < 0) {
    return null
  }

  const { days, hours, minutes, seconds } = useMemo(() => getTimeDiffComponents(diffInMs), [diffInMs])

  useEffect((): (() => void) => {
    const requestFrameId = requestAnimationFrame(() => setNow(new Date()))
    return () => cancelAnimationFrame(requestFrameId)
  })

  return (
    <View style={styles.container}>
      {
        days >= 1
        ? <View style={styles.component}>
            <Text style={styles.number}>{days}</Text>
            <Text style={styles.label}>{pluralize(days, 'day', 'days')}</Text>
          </View>
        : null
      }
      <View style={styles.component}>
        <Text style={styles.number}>{hours}</Text>
        <Text style={styles.label}>{pluralize(hours, 'hour', 'hours')}</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.number}>{minutes}</Text>
        <Text style={styles.label}>{pluralize(minutes, 'minute', 'minutes')}</Text>
      </View>
      <View style={styles.component}>
        <Text style={styles.number}>{seconds}</Text>
        <Text style={styles.label}>{pluralize(seconds, 'second', 'seconds')}</Text>
      </View>
    </View>
  )
}
