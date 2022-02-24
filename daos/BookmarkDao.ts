/**
 * @file Implements DAO managing data storage for bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid Instance to be inserted into the database
     * @param {string} tid Instance to be inserted into the database
     * @returns Promise To be notified when user is inserted into the database
     */

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});

    /**
     * Removes bookmark instance from the database.
     * @param {string} uid Primary key of user
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when bookmark is removed from the database
     */

    userUnBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});

    /**
     * Uses BookmarkModel to retrieve all bookmark documents from bookmarks collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the bookmarked tuits are retrieved from
     * database
     */

    findBookmarkedTuitbyUser = async (uid: string): Promise<Bookmark[]> =>
             BookmarkModel
                 .find({bookmarkedBy: uid})
                 .populate("bookmarkedTuit")
                 .exec();
}