import { RefresherEventDetail } from '@ionic/core';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { document } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ExploreContainer from '../components/ExploreContainer';
import { getAllDB } from '../database';
import { UserRental } from '../Model';
import './Home.css';

const Home: React.FC = () => {
  const [rent, setRent] = useState<UserRental[]>([])
  const [names, setNames] = useState('')
  const [data, setData] = useState(false);

  async function searchName(){
    // let ele = new RegExp(nameSe.trim() , 'i')
    const findName = await getAllDB()
    var element = findName.filter(re =>{ 
        return names === re.kindRom[0].kindrom
    })
    await setRent(element)
    // console.log(element)
    // if(element.length > 0){
    //   await setRent(element)
    //   setNames(nameSe)
    // }
  }
  async function getElement(){
    const take = await getAllDB()
    await  setRent(take)
  }
  function effect(event: CustomEvent<RefresherEventDetail>){
    getElement();
    setTimeout(()=>{
      event.detail.complete()
    },500)
  }
  useEffect(()=>{
    getElement()
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent className="home__main">
      <div className="ion-padding">
      <IonRefresher slot="fixed" onIonRefresh={effect}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonInput id="keyword" value={names} onIonChange={p => setNames(p.detail.value!)}  placeholder="Enter Name"></IonInput>
       <IonButton expand="full" onClick={searchName}>Search</IonButton>
       {rent &&
        <IonList>
          {rent.map(c=>
            <IonItem routerLink={'/detail/'+ c.id} button key={c.id}>{c.kindRom[0].kindrom}
            </IonItem>
          )}
        </IonList>
}
      </div>
</IonContent>
    </IonPage>
  );
};

export default Home;
function startsWith(nameSe: string) {
  throw new Error('Function not implemented.');
}

