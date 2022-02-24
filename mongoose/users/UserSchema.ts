/**
 * @file Implements mongoose Schema for users
 */
import mongoose from "mongoose";
import User from "../../models/users/User";

/**
 * @typedef User Represents a user
 * @property {id} id Represents id of user
 * @property {string} username Represents name of user
 * @property {string} password Password of the user
 * @property {string} firstName the first name of the user
 * @property {string} lastName the last name of the user
 * @property {string} email the email of the user
 * @property {string} profilePhoto the profile photo of the user
 * @property {string} headerImage the headerImage of the user
 * @property {string} biography the biography of the user
 * @property {Date} dateOfBirth the date of birth of the user
 * @property {AccountType} accountType the account type of the user
 * @property {MaritalStatus} maritalStatus the status of the user
 * @property {Location} location the location of the user
 * @property {number} salary the Salart of the user
 */
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    biography: String,
    dateOfBirth: Date,
    accountType: {type: String, enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"]},
    maritalStatus: {type: String, enum: ["MARRIED", "SINGLE", "WIDOWED"]},
    location: {
        latitude: Number,
        longitude: Number
    },
    salary: {type: Number, default: 50000}
}, {collection: "users"});

export default UserSchema;