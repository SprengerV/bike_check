
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import NavbarMain from './Components/NavbarMain';
import Post from './Components/Post';

function App() {

  return (
    <Router>
     <NavbarMain />
     <Route exact path="/" component={Post} />
    </Router>
  );
}

export default App;
