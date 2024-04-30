import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useState } from 'react';
import { useEffect } from 'react';

function Main({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });
  const changeTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", JSON.stringify(newTheme));
      return newTheme;
    });
  };
  useEffect(() => {
    document.body.setAttribute("data-theme", `${isDark ? "dark" : ""}`);
    localStorage.setItem("theme", JSON.stringify(isDark));
  }, [isDark]);
  return (
    <>
      <Header changeTheme={changeTheme} isDark={isDark}/>
      <main>{children}</main>
      <Footer />
    </>
  );
}

export const withLayout = (Component) => 
  function wLC(props) {
    return (
      <Main>
        <Component {...props} />
      </Main>
    );
  }