import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { NavigationRoute } from 'workbox-routing';

import app from './app';
import './Home.css';

const Music: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Navtive functions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonList>
          <IonItem>
            <IonButton onClick={() => myPlayer?.audioEl.current?.play()}>play music</IonButton>
            <IonButton onClick={() => myPlayer?.audioEl.current?.pause()}>pause</IonButton>
            <ReactAudioPlayer
              src="assets\music.mp3"
              ref={(element) => { myPlayer = element; }}

            /> */}
    <div className="player">
    {/* <!-- Dashboard --> */}
      <div className="dashboard">
          {/* <!-- Header --> */}
          <header>
              <h4>Now playing:</h4>
              <h2>String 57th  9th</h2>
          </header>

          {/* <!-- CD --> */}
          <div className="cd">
              <div className="cd-thumb" style={{backgroundImage: "url(https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg)"}}>
              </div>
          </div>

          {/* <!-- Control --> */}
          <div className="control">
              <div className="btn btn-repeat">
                  <i className="fas fa-redo"></i>
              </div>
              <div className="btn btn-prev">
                  <i className="fas fa-step-backward"></i>
              </div>
              <div className="btn btn-toggle-play">
                  <i className="fas fa-pause icon-pause"></i>
                  <i className="fas fa-play icon-play"></i>
              </div>
              <div className="btn btn-next">
                  <i className="fas fa-step-forward"></i>
              </div>
              <div className="btn btn-random">
                  <i className="fas fa-random"></i>
              </div>
          </div>

          <input id="progress" className="progress" type="range" value="0" step="1" min="0" max="100"/>

          <audio id="audio" src=""></audio>
      </div>
    </div>
    {/* <!-- Playlist --> */}
    <div className="playlist">
        <div className="song">
            <div className="thumb" style={{backgroundImage: "url(https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg)"}}>
            </div>
            <div className="body">
                <h3 className="title">Music name</h3>
                <p className="author">Singer</p>
            </div>
            <div className="option">
                <i className="fas fa-ellipsis-h"></i>
            </div>
        </div>
        <div className="song">
            <div className="thumb" style={{backgroundImage: "url(https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg)"}}>
            </div>
            <div className="body">
                <h3 className="title">Music name</h3>
                <p className="author">Singer</p>
            </div>
            <div className="option">
                <i className="fas fa-ellipsis-h"></i>
            </div>
        </div>
        <div className="song">
            <div className="thumb" style={{backgroundImage: "url(https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg)"}}>
            </div>
            <div className="body">
                <h3 className="title">Music name</h3>
                <p className="author">Singer</p>
            </div>
            <div className="option">
                <i className="fas fa-ellipsis-h"></i>
            </div>
        </div>
    </div>
          {/* </IonItem>
          <IonItem>
            <IonButton onClick={() => navigator.vibrate(2500)}>Vibration</IonButton>
          </IonItem>
        </IonList>      */}
        
      </IonContent>
    </IonPage>
  );
};

export default Music;
