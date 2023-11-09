import mongoose from "mongoose";
import Users from "../../src/dao/Users.dao.js";
import chai from 'chai';

const expect = chai.expect;

mongoose.connect(`mongodb+srv://epastranom:150996@pruebacoderhouse.0kezqsj.mongodb.net/Adoptme?retryWrites=true&w=majority`);

describe('Set of tests with Chai', () => {
    before(function () {
        this.Users = new Users();
    });
    beforeEach(function () {
        mongoose.connection.collections.users.drop();
        this.timeout(5000);
    });
    
    it("Dao must return the users in Array format.", async function () {
        const result = await this.Users.get();
        expect(result).to.deep.equal([]);
    });

    it("Dao must add the user correctly to the database.", async function () {
        let mockUser = {
            first_name: "Nombre",
            last_name: "Apellido",
            email: "correo@gmail.com",
            password: "123456"
        };
        const result = await this.Users.save(mockUser);

        expect(result).to.be.an('object');
        expect(result._id).to.exist;
    });
});