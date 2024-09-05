import { calculateDueDate } from './due-date-calculator';

describe('Validations', () => {
    test('Invalid Submit Date/Time', () => {
        function triggerError() {
            calculateDueDate("", 2);
        }
    
        expect(triggerError).toThrow(new Error('Invalid submit date provided.'));
    })
    
    test('Invalid Turnaround Time', () => {
        function triggerError() {
            calculateDueDate(new Date("2024-10-14T11:24:00"), "");
        }
        
        expect(triggerError).toThrow(new Error('Invalid turnaround time provided.'));
    })
    
    test('Submitted Outside Working Hours', () => {
        function triggerError() {
            calculateDueDate(new Date("2024-10-14T05:24:00"), 2);
        }
        
        expect(triggerError).toThrow(new Error('Issue can only be submitted during the working hours of 9AM - 5PM, Monday - Friday.'));
    })
})

describe('Calculations', () => {
    test('Due Date is Day of Submission', () => { 
        expect(calculateDueDate(new Date("2024-10-14T11:24:00"), 2)).toEqual(new Date("2024-10-14T13:24:00"))
    });
    
    test('Due Date is Next Day', () => { 
        expect(calculateDueDate(new Date("2024-10-14T11:24:00"), 8)).toEqual(new Date("2024-10-15T11:24:00"))
    });
    
    test('Due Date is Next Week', () => { 
        expect(calculateDueDate(new Date("2024-10-17T11:24:00"), 16)).toEqual(new Date("2024-10-21T11:24:00"))
    });

    test('Due Date is Next Month', () => { 
        expect(calculateDueDate(new Date("2024-10-17T11:24:00"), 100)).toEqual(new Date("2024-11-04T15:24:00"))
    });
})
