import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import Home from './pages/Home';
import PlayerLogin from './pages/player/PlayerLogin';
import PlayerSignup from './pages/player/PlayerSignup';
import PlayerHome from './pages/player/PlayerHome';
import CoachWelcome from './pages/coach/CoachWelcome';
import CoachLogin from './pages/coach/CoachLogin';
import CoachSignup from './pages/coach/CoachSignup';
import CoachHome from './pages/coach/CoachHome';
import AcademyDetailsPage from './pages/academy/AcademyDetailsPage';
import PlayerCoach from './pages/player/PlayerCoach';
import PlayerPlayer from './pages/player/PlayerPlayer';
import AppliedAcademys from './pages/player/AppliedAcademys';
import StarredPosts from './pages/player/StarredPosts';
import PlayerPostDetailsPage from './pages/playerPost/PlayerPostDetailsPage';
import CoachPostDetailsPage from './pages/coachpost/CoachPostDetailsPage';
import MyPosts from './pages/player/MyPosts';
import Mypostscoach from './pages/coach/Mypostscoach';
import Navbar from './pages/Navbar';
import backgroundImage from './pages/backgroundImage.jpg';
import PlayerWelcome from './pages/player/PlayerWelcome';
import About from './pages/About';
import PlayerProfile from './pages/player/PlayerProfile';
import EditProfile from './pages/player/EditProfileform';
import Coachstudent from './pages/coach/Coachstudent';
import Applypost from './pages/player/Applypost';
import CoachProfile from './pages/coach/CoachProfile';
import EditProfileformcoach from './pages/coach/EditProfileformcoach';
// import SocialFollow from './SocialFollow';
// AdMIN

import AdminDashboard from './pages/dashboard/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import CoachUsersComingIn from './charts/CoachUsersComingIn';
import PlayersComingIn from './charts/PlayersUsersComingIn';
function App() {
  return (
    <div>
      <Navbar />
      {/* <SocialFollow /> */}
      <BrowserRouter>
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover', // Ensure the background image covers the entire container
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/player/login' element={<PlayerLogin />} />
            <Route path='/player/signup' element={<PlayerSignup />} />
            <Route path='/player/home' element={<PlayerHome />} />
            <Route path='/player/playercoach' element={<PlayerCoach />} />
            {/* <Route path='/player/applied' element={<AppliedAcademys />} /> */}
            <Route path='/player/playerplayer' element={<PlayerPlayer />} />
            <Route path='/player/myposts' element={<MyPosts />} />
            <Route path='/player' element={<PlayerWelcome />} />
            <Route path='/about' element={<About />} />
            <Route path='/player/player-profile' element={<PlayerProfile />} />
            <Route
              path='/player/player-Edit-profile'
              element={<EditProfile />}
            />
            <Route path='/player/starred' element={<StarredPosts />} />
            <Route
              path='/playerpost/:_id'
              element={<PlayerPostDetailsPage />}
            />
            <Route path='/player/applied' element={<Applypost />} />
            <Route path='/academy/:name' element={<AcademyDetailsPage />} />

            <Route path='/coach' element={<CoachWelcome />} />
            <Route path='/coach/login' element={<CoachLogin />} />
            <Route path='/coach/signup' element={<CoachSignup />} />
            <Route path='/coach/playerCoach' element={<Coachstudent />} />
            <Route path='/coach/home' element={<CoachHome />} />
            <Route path='/coach/myposts' element={<Mypostscoach />} />
            <Route path='/coachpost/:_id' element={<CoachPostDetailsPage />} />
            <Route path='/coach/coach-profile' element={<CoachProfile />} />
            <Route
              path='/coach/coach-Edit-profile'
              element={<EditProfileformcoach />}
            />

            {/* Admin */}
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/login' element={<AdminHome />} />
            <Route
              path='/admin/dashboard/coachuserscomingin'
              element={<CoachUsersComingIn />}
            />
            <Route
              path='/admin/dashboard/playeruserscomingin'
              element={<PlayersComingIn />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
