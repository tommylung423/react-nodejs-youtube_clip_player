import React from 'react';
import { Switch,Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import TopNavBar from './component/Navbar/navbar';
import {RegisterPage} from './component/Register'
import {myLoginForm} from './component/Login'
import {HomePage} from './component/Home';
import PublicRoute from './component/PublicRoute';
import {Provider} from 'react-redux'
import {Testing} from './component/Testing'
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './_helpers/store'
import PrivateRoute from './component/PrivateRoute'
<<<<<<< HEAD
import SongListPage from './component/SongList/SongListPage';
import { PlayPage } from './component/PlayPage/PlayPage';
import ErrorBoundary from './component/ErrorBoundary'
=======


>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
function App() {   

    return (
      <React.Fragment>
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>


        <div className="box">
        <TopNavBar /> 
        <div className="body">
<<<<<<< HEAD

=======
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
        <Switch >               
        <PublicRoute restricted={true} path="/Register"  component={RegisterPage}/>
        <PublicRoute restricted={true} path="/Login" component={myLoginForm}/>
        <PublicRoute restricted={false} path="/Home" component={HomePage}/>
<<<<<<< HEAD
        
        <PrivateRoute path="/test"  component={Testing}   />
        <PrivateRoute path="/songlistpage/:songlist"  component={PlayPage}   />
        <PrivateRoute path="/songlistpage"  component={SongListPage}   />

        <Redirect to="/not-found" />
        </Switch >  


=======
        <PrivateRoute path="/test"  component={Testing}   />
        <Redirect to="/not-found" />
        </Switch >  
>>>>>>> a83ad60a090e58a9f8ed852680bc5625ab544dac
        </div>
        </div>
        </PersistGate>
        </Provider>
      </React.Fragment>
    );
  
}

export default App;