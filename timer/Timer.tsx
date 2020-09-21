import React, { useEffect, useState } from 'react';
import './Timer.scss'

function Timer() {
  const [isActive, setIsActive] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeDelta, setTimeDelta] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  function toggleTimer() {
    setStartTime(Date.now())
    setTimeDelta(0)
    setIsActive(!isActive)
    setIsFinished(false)
  }

  function finish() {
    setIsActive(false)
    setIsFinished(true)
  }

  useEffect(() => {
    let interval: any = null
    if (isActive) {
      interval = setInterval(() => {
        setTimeDelta(Date.now() - startTime)
      }, 1000)
    } else if (!isActive && timeDelta !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, timeDelta, startTime])

  function formatTime(delta: number) {
    const seconds =  Math.floor(delta / 1000)
    const minutes = Math.floor(seconds / 60)
    const hourString = Math.floor(minutes / 60).toString()
    const secondString = (seconds % 60).toString()
    const minuteString = (minutes % 60).toString()
    new Intl.DateTimeFormat()
    return `${hourString.padStart(2, '0')}:${minuteString.padStart(2, '0')}:${secondString.padStart(2, '0')}`
  }

  return (
    <div className='Timer'>
      <div className={`time ${isFinished ? 'finished' : null}`}>
        {formatTime(timeDelta)}
      </div>
      <button className={`button button-primary`} onClick={toggleTimer}>
        {isActive ? 'RESET' : 'START'}
      </button>
      <button className='button' onClick={finish} disabled={!isActive}>FINISH</button>
    </div>
  )
}

export default Timer;