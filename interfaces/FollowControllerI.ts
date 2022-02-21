import {Request, Response} from "express";

export default interface FollowControllerI {
        userFollowsUser (req: Request, res: Response): void;
        userUnFollowsUser (req: Request, res: Response): void;
        findUsersFollowedByUser (req: Request, res: Response): void;
        findUsersFollowingUser (req: Request, res: Response): void;
}