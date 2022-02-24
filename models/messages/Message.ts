/**
 * @file Declares Message data type representing relationship between
 * users, as in user sends a message to another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents message relationship between users,
 * as in a user sends a message to another user
 * @property {string} message Message being send
 * @property {User} to User sending the message
 * @property {User} from User receiving the message
 * @property {Date} sentOn Date the message was sent
 */

export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date
};