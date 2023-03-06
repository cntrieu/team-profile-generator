const Manager = require("../lib/Manager");

describe("Manager", () => {
    describe("Initialization", () => {
        it("should create an object from extends from Employee constructor with name, id, email and office number", () => {

            const manager = new Manager('me', 123, 'me@mail.com', 55);

            expect(manager.name).toEqual('me');
            expect(manager.id).toEqual(123);
            expect(manager.email).toEqual('me@mail.com');
            expect(manager.officeNumber).toEqual(55)
        })
    })

    describe("Methods", () => {
        it("should return office number via getOfficeNumber()", () => {
            const manager = new Manager('me', 123, 'me@mail.com', 55);

            expect(manager.getOfficeNumber()).toBe(55)
        })

        it("should return role via getRole()", () => {
            const manager = new Manager('me', 123, 'me@mail.com', 55);

            expect(manager.getRole()).toBe("Manager");
        })
    })
})