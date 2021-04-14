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
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <>
    <AuthState>
      <PodcastState>
        <Router>
          <Header />
          <Container fluid>
            <Switch>
              <PrivateRoute path="/search" component={SearchResultsView}/>
              <PrivateRoute path="/podcast" component={PodcastView}/>
              <PrivateRoute path="/profile" component={ProfileView}/>
              <PrivateRoute path="/rankings" component={RankingsView}/>
              <PrivateRoute path="/recommendations" component={RecommendationsView}/>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/" component={Home}/>
            </Switch>
          </Container>
        </Router>
      </PodcastState>
    </AuthState>
    </>
  );
}

export default App;
