import DueDateCalculatorHelper from "./due-date-calculator-helper";

describe('Validations', () => {
    test('Valid Submit Date/Time', () => {    
        expect(DueDateCalculatorHelper.validSubmitDateTime(new Date("2024-10-14T05:24:00"))).toBe(true);
    })

    test('Invalid Submit Date/Time', () => {    
        expect(DueDateCalculatorHelper.validSubmitDateTime(new Date("2024-10-14T25:24:00"))).toBe(false);
    })
    
    test('Valid Turnaround Time', () => {
        expect(DueDateCalculatorHelper.validTurnaroundTime(2)).toBe(true);
    })

    test('Invalid Turnaround Time', () => {
        expect(DueDateCalculatorHelper.validTurnaroundTime(0)).toBe(false);
    })
    
    test('Submitted Within Working Hours', () => {        
        expect(DueDateCalculatorHelper.submittedWithinWorkingHours(new Date("2024-10-14T11:24:00"))).toBe(true);
    })

    test('Submitted Outside Working Hours', () => {        
        expect(DueDateCalculatorHelper.submittedWithinWorkingHours(new Date("2024-10-14T17:24:00"))).toBe(false);
    })
})

describe('Calculations', () => {
    test('Next Start Day Is Next Day', () => { 
        expect(DueDateCalculatorHelper.calculateNextStartTime(new Date("2024-10-14T13:24:00"))).toEqual(new Date("2024-10-15T09:24:00"));
    });

    test('Next Start Day Is Past Weekend', () => { 
        expect(DueDateCalculatorHelper.calculateNextStartTime(new Date("2024-10-18T13:24:00"))).toEqual(new Date("2024-10-21T09:24:00"));
    });
    
    test('Task End Time', () => { 
        expect(DueDateCalculatorHelper.calculateTaskEndTime(new Date("2024-10-18T13:24:00"), 8)).toBe(21);
    });
    
    test('Remaining Task Hours', () => { 
        expect(DueDateCalculatorHelper.calculateRemainingHours(20)).toBe(3);
    });
})
