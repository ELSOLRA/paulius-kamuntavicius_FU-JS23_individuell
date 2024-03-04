
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import Nav from './components/Nav/Nav';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import StatusPage from './pages/StatusPage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/menu'
          element={
            <>
              <Nav />
              <MenuPage />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Nav />
              <AboutPage />
            </>
          }
        />
        <Route
          path='/profile'
          element={
            <>
              <Nav />
              <ProfilePage />
            </>
          }
        />
        <Route path='/status' element={< StatusPage />} />
      </Route>
    )
  )
  return (

    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
