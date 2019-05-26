import TrackingItemUtils from 'utils/trackingItem';

export default class Deadline {
  /**
   * 
   * @param {Number} recurringFrequency Enum value describing the bill frequency
   * @param {String} dueDateString DateTime when the bill is due
   */
  static getTimeDifference(recurringFrequency, dueDateString) {
    const frequency = TrackingItemUtils.trackingItemFrequency;
    const now = new Date();
    const dueDate = new Date(dueDateString);

    switch (recurringFrequency) {
      case frequency.DAILY:
        return {
          years: 0,
          months: 0,
          days: 0,
          hours: Math.abs(dueDate.getHours() - now.getHours()),
          minutes: Math.abs(dueDate.getMinutes() - now.getMinutes()),
          seconds: Math.abs(dueDate.getSeconds() - now.getSeconds()),
        };
      case frequency.WEEKLY:
      case frequency.BIWEEKLY:
      case frequency.MONTHLY:
        return {
          years: 0,
          months: 0,
          days: Math.abs(dueDate.getDate() - now.getDate()),
          hours: Math.abs(dueDate.getHours() - now.getHours()),
          minutes: Math.abs(dueDate.getMinutes() - now.getMinutes()),
          seconds: Math.abs(dueDate.getSeconds() - now.getSeconds()),
        };
      case frequency.ANNUALLY:
        return {
          years: 0,
          months: Math.abs(dueDate.getMonths() - now.getMonths()),
          days: Math.abs(dueDate.getDate() - now.getDate()),
          hours: Math.abs(dueDate.getHours() - now.getHours()),
          minutes: Math.abs(dueDate.getMinutes() - now.getMinutes()),
          seconds: Math.abs(dueDate.getSeconds() - now.getSeconds()),
        };
      default:
        return null;
    }
  }

  /**
   * 
   * @param {*} timeDifference
   */
  static getTimeDifferenceToClientString(timeDifference) {
    const {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    } = timeDifference;
    let result = '';

    if (years) {
      result = years === 1 ? `${years} year` : `${years} years`;
    } else if (months) {
      result = months === 1 ? `${months} month` : `${months} months`;
    } else if (days) {
      result = days === 1 ? `${days} day` : `${days} days`;
    } else if (hours) {
      result = hours === 1 ? `${hours} hour` : `${hours} hours`;
    } else if (minutes) {
      result = minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
    } else if (seconds) {
      result = seconds === 1 ? `${seconds} second` : `${seconds} seconds`;
    }

    return result;
  }

  static getClientStringForFrequency(recurringFrequency) {
    const frequency = TrackingItemUtils.trackingItemFrequency;
    switch (recurringFrequency) {
      case frequency.DAILY:
        return 'day';
      case frequency.WEEKLY:
        return 'week';
      case frequency.BIWEEKLY:
        return 'biweek';
      case frequency.MONTHLY:
        return 'month';
      case frequency.ANNUALLY:
        return 'year';
      default:
        return '';
    }
  }
}
