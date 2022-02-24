/**
 * @file Implements mongoose Schema for bookmarks
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

/**
 * @typedef Bookmark Represents bookmarks relationship between a user and a tuit,
 * as in a user bookmarks a tuit
 * @property {User} bookmarkedBy User bookmarking the tuit
 * @property {Tuit} bookmarkedTuit Tuit being bookmarked
 */

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"}
}, {collection: "bookmarks"});
export default BookmarkSchema;