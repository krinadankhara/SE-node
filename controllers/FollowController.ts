/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid1/unfollows/:uid2 to record that a user
 *     no longer follows a user
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all the users followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/followers to retrieve all users following a user
 *     </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns FollowController
     */

    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.followController.userUnFollowsUser);
            app.get("/api/users/:uid/following", FollowController.followController.findUsersFollowedByUser);
            app.get("/api/users/:uid/followers", FollowController.followController.findUsersFollowingUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is following the user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unfollowing
     * the other user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */


    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    /**
     * Retrieves all users that are followed by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user followed another users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */

    findUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users that are following a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user beging followed by another users
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */

    findUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowingUser(req.params.uid)
            .then(follows => res.json(follows));
};