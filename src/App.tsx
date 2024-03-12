
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

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
        <Route index element={<HomePage />} />
        <Route path='/status' element={< StatusPage />} />
        <Route
          path='/menu'
          element= {
              <MenuPage />
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
