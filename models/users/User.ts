/**
 * @file Declares User data type
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

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
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};