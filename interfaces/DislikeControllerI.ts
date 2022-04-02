/**
 * @file the interface of the dislikeController
 */

import {Request, Response} from "express";

export default interface DislikeControllerI {
    findAllUsersThatDislikedTuit(req: Request, res: Response): void;
    findAllTuitsDislikedByUser(req: Request, res: Response): void;
    userDislikesTuit (req: Request, res: Response): void;
    userUndislikesTuit (req: Request, res: Response): void;
    userTogglesTuitDislikes(req: Request, res: Response): void;
}