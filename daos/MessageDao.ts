/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */

export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    userSendsMessageToUser = async (uid1: string, uid2: string, message: Message): Promise<Message> =>
            MessageModel.create({...message, from: uid1, to: uid2});


    /**
     * Uses MessageModel to retrieve all follow documents from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages sent by a user are retrieved from
     * database
     */

    findAllMessagesSentByUser = async (uid1: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid1});

    /**
     * Uses MessageModel to retrieve all follow documents from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages received by a user are retrieved from
     * database
     */

    findAllMessagesReceivedByUser = async (uid1: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid1});

    /**
     * Removes message instance from the database.
     * @param {string} mid Represents id of message to be deleted
     * @returns Promise To be notified when message instance is removed from the database
     */

    userDeletesMessage = async (mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}