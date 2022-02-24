/**
 * @file Implements mongoose Schema for tuits
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../../models/tuits/Tuit";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit Tuit Represents the tuit
 * @property {User} postedBy Represents the user
 * @property {Date} postedOn the date on which the tuit is posted
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: "tuits"});
export default TuitSchema;