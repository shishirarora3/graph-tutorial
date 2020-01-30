const COLOR_SWATCHES_LOOKUP = [
  'lightGreen',
  'lightBlue',
  'lightPink',
  'green',
  'darkGreen',
  'pink',
  'magenta',
  'purple',
  'black',
  'teal',
  'blue',
  'darkBlue',
  'orange',
  'darkRed',
  'red',
];

export function sendToSW(message) {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}
export function triggerQueueSync(message) {
  navigator.serviceWorker.ready.then(function(registration) {
    registration.sync.register(message);
  });
}

export function getDateTime(datetime, override = true) {
  if (!datetime) {
    return ['', '', '', '', ''];
  }
  const [_date, _time] = datetime.split("T");
  const [h, m] = _time.split(".")[0].split(":");
  const __date = new Date(_date);
  let day, time, fullDate;
  const date = __date.getDate();
  const currentDate = new Date().getDate();
  if (override) {
    if (date === currentDate) {
      day = "Today";
    } else if (date === currentDate - 1) {
      day = "Yesterday";
    } else if (date === currentDate + 1) {
      day = "Tomorrow";
    }
  }

  [time, day, fullDate] = [`${h}:${m}`, day || __date.toLocaleString('en-us', {weekday: 'long'}), _date];
  const dateTime = date === currentDate ? time : __date.getMonth() + '/' + date + ' ' + time;

  return [date, time, day, fullDate, dateTime];
}

export function getColorFromName(displayName) {
  let color = 'blue';
  if (!displayName) {
      return color;
  }

  let hashCode = 0;
  for (let iLen = displayName.length - 1; iLen >= 0; iLen--) {
      const ch = displayName.charCodeAt(iLen);
      const shift = iLen % 8;
      // tslint:disable-next-line:no-bitwise
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
  }

  const COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length;

  color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES];

  return color;
}