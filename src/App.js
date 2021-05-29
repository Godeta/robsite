import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import Post from "./components/Post";
import Project from "./components/Project";
import NotFoundPage from "./components/NotFoundPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

/**
 * Gère toute notre application 
 * Insère donc la barre de navigation en haut de chaque pages.
 * Le routage pour relier l'adresse aux pages correspondantes
 * @returns 
 */
function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={About} path='/about' />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={Post} path='/post' />
        <Route component={Project} path='/project' />
        <Route component={NotFoundPage} path='*' />
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
