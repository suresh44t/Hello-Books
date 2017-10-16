import React from 'react';
import {
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import hbLogo from '../images/h-b-logo.svg';

import Hamburger from './Hamburger';
import Navbar from './Navbar';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: {}
    };
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const username = user.username;
    return (
      <div className="layout--header">
        <header className="header">
          <div className="container">
            <div className="header--inner">
              <div className="row vertical-align">
                <div className="col-lg-2 col-md-2">
                  <div className="header--logo q_logo">
                    <Link to="/">
                      <div dangerouslySetInnerHTML={{ __html: hbLogo }} />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10">
                  {isAuthenticated && <Navbar
                    username={username}
                  />}
                </div>
              </div>
            </div>
          </div>
          {isAuthenticated && <Hamburger />}
        </header>
      </div >
    );
  }
}
Header.propTypes = {
  auth: PropTypes.object.isRequired,
  // isAuthenticated: PropTypes.object,
  // user: PropTypes.object
};
Header.defaultProps = {
  isAuthenticated: null,
  user: null
};
/**
 *
 * @param {*} state
 * @return {*} prop assigned to value of state
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Header);
