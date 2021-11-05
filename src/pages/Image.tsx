import { RefresherEventDetail } from '@ionic/core';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { getAllDB } from '../database';
import { UserRental } from '../Model';
import './Home.css';

const Image: React.FC = () => {
  const [pictureUrl, setPictureURL] = useState('assets/imgHolder.png')
  const [pics, setPics] = useState<UserRental[]>([])
  async function fetchData(){
    const result =  await getAllDB()
    setPics(result)
  }
  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Image</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
      <IonList>
          {pics.map(p=>
            <IonItem key={p.id} button>
              <IonLabel>{p.name}</IonLabel>
              <img src={URL.createObjectURL(p.filePicURL)} width="80" height="60"/>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Image;
