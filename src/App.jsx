import { Outlet } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from './contexts/AuthContext';
import MainNavbar from './components/Navbar/MainNavbar';
import MainSideNavbar from './components/SideNavbar/SideNavbar';
import MainBreadcrumbs from './components/Breadcrumbs/MainBreadcrumbs';
import { IconContext } from 'react-icons';
import { router } from './routes/routes';

function App() {
  return (
    <NextUIProvider>
      <IconContext.Provider value={{ className: 'global-class-name' }}>
        <MainNavbar />
        <MainSideNavbar />
        <div className="ml-64 p-5">
          <MainBreadcrumbs />
          <Outlet routes={router} />
        </div>
      </IconContext.Provider>
    </NextUIProvider>
  );
}

export default App;
