/**
 * @file Declares Tuit data type
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Tuit Represents the tuit
 * @property {User} postedBy Represents the user
 * @property {Date} postedOn the date on which the tuit is posted
 */

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};