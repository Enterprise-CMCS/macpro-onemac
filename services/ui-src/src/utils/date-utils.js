import { format } from 'date-fns'

/**
 * Format a date to a string.
 * @param {Date} date 
 * @returns a string with the date
 */
export function formatDate(date) {
    return format(date, "EEE, MMM d yyyy, h:mm:ss a")
}