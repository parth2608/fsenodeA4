/**
* @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
* to integrate with MongoDB
*/
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
* @class DislikeDao Implements Data Access Object managing data storage
* of Dislikes
* @property {DislikeDao} dislikeDao Private single instance of DislikeDao
*/
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
    * Creates singleton DAO instance
    * @returns DislikeDao
    */
    public static getInstance = (): DislikeDao => {
        if (DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    };
    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all user documents from users collection
     * that disliked a particular tuit
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the users are retrieved from
     * database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislikeModel to retrieve all tuit documents from tuits collection
     * that were disliked by a particular user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ dislikedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy",
                },
            })
            .exec();

    /**
     * Inserts dislike instance of a particular user on a particular tuit
     * into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });

    /**
     * Retrieves the info whether the user dislikes a tuit from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({ tuit: tid, dislikedBy: uid });

    /**
     * Removes dislike instance of a particular user on a particular tuit
     * from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed from the database
     */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

    /**
     * Retrieves the number of dislikes on a tuit
     * @param {string} tid Tuit's primary key
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({ tuit: tid });
}