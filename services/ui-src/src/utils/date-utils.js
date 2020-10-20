import moment from 'moment';

/**
 * Format a date to a string.
 * @param {Date} date 
 * @returns a string with the date
 */
export function formatDate(date) {
    moment.locale('en');
    return moment(date).format("ddd, MMM Do YYYY, h:mm:ss a")
}