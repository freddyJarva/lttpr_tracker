function zeroPadded(number) {
  return number.toString().padStart(2, '0')
}

// consider the last digit of the input number (used for the tenths of seconds)
function lastDigit(number) {
  return number.toString()[number.toString().length - 1];
}

/* format time in the following format
mm:ss:t
zero padded minutes, zero padded seconds, tenths of seconds
*/
export function formatTime(milliseconds) {
  let runningSeconds = milliseconds / 1000
  const t = lastDigit(Math.floor(milliseconds / 100));
  const ss = zeroPadded(Math.floor(runningSeconds) % 60);
  const mm = zeroPadded(Math.floor(runningSeconds / 60) % 60);
  const hh = zeroPadded(Math.floor(runningSeconds / 60 / 60))
  return `${hh}:${mm}:${ss}`;
}