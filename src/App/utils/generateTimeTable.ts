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
    const times = value.split(':');
    const offsetTime = String((timeInfo.offsetTime as number) / 60).split('.');
    let offsetHour = Number(offsetTime[0]);
    let offsetMinute = Number(offsetTime[1]) * (60 / 100);
    if (isNaN(offsetMinute)) {
      offsetMinute = 0;
    }
    if (offsetMinute === 3) {
      offsetMinute = 30;
    }
    let hours = Number(times[0]) + offsetHour;
    let minutes = Number(times[1]) + offsetMinute;
    if (minutes === 60) {
      hours = hours + 1;
      minutes = 0;
    }
    if (hours < 0) {
      hours = hours + 24;
    }
    if (hours > 23) {
      hours = hours - 24;
    }
    if (minutes === 75) {
      minutes = 15;
    }
    if (minutes === 3) {
      minutes = 30;
    }
    return `${hours < 10 ? '0' + hours : hours}:${minutes === 0 ? '00' : String(minutes)}`;
  });
}
