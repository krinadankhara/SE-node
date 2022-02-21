/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";


export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;

    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tuid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tuid", BookmarkController.bookmarkController.userUnBookmarksTuit);
            app.get("/api/users/:uid/bookmarked", BookmarkController.bookmarkController.findBookmarkedTuitbyUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}



    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));


    userUnBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnBookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    findBookmarkedTuitbyUser = (req: Request, res: Response) =>
            BookmarkController.bookmarkDao.findBookmarkedTuit(req.params.uid)
                .then(bookmarks => res.json(bookmarks));
};