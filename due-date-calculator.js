import DueDateCalculatorHelper from "./due-date-calculator-helper";

/** 
 * Calculates the due date of a task with the date submitted and the turnaround around time. 
 * Due date will resolve to a time during working hours of 9AM - 5PM, Monday - Friday.
 * Due date will take into account working hours/days when resolving due date.
 * @param {Date} submitDateTime - Date and time task is submitted
 * @param {number} turnaroundTime - Hours of turnaround time to resolve the task
 * @returns {Date} Due date of task
*/
export const calculateDueDate = function (submitDateTime, turnaroundTime) {
    if (!DueDateCalculatorHelper.validSubmitDateTime(submitDateTime)) {
        throw new Error("Invalid submit date provided.");
    }

    if (!DueDateCalculatorHelper.validTurnaroundTime(turnaroundTime)) {
        throw new Error("Invalid turnaround time provided.");
    }

    if (!DueDateCalculatorHelper.submittedWithinWorkingHours(submitDateTime)) {
        throw new Error("Issue can only be submitted during the working hours of 9AM - 5PM, Monday - Friday.");
    }

    return resolveDueDate(submitDateTime, turnaroundTime);
}

/** 
 * Determine if the end time of the task is within the current day.
 * If the end time is not within the current day, then calculate the new start time and remaining hours.
 * Recursively call function until the end time is within the "current day" and then return the "current day" (date when task will be due).
 * @param {Date} day - The current day to calculate task hours for
 * @param {number} hours - The number of hours remaining to complete the task
 * @returns {Date} Due date of task
*/
function resolveDueDate(day, hours) {
    const taskEndTime = DueDateCalculatorHelper.calculateTaskEndTime(day, hours)
     
    if (DueDateCalculatorHelper.isFinishedInCurrentDay(taskEndTime)) {
        return new Date(day.setHours(taskEndTime));
    } else {
        const newStartTime = DueDateCalculatorHelper.calculateNextStartTime(day);
        const remainingHours = DueDateCalculatorHelper.calculateRemainingHours(taskEndTime);

        return resolveDueDate(newStartTime, remainingHours);
    }
}
