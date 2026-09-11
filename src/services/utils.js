import { clearTheme, cloudyTheme, rainyTheme } from "../assets/themes";

export function getTheme(weatherCode) {
  switch (Number(weatherCode)) {
    case 0:
    //partly cloudy code. close enough to clear to use the clearTheme
    case 1:
      return clearTheme;
    //drizzle and freezing drizzle codes
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    //rain and freezing rain codes
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    //rain shower codes
    case 80:
    case 81:
    case 82:
    //thunderstorm codes
    case 95:
    case 96:
    case 99:
      return rainyTheme;
    // cloudy codes
    case 2:
    case 3:
    case 45:
    case 48:
    //snow codes. cloudy theme seemed good choice since an independent snow theme would be similar
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return cloudyTheme;
    default:
      return clearTheme;
  }
}

export function formatTime(time, is24Hour) {
  const minutes = time.getMinutes();
  let hours = time.getHours();
  let meridiemInd = ""; // AM/PM marker
  if (!is24Hour) {
    if (hours > 12) {
      hours = hours - 12;
      meridiemInd = "PM";
    } else {
      meridiemInd = "AM";
    }
  }
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${meridiemInd}`;
}
