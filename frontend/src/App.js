import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';
import {
  Home,
  PodcastView,
  ProfileView,
  RankingsView,
  RecommendationsView,
  SearchResultsView,
  Signin
} from './views';
import Header from './components/Header';

const App = () => {
  return (
    <>
    <Header />
    <Router>
      <Container fluid>
        <Switch>
          <Route path="/search">
            <SearchResultsView />
          </Route>
          <Route path="/podcast">
            <PodcastView />
          </Route>
          <Route path="/profile">
            <ProfileView />
          </Route>
          <Route path="/rankings">
            <RankingsView />
          </Route>
          <Route path="/recommendations">
            <RecommendationsView />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
    </>
  );
}

export default App;
