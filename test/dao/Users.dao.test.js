import mongoose from "mongoose";
import Users from "../../src/dao/Users.dao.js";
import assert from "assert";

mongoose.connect(`mongodb+srv://epastranom:150996@pruebacoderhouse.0kezqsj.mongodb.net/Adoptme?retryWrites=true&w=majority`);

describe("Testing Users dao", () => {
    before(function () {
        this.Users = new Users();
    });
    beforeEach(function () {
        mongoose.connection.collections.users.drop();
        this.timeout(5000);
    });

    it("Dao must return the users in Array format.", async function () {
        const result = await this.Users.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it("Dao must add the user correctly to the database.", async function () {
        let mockUser = {
            first_name: "Nombre",
            last_name: "Apellido",
            email: "correo@gmail.com",
            password: "123456"
        };
        const result = await this.Users.save(mockUser);
        console.log(result);

        assert.ok(result._id);
    });

    it("Dao must add to the created user an empty Pets array by default.", async function () {
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "coderhouse@gmail.com",
            password: "123456"
        };
        const result = await this.Users.save(mockUser);
        console.log(result);

        assert.deepStrictEqual(result.pets, []);
    });

    it("Dao can get a user by email", async function () {
        let mockUser = {
            first_name: "Eduardo",
            last_name: "Pastrano",
            email: "coderhouse@gmail.com",
            password: "123456"
        };
        const result = await this.Users.save(mockUser);

        const user = await this.Users.getBy({ email: result.email });
        console.log(user);
        assert.strictEqual(typeof user, 'object');
    });
})