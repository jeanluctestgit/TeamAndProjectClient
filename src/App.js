import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Authentication/login.component";
import Register from "./components/Authentication/register.component";
import Home from "./components/Home/home.component";
import MemberSpace from './components/MemberSpace/member_space.component';
import Avatar, { ConfigProvider } from "react-avatar";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
    
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Teams And Project
          </Link>
          
          

          {currentUser ? (
            <div className="navbar-nav" style={{width : '100%'}}>
              <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            
          </div>
             <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
             <ul class="navbar-nav ms-auto">

             <li className="nav-item float-end">
            
                <Link to={"/home"} className="nav-link">
                  
                <Avatar name= {JSON.parse(currentUser).username} size="24" round={true} className='me-2' />
                  {JSON.parse(currentUser).username}
                </Link>
              </li>
             <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>

              
               </ul> 
             </div>
             
              
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </nav>

        <div className="" style={{ width : '100%'}}>
          <Switch>
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/home" component={() => <Home   currentUser={currentUser} />} />
            <Route exact path="/register" component={Register} />
            <Route path="/member_space" component={() => <MemberSpace />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
