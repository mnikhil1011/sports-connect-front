import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StarredListDisplay from '../../components/player/StarredListDisplay';
import axios from 'axios';
const StarredPosts = () => {
  const navigate = useNavigate();
  const [starredPostIds, setStarredPostIds] = useState([]);

  const gotoplayerplayer = () => {
    navigate('/player/playerplayer');
  };

  useEffect(() => {
    const getStarredPosts = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        const headers = {
          Authorization: token,
        };
        // Fetch starred post IDs from the server
        const response = await axios.get(
          `${process.env.REACT_APP_URL}api/player/starred`,
          {
            headers,
          }
        );
        const starredPostIds = response.data;

        // Fetch post data based on the retrieved post IDs
        const postDataResponse = await axios.post(
          `${process.env.REACT_APP_URL}api/playerpost/getpostsbyids`,
          { postIds: starredPostIds },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const starredPostsData = postDataResponse.data;

        // Update state with fetched post data
        setStarredPostIds(starredPostsData);
        // console.log('starredPostsData:', starredPostsData);
      } catch (error) {
        console.error('Error fetching starred posts:', error);
      }
    };

    getStarredPosts();
  }, []);

  return (
    <div>
      <div className='star-star-container'>
        <button onClick={gotoplayerplayer}>GO back</button>
        <h2>Your Starred Posts</h2>
        {starredPostIds.length > 0 ? (
          <div>
            {starredPostIds.map((post) => (
              <StarredListDisplay
                key={post._id}
                playerPost={post}
                playerPosts={starredPostIds}
                setPlayerPosts={setStarredPostIds}
              />
            ))}
          </div>
        ) : (
          <h4>No starred posts found.</h4>
        )}
      </div>
    </div>
  );
};

export default StarredPosts;
