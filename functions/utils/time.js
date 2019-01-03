const THDifTimeZone = 420; // in minute

export function getCurrentTime() {
  var now = new Date();
  var timeTH = new Date(now.valueOf() + THDifTimeZone * 60000);
  return timeTH.toLocaleString();
}
