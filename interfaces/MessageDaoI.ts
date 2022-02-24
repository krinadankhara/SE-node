import Message from "../models/messages/Message";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface MessageDaoI {
    userSendsMessageToUser (uid1: string, uid2: string, message: Message): Promise<Message>;
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    userDeletesMessage (mid: string): Promise<any>;
};