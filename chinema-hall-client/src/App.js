import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as
    Router,
  Switch,
  Route
} from "react-router-dom";
import { UserAuthProvider } from './Component/contextApi/AuthData/Auth';
import { ExtraDataProvider } from './Component/contextApi/ExtraData/ExtraData';
import Home from './Component/Home/Home';
import Login from './Component/contextApi/AuthData/Login';
import NotFoundPage from './Component/sherComponent/NotFoundPage';
import PrivateRoute from './Component/contextApi/AuthData/PrivateRoute';
import MovieDetails from './Component/sherComponent/MovieDetails';
import MyBook from './Component/MyBook/MyBook';

function App() {
  return (
    <ExtraDataProvider>
      <UserAuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <PrivateRoute exact path="/home">
              <Home />
            </PrivateRoute>

            <PrivateRoute exact path="/my-book-list">
              <MyBook />
            </PrivateRoute>

            {/* <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute> */}

            <Route exact path="/login" component={Login} />;

            <PrivateRoute path="/movie-details/:id">
              <MovieDetails />
            </PrivateRoute>;

            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </UserAuthProvider>
    </ExtraDataProvider>
  );
}

export default App;
