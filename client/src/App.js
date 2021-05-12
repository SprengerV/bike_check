import logo from './logo.svg';
import './App.css';
import AuthenticationButton from './Components/authenticationButton';
import logo from "../images/bike-check-logo"

function App() { 
  return (
    <div className="App">
      <nav className="navBar navbar-expand-lg">
        <img src={logo}/>
      </nav>
      <AuthenticationButton/>
    </div>
  );
}

export default App;
