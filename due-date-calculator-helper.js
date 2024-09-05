/**
 * @module DueDateCalculatorHelper
*/

/** 
 * @constant
 * @type {number}
 * @default
*/
const SATURDAY = 6;

/** 
 * @constant
 * @type {number}
 * @default
*/
const SUNDAY = 0;

/** 
 * @constant
 * @type {number}
 * @default
*/
const FRIDAY = 5;

/** 
 * @constant
 * @type {number}
 * @default
*/
const WEEKEND_SKIP = 3;

/** 
 * @constant
 * @type {number}
 * @default
*/
const NEXT_DAY = 1;

/** 
 * @constant
 * @type {number}
 * @default
*/
const WORK_DAY_END_TIME = 17;

/** 
 * @constant
 * @type {number}
 * @default
*/
const WORK_DAY_START_TIME = 9;

/** 
 * @constant
 * @type {number}
 * @default
*/
const ZERO_TURNAROUND_TIME = 0;

/**
 * @class
 * @classdesc Helper class to perform validation and calculations for calculating due date
 * @static
 */
export default class DueDateCalculatorHelper {
    /** 
     * Validates if the submitted date/time is a valid date
     * @param {Date} submitDateTime - The submission date/time
     * @static
    */
    static validSubmitDateTime(submitDateTime) {
        if (!(submitDateTime instanceof Date) || isNaN(submitDateTime)) {
            return false;
        }

        return true;
    }
    
    /** 
     * Validates if the turnaround time is a valid number
     * @param {number} turnaroundTime - The turnaround time in number of hours
     * @static
    */
    static validTurnaroundTime(turnaroundTime) {
        if (isNaN(turnaroundTime) || turnaroundTime <= ZERO_TURNAROUND_TIME) {
            return false;
        }

        return true;
    }
    
    /** 
     * Validates if the submitted date/time is within working hours
     * @param {Date} submitDateTime - The submission date/time
     * @static
    */
    static submittedWithinWorkingHours(submitDateTime) {
        if (submitDateTime.getHours() >= WORK_DAY_END_TIME 
            || submitDateTime.getHours() < WORK_DAY_START_TIME
            || submitDateTime.getDay() === SUNDAY 
            || submitDateTime.getDay() === SATURDAY) {
            return false;
        }

        return true;
    }

    /** 
     * Calculates the task end time in number of hours
     * @param {Date} startDateTime - The start date/time
     * @param {number} addTime - The number of hours to add
     * @static
    */
    static calculateTaskEndTime(startDateTime, addTime) {
        return startDateTime.getHours() + addTime;
    }

    /** 
     * Calculates the next start time for the remaining task hours
     * If the current day is a Friday, then skip past weekend. Otherwise, go to next day.
     * @param {Date} day - The current date/time of work
     * @returns {Date} The next valid day to start work on task
     * @static
    */
    static calculateNextStartTime(day) {
        const nextDay = (day.getDay() === FRIDAY) ? (day.getDate() + WEEKEND_SKIP) : (day.getDate() + NEXT_DAY);

        day.setDate(nextDay);
        day.setHours(WORK_DAY_START_TIME);

        return day;
    }

    /** 
     * Calculates the number of remaining task hours
     * @param {number} taskEndTime - The number of hours in which the task will be completed
     * @returns {number} The remaining task hours after today
     * @static
    */
    static calculateRemainingHours(taskEndTime) {
        return taskEndTime - WORK_DAY_END_TIME;
    }

    /** 
     * Determines if the task end time is before the work day end time
     * @param {number} taskEndTime - The number of hours in which the task will be completed
     * @returns {boolean} If the remaining task hours are less than the work day end hours
     * @static
    */
    static isFinishedInCurrentDay(taskEndTime) {
        return taskEndTime < WORK_DAY_END_TIME;
    }
}