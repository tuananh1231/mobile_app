import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import { home as homeIcon, notifications, personAddSharp, musicalNotesSharp as musicaddsharpIcon, imageOutline } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Vibrate from './pages/Vibrate';
import Register from './pages/Register';
import Music from './pages/Music';
import Detail from './pages/Detail';
import Image from './pages/Image';
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/vibrate">
            <Vibrate />
          </Route>
          <Route exact path="/music">
            <Music />
          </Route>
          <Route exact path="/image">
            <Image />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
         
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={homeIcon}></IonIcon>
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Register" href="/register">
            <IonIcon icon={personAddSharp}></IonIcon>
            <IonLabel>Register</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Vibrate" href="/vibrate">
            <IonIcon icon={notifications}></IonIcon>
            <IonLabel>Noification</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Music" href="/music">
            <IonIcon icon={musicaddsharpIcon}></IonIcon>
            <IonLabel>Music</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Image" href="/image">
            <IonIcon icon={imageOutline}></IonIcon>
            <IonLabel>Image</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>I
  </IonApp>
);

export default App;
