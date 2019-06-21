import Link from 'next/link';
import User from './User';
import Logout from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt, faUser, faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'

const Nav = () => (
  <User>
    {({ data }) => {
      const me = data ? data.me : null
      return (
      <div>
        <Link href="/trending">
          <a><FontAwesomeIcon icon={faFireAlt} /> Trending</a>
        </Link>
        <Link href="/upload">
          <a><FontAwesomeIcon icon={faCloudUploadAlt} /> Upload</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Logout />
          </>
        )}
        {!me && (
            <>
                <Link href="/login">
                    <a><FontAwesomeIcon icon={faUser} /> Log in</a>
                </Link>
            </>
        )}
      </div>
    )
    }}
  </User>
);

export default Nav;