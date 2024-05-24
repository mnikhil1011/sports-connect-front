// edit profile to
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Select,
  Text,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    gaming_statistics: [],
    communication_preferences: {
      preferred_language: '',
    },
    social_interactions: {
      bio: '',
      interests: [],
      facebook: '',
      social_media_links: {
        facebook: '',
        instagram: '',
        twitter: '',
      },
    },
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
      };
      const response = await axios.get(
        `${process.env.REACT_APP_URL}api/player/profile`,
        {
          headers,
        }
      );
      const data = response.data;
      setProfileData(data);
      setFormData(data); // Initialize form data with fetched profile data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const handleAddStatistic = () => {
    setFormData({
      ...formData,
      gaming_statistics: [
        ...formData.gaming_statistics,
        { sport: '', skill: '' },
      ],
    });
  };
  const handleDeleteStatistic = (index) => {
    const updatedFormData = [...formData.gaming_statistics];
    updatedFormData.splice(index, 1);
    setFormData({ ...formData, gaming_statistics: updatedFormData });
  };

  // Handle changes in form fields
  const handleChange = (e, index) => {
    // const { name, value } = e.target;
    //   const fieldName = name.split('.')[1]; // Extracting field name from gaming_statistics[index].field_name
    //   const updatedStats = [...formData.gaming_statistics];
    //   updatedStats[index][fieldName] = value;
    let new_data = formData.gaming_statistics;
    new_data[index].sport = e.target.value;
    setFormData({ ...formData, gaming_statistics: new_data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Check if any game statistic has empty sport or skill
    const hasEmptyField = formData.gaming_statistics.some(
      (stat) => !stat.sport || !stat.skill
    );

    if (hasEmptyField) {
      // setError('Please select sport and skill for all game statistics.');
      alert('Please select sport and skill for all game statistics.');
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('auth-token');
      const headers = {
        Authorization: token,
        'Content-Type': 'application/json',
      };
      const response = await axios.put(
        `${process.env.REACT_APP_URL}api/player/updateProfile`,
        formData,
        {
          headers,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        // Redirect to player profile page
        return navigate('/player/player-profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setError(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };
  const sportList = [
    'Football',
    'Basketball',
    'Tennis',
    'Swimming',
    'Badminton',
  ];
  return (
    <VStack spacing={4} align='flex-start'>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <Heading as='h1' size='lg'>
          Edit Profile
        </Heading>
        {loading ? (
          <Text>Loading profile...</Text>
        ) : error ? (
          <Text color='red.500'>{error}</Text>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                name='name'
                value={formData.name || ''}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type='text'
                name='location'
                value={formData.location || ''}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                }}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Gaming Statistics
            </Heading>
            {
              //</EditGameStatDisplay >
              //formData.gaming_statistics.map((game,index))

              formData.gaming_statistics.map((stat, index) => (
                <div key={index}>
                  <FormLabel>Game {index + 1}</FormLabel>
                  <FormControl>
                    <FormLabel>Sport</FormLabel>
                    <Select
                      type='text'
                      name={stat.sport}
                      value={stat.sport || ''}
                      onChange={(e) => {
                        let new_data = formData.gaming_statistics;
                        new_data[index].sport = e.target.value;
                        setFormData({
                          ...formData,
                          gaming_statistics: new_data,
                        });
                      }}
                    >
                      <option value=''>Sport</option>
                      <option value='Football'>Football</option>
                      <option value='Basketball'>Basketball</option>
                      <option value='Tennis'>Tennis</option>
                      <option value='Swimming'>Swimming</option>
                      <option value='Badminton'>Badminton</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Skill</FormLabel>
                    <Select
                      name={stat.skill}
                      value={stat.skill || ''}
                      onChange={(e) => {
                        let new_data = formData.gaming_statistics;
                        new_data[index].skill = e.target.value;
                        setFormData({
                          ...formData,
                          gaming_statistics: new_data,
                        });
                      }}
                    >
                      <option value=''>select Skill</option>
                      <option value='Beginner'>Beginner</option>
                      <option value='Intermediate'>Intermediate</option>
                      <option value='Advanced'>Advanced</option>
                    </Select>
                  </FormControl>
                  <Button onClick={() => handleDeleteStatistic(index)}>
                    Delete
                  </Button>
                  <Divider />
                </div>
              ))
            }
            <Button onClick={handleAddStatistic}>Add Gaming Statistic</Button>
            {/* <Divider />
            {formData.gaming_statistics.length === 0 && (
              <Button onClick={handleAddStatistic}>Add Gaming Statistic</Button>
            )} */}
            <Divider />
            <Heading as='h2' size='md'>
              Communication Preferences
            </Heading>
            <FormControl>
              <FormLabel>Preferred Language</FormLabel>
              <Input
                type='text'
                name='communication_preferences.preferred_language'
                value={formData.communication_preferences.preferred_language}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    communication_preferences: {
                      preferred_language: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
            <Divider />
            <Heading as='h2' size='md'>
              Social Interactions
            </Heading>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Input
                type='text'
                name='social_interactions.bio'
                value={formData.social_interactions.bio}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    social_interactions: {
                      ...formData.social_interactions,
                      bio: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Facebook</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.facebook'
                value={
                  formData?.social_interactions?.social_media_links?.facebook
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    social_interactions: {
                      ...formData.social_interactions,
                      social_media_links: {
                        ...formData.social_interactions.social_media_links,
                        facebook: e.target.value,
                      },
                    },
                  });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Instagram</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.twitter'
                value={
                  formData?.social_interactions?.social_media_links?.instagram
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    social_interactions: {
                      ...formData.social_interactions,
                      social_media_links: {
                        ...formData.social_interactions.social_media_links,
                        instagram: e.target.value,
                      },
                    },
                  });
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Twitter</FormLabel>
              <Input
                type='text'
                name='social_interactions.social_media_links.instagram'
                value={
                  formData?.social_interactions?.social_media_links?.twitter
                }
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    social_interactions: {
                      ...formData.social_interactions,
                      social_media_links: {
                        ...formData.social_interactions.social_media_links,
                        twitter: e.target.value,
                      },
                    },
                  });
                }}
              />
            </FormControl>
            <Divider />

            <Button type='submit' colorScheme='blue'>
              Submit
              {/* <a href='/player/player-profile'>Submit</a> */}
            </Button>
          </form>
        )}
      </div>
    </VStack>
  );
};
export default EditProfile;
