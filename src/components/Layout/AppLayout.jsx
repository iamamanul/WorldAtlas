import { Outlet } from "react-router-dom";
import { Footer } from "../UI/Footer";
import { Headers } from "../UI/Headers";
import { Navbar } from './Navbar';

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};