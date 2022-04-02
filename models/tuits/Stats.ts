/**
 * @file implements the data model to represent tuit-stats in the middle tier
 */

export default interface Stats {
    replies?: number,
    retuits: number,
    likes: number,
    dislikes: number
    likedByMe: boolean,
    dislikedByMe: boolean
};