'use client';

import { useState, useEffect, Suspense } from 'react';
import PromptCard from './PromptCard';
import Loading from '@app/loading';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
      setIsFetching(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (searchText === '') {
        setFilteredPosts(posts);
      } else {
        const newFilteredPosts = posts.filter(
          (post) =>
            // content search
            post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
            // tag search
            post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
            // creator search
            post.creator.username.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPosts(newFilteredPosts);
      }
    }, 250);
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className='feed'>
      <input
        type='text'
        placeholder='Search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
      />
      {isFetching ? <div className='mt-16 flex-center'>Loading...</div> : <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />}
    </section>
  );
};

export default Feed;
