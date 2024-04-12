'use client';

import { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import { useParams, useSearchParams } from 'next/navigation';

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const user_id = params.id.toString();
  const searchParams = useSearchParams();
  const username = searchParams.get('name');

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${user_id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={posts}
    />
  );
};

export default MyProfile;
