import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
const MypostDisplay = ({ playerPost, setPlayerPosts, playerPosts }) => {
  // console.log(`playerpost:`, playerPost);
  // console.log(`playerposts:`, playerPosts);
  const [postRequests, setpostRequests] = useState([]);
  const [flag1, setflag1] = useState(false);
  const [acceptflag1, setacceptflag1] = useState(false);
  const [rejectflag1, setrejectflag1] = useState(false);
  const [postAccept, setpostAccept] = useState([]);
  const [playerreject, setplayerreject] = useState([]);
  // const [1postAccept, 1setpostAccept] = useState([]);
  const [sflag1, setsflag1] = useState(false);

  //delete post
  const deletePlayerPost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_URL}api/playerpost/delete`,
        {
          data: playerPost,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = response.data;

      if (response.status >= 200 && response.status < 300) {
        // console.log(json);
        // Remove the deleted post from the local state
        const updatedPlayerPosts = playerPosts.filter(
          (post) => post._id !== playerPost._id
        );
        setPlayerPosts(updatedPlayerPosts);
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.error('Error deleting player post:', error.message);
    }
  };

  //all req in a post
  const Getrequestonpost = async (e) => {
    e.preventDefault();

    try {
      // console.log(`request`);
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/Getrequestonpost/${playerPost._id}`,
        {
          headers,
        }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch data');
      }

      const json = response.data;
      setpostRequests(json);
      setflag1(true);
      // console.log(postRequests);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const Getrequestonpost1 = async () => {
    try {
      console.log(`request`);
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/playerpost/Getrequestonpost/${playerPost._id}`,
        {
          headers,
        }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch data');
      }

      const json = response.data;
      setpostRequests(json);
      //setflag1(true);
      // console.log(postRequests);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  useEffect(() => {
    getStatusColor();
    Getrequestonpost1();
  }, [acceptflag1, rejectflag1]);
  useEffect(() => {
    getStatusColor();
    Getrequestonpost1();
  }, []);
  //accept a post && reject Remaining
  const acceptRequest = async (req) => {
    try {
      console.log(`Accepted`);
      // console.log(req);
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/playerpost/POSTAccept`,
        req,
        {
          headers,
        }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch data');
      }

      const json = response.data;
      setpostAccept(json);
      setacceptflag1(true);
      console.log(`postAccept`);
      // console.log(postAccept);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const rejectRequest = async (req) => {
    try {
      console.log(`Rejected`);
      // console.log(req);
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/playerpost/POSTREJECT`,
        req,
        {
          headers,
        }
      );

      if (response.status < 200 || response.status > 300) {
        throw new Error('Failed to fetch data');
      }

      const json = response.data;
      // setpostAccept(json);
      // setacceptflag1();
      setplayerreject(json);
      // console.log(playerreject);
      setrejectflag1(true);
      console.log(`postAccept`);
      // console.log(postAccept);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  //time formating
  const formatTimestamp = (timestamp) => {
    const currentTime = new Date();
    const postTime = new Date(timestamp);
    const diff = currentTime - postTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      // If more than a day, show date
      return postTime.toLocaleDateString();
    } else if (hours > 0) {
      // If more than an hour, show hours ago
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      // If more than a minute, show minutes ago
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      // Otherwise, show seconds ago
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };

  // flag1 remove request
  const removerequest = () => {
    setflag1(false);
  };

  // Assuming playerPost.playerInfo is an object containing name and emailID
  // Ensure playerPost.playerInfo exists before destructure
  const name = playerPost.playersInfo?.[0]?.name || 'Name not available';
  const playerLocation =
    playerPost.playersInfo?.[0]?.playerLocation || 'Location not available';

  //color of status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'yellow'; // Adjust color as needed
      case 'accepted':
        return 'green'; // Adjust color as needed
      case 'rejected':
        return 'red'; // Adjust color as needed
      default:
        return 'black'; // Default color
    }
  };

  // console.log(playerPost);
  return (
    <>
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
          <h5
            className='card-title'
            style={{
              marginBottom: '10px',
              fontSize: '1.25rem',
              fontWeight: 'bold',
            }}
          >
            {playerPost.title}
          </h5>
          <h6
            className='card-subtitle mb-2 text-muted'
            style={{ fontSize: '0.9rem' }}
          >
            Description: {playerPost.description}
          </h6>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Name: {name}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Sports: {playerPost.sport}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Skill: {playerPost.skill}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Number of Openings: {playerPost.quantity}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            Court: {playerPost.location}
          </p>
          <p className='card-text' style={{ marginBottom: '5px' }}>
            City: {playerLocation}
          </p>
          <p>Posted: {formatTimestamp(playerPost.createdAt)}</p>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className='btn btn-danger'
              onClick={deletePlayerPost}
              style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
            >
              Delete
            </button>
            {!flag1 && (
              <button
                className='btn btn-primary'
                onClick={Getrequestonpost}
                style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
              >
                Requests
              </button>
            )}
            {flag1 && (
              <button
                className='btn btn-primary'
                onClick={removerequest}
                style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
              >
                Hide Request
              </button>
            )}
          </div>
        </div>
      </div>
      {flag1 && (
        <div className='request_post_table-container'>
          {postRequests.map((req, index) => (
            <div key={index} className='request_post_table-column'>
              <div className='request_post_post-item'>
                <h3>Request {index + 1}</h3>
                <p>Message: {req.message}</p>
                <p className='request_post_player-status'>
                  Status:{' '}
                  <span style={{ color: getStatusColor(req.status) }}>
                    {req.status}
                  </span>
                </p>

                {/* Render player information */}
                {req.playerInfo && (
                  <div className='request_post_player-info'>
                    <h4>Player Information</h4>
                    <p>Name: {req.playerInfo.name}</p>

                    {getStatusColor(req.status) === 'green' && (
                      <>
                        <p>Email: {req.playerInfo.emailID}</p>
                        <p>
                          Mobile Number: {req.playerInfo.mobileNumber}
                          <a
                            href={`https://wa.me/${req.playerInfo.mobileNumber}?text=Hey ${req.playerInfo.name},%0A%0A This is  ${name}.%0AI've accepted your request on Sports-Connect!%0A%0A Sport: ${playerPost.sport}%0A Court: ${playerPost.location}%0A City: ${playerLocation}%0A%0A${req.playerInfo.name} sent this message while requesting: ${req.message}%0A%0ALet's hit the court and have some fun together!`}
                            className='Whatsapp social'
                          >
                            <FontAwesomeIcon icon={faWhatsapp} size='2x' />
                          </a>
                        </p>
                        {req.playerInfo.social_media_links && (
                          <div className='request_post_social-media-links'>
                            <h5>Social Media Links</h5>
                            <div class='social-container'>
                              <a
                                href={
                                  req.playerInfo.social_media_links.facebook
                                }
                                className='facebook social'
                              >
                                <FontAwesomeIcon icon={faFacebook} size='2x' />
                              </a>
                              <a
                                href={req.playerInfo.social_media_links.twitter}
                                className='twitter social'
                              >
                                <FontAwesomeIcon icon={faTwitter} size='2x' />
                              </a>
                              <a
                                href={
                                  req.playerInfo.social_media_links.instagram
                                }
                                className='instagram social'
                              >
                                <FontAwesomeIcon icon={faInstagram} size='2x' />
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Render feedback and ratings */}
                    {/* {req.playerInfo.feedback_and_ratings && (
                      <div className='request_post_feedback-ratings'>
                        <h5>Feedback and Ratings</h5>
                        <p>
                          Reviews:{' '}
                          {req.playerInfo.feedback_and_ratings.reviews.join(
                            ', '
                          )}
                        </p>
                        <p>
                          Ratings: {req.playerInfo.feedback_and_ratings.ratings}
                        </p>
                      </div>
                    )} */}
                  </div>
                )}
                {getStatusColor(req.status) === 'yellow' && (
                  <>
                    <button
                      className='btn btn-primary'
                      onClick={() => acceptRequest(req)}
                      style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
                    >
                      Accept
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => rejectRequest(req)}
                      style={{ fontSize: '0.9rem', padding: '0.3rem 0.75rem' }}
                    >
                      Reject
                    </button>
                    <p>Requested : {formatTimestamp(req.timestamp)}</p>
                  </>
                )}

                {/* {getStatusColor(req.status) === 'green' && (
                  <>
                    <p>
                      {req.status + 'ed'}:{' '}
                      {formatTimestamp(postAccept.timestamp)}
                    </p>
                  </>
                )}
                {getStatusColor(req.status) === 'red' && (
                  <>
                    <p>
                      {req.status + 'ed'}:{' '}
                      {formatTimestamp(rejectRequest.timestamp)}
                    </p>
                  </>
                )} */}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default MypostDisplay;
