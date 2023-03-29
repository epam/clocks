import generateTime from './generateTime';
import { ITimeState } from '../components/Section/components/LocationBlock/LocationBlock.types';

export default function generateTimeTable(
  timeInfo: ITimeState,
  timeFormat: number,
  minuteInterval: number,
  startTime: number,
  endTime: number
) {
  const timeline = generateTime(timeFormat, minuteInterval, startTime, endTime);
  return timeline.map(value => {
    let AMPM = '';
    if (value.slice(-2) === 'AM' || value.slice(-2) === 'PM') {
      AMPM = value.slice(-3);
      value = value.slice(0, value.length - 3);
    }
    const times = value.split(':');
    const offsetTimeInMinutes = timeInfo.offsetTime as number;
    const timesInMinutes = Number(times[0]) * 60 + Number(times[1]);
    const timesWithOffsetInMinutes = timesInMinutes + offsetTimeInMinutes;
    const timesWithOffsetInHours = String(timesWithOffsetInMinutes / 60);
    const newTimes = timesWithOffsetInHours.split('.');
    let hours = Number(newTimes[0]);
    let minutes = Number(newTimes[1]);
    minutes = Number(`.${minutes}`) * 60;
    if (timesWithOffsetInMinutes < -60) {
      minutes = (minutes - 60) * -1;
      hours = hours - 1;
    }
    if (timesWithOffsetInMinutes < 0 && timesWithOffsetInMinutes > -60) {
      hours = hours - 1;
      minutes = 60 - minutes;
    }
    if (isNaN(minutes)) {
      minutes = 0;
    }
    if (hours < 0) {
      hours = hours + 24;
    }
    if (hours > 23) {
      hours = hours - 24;
    }
    return `${hours < 10 ? '0' + hours : hours}:${minutes === 0 ? '00' : minutes}` + AMPM;
  });
}
