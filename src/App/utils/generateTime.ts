/*****
 * @author @SherAtrium
 * Function will return an array with times, like - ["23:00, 23:30, ..."] or ["00:30 AM", "00:35 AM"];
 * @param timeFormat should receive the format of time - 12 or 24;
 * @param minuteInterval should receive a number, like - 30;
 * @param startTime should receive an hour, like - 12;
 * @param endTime should receive an hour, like - 23;
 */
const generateTime = (
  timeFormat: number,
  minuteInterval: number,
  startTime: number,
  endTime: number
) => {
  let start_time_in_minute = startTime * 60;
  let end_time_in_minute = endTime * 60;
  let AP = ['AM', 'PM'];
  const times = [];
  for (let i = 0; start_time_in_minute <= end_time_in_minute; i++) {
    let hh = Math.floor(start_time_in_minute / 60);
    let mm = start_time_in_minute % 60;
    if (timeFormat === 24) {
      times[i] = ('0' + hh).slice(-2) + ':' + ('0' + mm).slice(-2);
    }
    if (timeFormat === 12) {
      times[i] =
        ('0' + (hh % timeFormat)).slice(-2) +
        ':' +
        ('0' + mm).slice(-2) +
        ' ' +
        AP[Math.floor(hh / 12)];
    }
    start_time_in_minute = start_time_in_minute + minuteInterval;
  }
  return times;
};
export default generateTime;
