import {errorHandler} from "../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res,next) => {
    

    if(!req.body.year || !req.body.medium || !req.body.board || !req.body.exam || !req.body.title || !req.body.author || !req.body.subject) {
        return next(errorHandler(400,'Please provide the credentials'));
    }
    const slug = (req.body.title+req.body.medium + req.body.exam + req.body.board + req.body.subject)
        .split('')
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,

    });
    try{
        const savedPost  = await newPost.save();
        res.status(200).json(savedPost);

    }
    catch(err){
        next(err);
    }

}


export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        
        // Query object to filter posts based on request parameters
        const query = {
            ...(req.query.author && { userId: req.query.author }),
            ...(req.query.board && { board: req.query.board }),
            ...(req.query.medium && { medium: req.query.medium }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        };

        const posts = await Post.find(query)
            .sort({ year: -1 }) // Sort posts by year in ascending order
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments(query);

        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthPosts = await Post.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};
