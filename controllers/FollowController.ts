import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

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

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follow => res.json(follow));


    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));

    findUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    findUsersFollowingUser = (req: Request, res: Response) =>
        FollowController.followDao.findUsersFollowingUser(req.params.uid)
            .then(follows => res.json(follows));
};