const Intern = require("../lib/Intern");

describe("Intern", () => {
    describe("Initialization", () => {
        it("should create an object from extends from Employee constructor with name, id, email and school", () => {

            const intern = new Intern('me', 123, 'me@mail.com', "University of Toronto");

            expect(intern.name).toEqual('me');
            expect(intern.id).toEqual(123);
            expect(intern.email).toEqual('me@mail.com');
            expect(intern.school).toEqual("University of Toronto")
        })
    })

    describe("Methods", () => {
        it("should return github account via github()", () => {
            const intern = new Intern('me', 123, 'me@mail.com', "University of Toronto");

            expect(intern.getSchool()).toBe("University of Toronto")
        })

        it("should return role via getRole()", () => {
            const intern = new Intern('me', 123, 'me@mail.com', "cn@github.com");

            expect(intern.getRole()).toBe("Intern");
        })
    })
})