import {
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './App.css';

import AuthState from './context/auth/AuthState';

import {
  Home,
  PodcastView,
  ProfileView,
  RankingsView,
  RecommendationsView,
  SearchResultsView,
  Login
} from './views';
import Header from './components/Header';
import PodcastState from './context/podcast/PodcastState';

const App = () => {
  return (
    <>
    <Header />
    <AuthState>
      <PodcastState>
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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </Router>
      </PodcastState>
    </AuthState>
    </>
  );
}

export default App;
