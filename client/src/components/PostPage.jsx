import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';

export default function PostPage() {
    const { postslug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await fetch(`/api/post/getposts?slug=${postslug}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await res.json();
                if (data.posts.length === 0) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setPost(data.posts[0]);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postslug]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?limit=3`);
                if (!res.ok) {
                    throw new Error('Failed to fetch recent posts');
                }
                const data = await res.json();
                setRecentPosts(data.posts);
            } catch (error) {
                console.log(error.message); // Handle error gracefully (e.g., display toast message)
            }
        };
        fetchRecentPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size='xl' />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">Failed to load post. Please try again later.</p>
            </div>
        );
    }

    return (
        <main className='flex flex-col max-w-6xl mx-auto min-h-screen'>
            {post && (
                <>
                <div className="container">

                    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>School - {post.title} Year {post.year}</h1>
                    <h1 className='text-3xl p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>Subject - {post.subject}</h1>
                    <p className='text-xl  text-center font-serif max-w-2xl mx-auto '>Exam - {post.exam}</p>
                    <p className='text-xl  text-center font-serif max-w-2xl mx-auto '>Board - {post.board}</p>
                    <p className='text-xl  text-center font-serif max-w-2xl mx-auto '>Medium - {post.medium}</p>
                  
                </div>
<div className="flex  gap-2">


<Button color='gray' pill size='xs' className='self-center mt-5  font-bold'>Board : {post.board}

</Button>
<Button color='gray' pill size='xs' className='self-center mt-5 font-bold'>Year: {post.year}</Button>



</div>
<p  className=' font-semibold mt-4 text-gray-600'>posted by ~ {post.author}</p>
                      
                  <iframe
                        title="PDF Viewer"
                        className='mt-10 p-3 max-h-[600px] w-full'
                        src={post.pdf}
                        width="100%"
                        height="600"
                    />
                    <div
                        className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                </>
            )}

           
        </main>
    );
}
