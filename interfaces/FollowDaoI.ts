import Follow from "../models/follows/Follow";
import User from "../models/users/User";

/**
* @file Declares API for Follows related data access object methods
*/

export default interface FollowDaoI {
    userFollowsUser (uid1: string, uid2: string): Promise<Follow>;
    userUnFollowsUser (uid1: string, uid2: string): Promise<any>;
    findUsersFollowedByUser (uid: string): Promise<Follow[]>;
    findUsersFollowingUser (uid: string): Promise<Follow[]>;
};

