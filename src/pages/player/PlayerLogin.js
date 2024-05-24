import { useNavigate, Link } from 'react-router-dom';
// import { useState } from 'react';
import { useState, useEffect } from 'react';
import { FlagState } from '../../context/FlagProvider';
import axios from 'axios';
import {
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  // useToast,
} from '@chakra-ui/react';

const PlayerLogin = () => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [errDisplay, seterrDisplay] = useState('');
  const navigate = useNavigate();

  const { Loginflag, setLoginflag } = FlagState();

  const LoginFormSubmit = async (e) => {
    e.preventDefault();
    const user = { emailID, password };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}api/player/login`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        const { token } = response.data;
        axios.defaults.headers.common['Authorization'] =
          token.length > 0 ? token : '';

        // printAxiosHeaders();

        console.log('Frontend token:', token);
        localStorage.setItem('auth-token', token);
        setLoginflag(1);

        return navigate('/player/home');
      } else {
        console.error('Error:', response.data.error);
        seterrDisplay(response.data.error);
        setTimeout(() => {
          seterrDisplay('');
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.error);
      console.error('Error:', error.message);
      seterrDisplay(error.response.data.error);
      setTimeout(() => {
        seterrDisplay('');
      }, 2000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setLoginflag(1);
    }
  }, []);
  return (
    <div>
      <VStack spacing={2}>
        <FormControl onSubmit={LoginFormSubmit}>
          <FormLabel>Email address</FormLabel>
          <Input
            value={emailID}
            onChange={(e) => setEmailID(e.target.value)}
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            name='password'
            placeholder='Enter password'
          />
        </FormControl>

        <Button
          width='100%'
          colorScheme='blue'
          style={{ marginTop: 15 }}
          type='submit'
          onClick={LoginFormSubmit}
        >
          Login
        </Button>

        <div>{errDisplay && <p>{errDisplay}</p>}</div>
        {/* 
        <Link className='btn btn-primary' to='/' role='button'>
          Back
        </Link> */}
      </VStack>
    </div>
  );
};

export default PlayerLogin;
