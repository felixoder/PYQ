import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

export default function ICSE() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?board=ICSE`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
        } else {
          throw new Error('Failed to fetch posts');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to trigger fetch only once on component mount


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>School</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Exam</Table.HeadCell>
          <Table.HeadCell>Board</Table.HeadCell>
          <Table.HeadCell>Medium</Table.HeadCell>
          <Table.HeadCell>Year</Table.HeadCell>
          <Table.HeadCell>View Questions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {userPosts.map((post) => (
            <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
             
              <Table.Cell>
                <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                  {post.title}
                </Link>
              </Table.Cell>
              <Table.Cell>{post.subject}</Table.Cell>
              <Table.Cell>{post.exam}</Table.Cell>
              <Table.Cell>{post.board}</Table.Cell>
              <Table.Cell>{post.medium}</Table.Cell>
              <Table.Cell>{post.year}</Table.Cell>
              <Table.Cell>
              <Link
  to={`/post/${post.slug}`}
  className="button button--ghost"
  rel='noopener noreferrer'
>
  View PDF
</Link>

              </Table.Cell>
              {/* Add more Table.Cell components for other fields as needed */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
