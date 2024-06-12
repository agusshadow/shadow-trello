import './App.css'
import { NextUIProvider } from '@nextui-org/react';
import NavbarComponent from './components/navbar/NavbarComponent';

export default function App() {

  return (
    <NextUIProvider>
      <NavbarComponent />
    </NextUIProvider>
  );
}
