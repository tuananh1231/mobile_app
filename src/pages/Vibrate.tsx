import { IonButtons, IonContent, IonHeader, IonButton, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Vibrate: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notification Vibrate</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem >
            <IonButton onClick={() => navigator.vibrate(2500)}>Vibrate</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Vibrate;
