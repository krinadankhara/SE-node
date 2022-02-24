/**
 * @file Declares Follow data type representing relationship between
 * users, as in a user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between users,
 * as in a user follows another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following the other User
 */

export default interface Follow {
    userFollowed : User,
    userFollowing : User
};
