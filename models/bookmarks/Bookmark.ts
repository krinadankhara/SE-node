/**
 * @file Declares Bookmark data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */

import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {User} bookmarkedBy User bookmarking the tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 */

export default interface Bookmark {
    bookmarkedBy : User,
    bookmarkedTuit : Tuit
};
