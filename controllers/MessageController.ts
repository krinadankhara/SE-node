/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to record that a user sends a message to
 *     another user
 *     </li>
 *     <li>GET /api/users/:uid1/messages/sent to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /api/users/:uid1/messages/received to retrieve all the messages received by a user
 *     </li>
 *     <li>DELETE /api/messages/:mid to record that a user deletes a message
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */


export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */

    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userSendsMessageToUser);
            app.get("/api/users/:uid1/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid1/messages/received", MessageController.messageController.findAllMessagesReceivedByUser);
            app.delete("/api/user/unsends/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid1 representing the user sending the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that were sent
     */

    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid1)
            .then((message: Message[]) => res.json(message));

    /**
     * Retrieves all messages sent to the user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid1 representing the user receiving the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that were received
     */


    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid1)
            .then((message: Message[]) => res.json(message));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is sending the message
     * and the message being sent
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new messages that was inserted in the
     * database
     */


    userSendsMessageToUser = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessageToUser(req.params.uid1, req.params.uid2, req.body)
            .then((message: Message) => res.json(message));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameter mid representing the message that is being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */


    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
};