import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { makeAnimate } from '../../module-pokemon/services/redux';
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../module-pokemon/constants';
import SearchInput from '../SearchInput';
import { useSearchParameters } from '../../hooks';
import useWindowSize from "./hook";

const Header = () => {
  const header = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { handleSearchTextChange, searchText } = useSearchParameters();

  const handleScroll = (offset: any) => {
    if (offset > 10 || offset > 10) {
      header?.current?.classList.add('active');
    } else {
      header?.current?.classList.remove('active');
    }

    if ((document.body.scrollTop > 200 && document.body.scrollTop < 1000) || (offset > 200 && offset < 1000)) {
      dispatch(makeAnimate(true));
    } else {
      dispatch(makeAnimate(false));
    }
  };

  useEffect(() => {
    const onScroll = () => handleScroll(window.pageYOffset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [slider, setSlider] = useState(false);
  const size:any = useWindowSize();
  const fakeProps = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    }
  ];

  console.log('size?.width', size);
  

  return (
    <>
     <header>
     <nav  style={{
          display: slider || size?.width > 980 ? "none" : "",
        }}>
        <a
          href="#"
          className="sidenav-trigger"
          onClick={() => setSlider(s => !s)}
        >
          <i className="material-icons">menu</i>
        </a>
      </nav>
      <div
        className="sidenav-overlay"
        onClick={() => setSlider(s => !s)}
        style={{
          display: slider && size?.width < 980 ? "block" : "none",
          opacity: "1"
        }}
      />
      
      <ul
        id="slide-out"
        className="sidenav"
        style={{
          transform: slider || size?.width > 980 ? "translateX(0%)" : "",
          transitionProperty: "transform",
          transitionDuration: ".25s"
        }}
      >
       <li><div className="user-view">
            <div className="background">
              <img src="https://materializecss.com/images/office.jpg" />
            </div>
            <a href="#user"><img className="circle" src="../img/avt2.jpg" /></a>
            <a href="#name"><span className="white-text name">Nguyễn Đăng Hiếu</span></a>
            <a href="#email"><span className="white-text email">meiiforjob@gmail.com</span></a>
          </div></li>
        <li><a target="_blank" href="https://www.linkedin.com/in/nguyen-dang-hieu-1975921b1/"><i className="material-icons">cloud</i>Linkedin</a></li>
        <li><a target="_blank" href="https://github.com/hieu1999xl">Github</a></li>
        <li><a target="_blank" href="https://hieu1999xl.github.io/html/">My website (pure html css)</a></li>
        <li><div className="divider" /></li>
        <li><NavLink className="waves-effect"
              to="/"
            >
              Home Page
            </NavLink></li>
            <li><NavLink className="waves-effect"
              to={`/${ROUTES.MY_POKEMON}`}
            >
              My Pokemon
            </NavLink></li>
      </ul>
      
      </header>
    </>
  );
};

export default Header;
