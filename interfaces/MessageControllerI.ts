import {Request, Response} from "express";

/**
* @file Declares API for Messages related data access object methods
*/

export default interface MessageControllerI {
    userSendsMessageToUser (req: Request, res: Response): void;
    findAllMessagesSentByUser (req: Request, res: Response): void;
    findAllMessagesReceivedByUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
};