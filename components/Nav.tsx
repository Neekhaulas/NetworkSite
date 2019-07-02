import Link from 'next/link';
import User from './User';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt, faUser, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavLink = styled.a`
  display: inline-block;
  color: white;
  padding: 20px;
  line-height: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    background-color: grey;
  }
`;

const NavBlock = styled.div`
  display: inline-block;
`;

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
      <NavBlock>
        <Link href="/trending">
          <NavLink><FontAwesomeIcon icon={faFireAlt} /> Trending</NavLink>
        </Link>
        <Link href="/upload">
          <NavLink><FontAwesomeIcon icon={faCloudUploadAlt} /> Upload</NavLink>
        </Link>
        {me && (
          <>
            <Link href="/me">
              <NavLink><FontAwesomeIcon icon={faUser} /> Account</NavLink>
            </Link>
            <Logout />
          </>
        )}
        {!me && (
            <>
                <Link href="/login">
                    <NavLink><FontAwesomeIcon icon={faUser} /> Log in</NavLink>
                </Link>
            </>
        )}
      </NavBlock>
    )
    }}
  </User>
);

export default Nav;