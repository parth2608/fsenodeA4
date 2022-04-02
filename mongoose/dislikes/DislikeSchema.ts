/**
 * @file implements the data model to represent likes in the database
 */

import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

const DislikeSchema = new mongoose.Schema<Dislike>({
        tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
        dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
},{ collection: "dislikes" });
export default DislikeSchema;