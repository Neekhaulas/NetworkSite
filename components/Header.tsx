import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const Logo = styled.div`
  display: inline-block;
  
  a {
    display: inline-block;
    color: white;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    padding: 20px;
    line-height: 30px;
    height: 30px;
    cursor: pointer;

    &:hover {
      background-color: grey;
    }
  }
  
`;

const StyledHeader = styled.header`
    background-color: #282d3b;
    box-shadow: 0px 0px 5px #000000;
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a><FontAwesomeIcon icon={faChild} /> N Joy</a>
        </Link>
      </Logo>
      <Nav />
    </div>
  </StyledHeader>
);

export default Header;
