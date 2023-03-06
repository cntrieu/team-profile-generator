const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    describe("Initialization", () => {
        it("should create an object from extends from Employee constructor with name, id, email and github", () => {

            const engineer = new Engineer('me', 123, 'me@mail.com', "cn@github.com");

            expect(engineer.name).toEqual('me');
            expect(engineer.id).toEqual(123);
            expect(engineer.email).toEqual('me@mail.com');
            expect(engineer.github).toEqual("cn@github.com")
        })
    })

    describe("Methods", () => {
        it("should return github account via github()", () => {
            const engineer = new Engineer('me', 123, 'me@mail.com', "cn@github.com");

            expect(engineer.getGithub()).toBe("cn@github.com")
        })

        it("should return role via getRole()", () => {
            const engineer = new Engineer('me', 123, 'me@mail.com', "cn@github.com");

            expect(engineer.getRole()).toBe("Engineer");
        })
    })
})