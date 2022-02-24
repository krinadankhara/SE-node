/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import FollowDaoI from "../interfaces/FollowDaoI";
import express from "express";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */

    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Inserts follow instance into the database
     * @param {string} uid1 Represents id of user 1
     * @param {string} uid2 Represents id of user 2
     * @returns Promise To be notified when follow instance is inserted into the database
     */


    userFollowsUser = async (uid1: string, uid2: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid2, userFollowing: uid1});

    /**
     * Removes follow instance from the database.
     * @param {string} uid1 Primary key of user 1
     * @param {string} uid2 Primary key of user 2
     * @returns Promise To be notified when follow instance is removed from the database
     */

    userUnFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid2, userFollowing: uid1});

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users followed by a user are retrieved from
     * database
     */

    findUsersFollowedByUser = async (uid: String): Promise<Follow[]> =>
        FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();

    /**
     * Uses FollowModel to retrieve all follow documents from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the users following the user are retrieved from
     * database
     */

    findUsersFollowingUser = async (uid: string): Promise<Follow[]> =>
         FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();



};

