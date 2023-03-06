const Employee = require('../lib/Employee.js');

describe("Employee", () => {
    describe("Initialization", () => {

        it("should create an object with name, id, and email using constructor", () => {
            const employee = new Employee('me', 123, 'me@mail.com');

            expect(employee.name).toEqual('me');
            expect(employee.id).toEqual(123);
            expect(employee.email).toEqual('me@mail.com');
        })
    })

    describe("Methods", () => {
        it("should return name via getName()", () => {
            const employee = new Employee('me', 123, 'me@mail.com');

            expect(employee.getName()).toEqual('me');
        })

        it("should return id via getId()", () => {
            const employee = new Employee('me', 123, 'me@mail.com');

            expect(employee.getId()).toEqual(123);
        })

        it("should return email via getEmail()", () => {
            const employee = new Employee('me', 123, 'me@mail.com');

            expect(employee.getEmail()).toEqual('me@mail.com');
        })

        it("should return role via getRole()", () => {
            const employee = new Employee('me', 123, 'me@mail.com');

            expect(employee.getRole()).toBe("Employee");
        })
    })
})