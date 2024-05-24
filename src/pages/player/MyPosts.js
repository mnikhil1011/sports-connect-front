import { useNavigate } from 'react-router-dom';
import MypostDisplay from '../../components/player/MypostDisplay';
import { useEffect, useState } from 'react';
import axios from 'axios';
const MyPosts = () => {
  const navigate = useNavigate();
  const [playerPosts, setPlayerPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [skill, setSkill] = useState('');
  const [description, setDescription] = useState('');
  const [sport, setSport] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');
  const [playerInfo, setPlayerInfo] = useState('');
  const [errDisplay, setErrDisplay] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPostFlag, setNewPostFlag] = useState(false);
  const fetchPlayerPosts = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/allplayerpost`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const json = response.data;
        setPlayerPosts(json);
      } else {
        console.log('Error fetching player posts:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching player posts:', error);
    }
  };

  useEffect(() => {
    fetchPlayerPosts();
  }, []);
  useEffect(() => {
    fetchPlayerPosts();
  }, [newPostFlag]);
  // let playerInfo = null;

  const fetch_info = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/profile/info`,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error fetching player info:', error);
      throw new Error('Failed to fetch player info. Please try again later.');
    }
  };

  const addPlayerPost = async (e) => {
    e.preventDefault();
    // console.log('before the commit im here');
    try {
      // Fetch playerInfo
      const playerInfo = await fetch_info();

      if (!playerInfo.location) {
        alert('Please complete your profile');
        return navigate('/player/player-profile');
      }
      // console.log('after fetch info im here', playerInfo);
      // Create new post object with playerInfo
      const newPost = {
        title,
        skill,
        description,
        sport,
        quantity,
        location,
        playerInfo,
      };
      // console.log('New Post:before the commit ', newPost);
      // Send POST request to create player post
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/playerpost/create`,
        newPost,
        {
          headers,
        }
      );
      // console.log(response.status);
      if (response.status >= 200 && response.status < 300) {
        const createdPost = response.data;
        setPlayerPosts((prevPosts) => [...prevPosts, createdPost]);
        console.log('im here');
        setTitle('');
        setDescription('');
        setSport('');
        setQuantity(0);
        setErrDisplay('');
        setLocation('');
        fetchPlayerPosts();
        setSkill();
        const a = !newPostFlag;
        setNewPostFlag(a);
      } else {
        const errorData = response.data;
        console.log(errorData);
        setErrDisplay(errorData.error);
      }
    } catch (error) {
      setErrDisplay(error.response.data.error);
    }
  };

  const goToPlayerPlayer = () => {
    navigate('/player/playerplayer');
  };
  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
    <div>
      <div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className='btn btn-primary' onClick={toggleFormVisibility}>
            {showForm ? 'Hide' : 'Add Post'}
          </button>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button className='btn btn-primary' onClick={goToPlayerPlayer}>
              Back
            </button>
          </div>
        </div>

        {showForm && ( // Render the form only if showForm is true
          <div
            className='card mx-2 my-2'
            style={{
              width: '45rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '20px', // Added margin-bottom
            }}
          >
            <div className='card-body'>
              <h2 style={{ textAlign: 'center' }}>Add Player Post</h2>
              <form
                style={{ maxWidth: '500px', margin: '0 auto' }}
                onSubmit={addPlayerPost}
              >
                <div className='form-group'>
                  <label>Title</label>
                  <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='form-control'
                    placeholder='Enter Title'
                  />
                </div>

                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='form-control'
                    rows='3'
                    placeholder='Enter Description'
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label>Sport</label>

                  <select
                    type='text'
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className='form-control'
                    placeholder='Enter Sport'
                  >
                    <option value=''>Select Sport</option>
                    <option value='Football'>Football</option>
                    <option value='Basketball'>Basketball</option>
                    <option value='Tennis'>Tennis</option>
                    <option value='Swimming'>Swimming</option>
                    <option value='Badminton'>Badminton</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='skill'>Skill</label>
                  <select
                    id='skill'
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className='form-control'
                    required // Add the required attribute to ensure HTML5 form validation
                  >
                    <option value=''>Select Skill</option>
                    <option value='Beginner'>Beginner</option>
                    <option value='Intermediate'>Intermediate</option>
                    <option value='Advanced'>Advanced</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label>Patner Require</label>
                  <input
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className='form-control'
                    placeholder='Enter Number of patner require'
                  />
                </div>
                <div className='form-group'>
                  <label>Court:</label>
                  <input
                    type='text'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className='form-control'
                    placeholder='Enter Location'
                  />
                </div>
                <button type='submit' className='btn btn-primary'>
                  Add
                </button>
              </form>

              {errDisplay && <p>{errDisplay}</p>}
            </div>
          </div>
        )}

        <h2 className='player_player_heading ' style={{ textAlign: 'center' }}>
          Posts
        </h2>

        <div className='my_post-grid-container'>
          <div className='my_post-grid-container'>
            {playerPosts &&
              playerPosts.map((post, index) => (
                <div
                  key={post._id}
                  className='my_post-grid-item'
                  style={{ marginLeft: index % 4 !== 0 ? '2px' : '0' }}
                >
                  <MypostDisplay
                    playerPosts={playerPosts}
                    setPlayerPosts={setPlayerPosts}
                    playerPost={post}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
