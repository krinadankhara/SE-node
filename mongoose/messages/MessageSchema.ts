/**
 * @file Implements mongoose Schema for messages
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

/**
 * @typedef Message Represents message relationship between users,
 * as in a user sends a message to another user
 * @property {string} message Message being send
 * @property {User} to User sending the message
 * @property {User} from User receiving the message
 * @property {Date} sentOn Date the message was sent
 */

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});
export default MessageSchema;