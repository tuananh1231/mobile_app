import {
  IonButton,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { getAllDB, insertDB } from "../database";
import "./Home.css";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { futimesSync } from "fs";

import { toast } from "../toast";
import { bed } from "ionicons/icons";
const Register: React.FC = () => {
  const [kindRom, setKindRom] = useState<any[]>([]);
  const [Bedrooms, setBedrooms] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [price, setPrice] = useState("");
  const [Furniture, setFurniture] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [filePicURL, setFilePicURL] = useState("assets/imgHolder.png");
  const [pictureNote, setPictureNote] = useState("");
  async function takePicture() {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 60,
    });
    setFilePicURL(cameraPhoto.webPath!);
  }

  const history = useHistory();
  async function clickChange() {
    // setTrue();
    const respon = await fetch(filePicURL);
    const takePic = await respon.blob();
    const array =['has', 'had', 'lee']
    const kindrom = [
      {
        kindrom: kindRom,
       
      },
      {
        kindrom: note,
      },
    ];
    var ad = {
      kindRom: kindrom,
      Bedrooms: Bedrooms,
      date: date,
      price: price,
      Furniture: Furniture,
      name: name,
      contact: contact,
      filePicURL: takePic,
      namePic: pictureNote,
    };
    const db = (await getAllDB()).length

    if(db == 0){
      await insertDB(ad);
      toast("Success insert 111");
    }
    else{
    if (
      (price.trim().length == 0 &&
        name.trim().length == 0 &&
        Bedrooms.trim().length == 0 &&
        kindRom.length == 0) ||
      price.trim().length == 0 ||
      name.trim().length == 0 ||
      Bedrooms.trim().length == 0 ||
      kindRom.length == 0
    ) {
      toast("Not null form elements");
    } else {
      const regex1 = /^[0]/;
      const regex = /^[0-9]+$/;
      if (!regex1.test(price)) {
        if (regex.test(price)) {
          const old = await getAllDB();
          for (let i = 0; i < old.length; i++) {
            if (old[i].name == ad.name) {
              if (
                old[i].Bedrooms == ad.Bedrooms &&
                old[i].kindRom[0].kindrom == ad.kindRom[0].kindrom
              ) {
                toast("Error Bedroom or Kindroom already name");
                break;
              } else {
                if (i == old.length - 1) {
                  await insertDB(ad);
                  toast("Success insert");
                  history.goBack();
                }
              }
            } else {
              if (i == old.length - 1) {
                await insertDB(ad);
                console.log(ad);
                toast("Success insert 111");
                history.goBack();
              }
            }
          }
        } else {
          toast("price is number");
        }
      } else {
        toast("Price not 0 start");
      }
    }
  }
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel className="register__title" position="stacked">Kind of room  </IonLabel>
          <IonSelect placeholder="Kind of room" onIonChange={(p) => setKindRom(p.detail.value)}>
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Apartment">Apartment</IonSelectOption>
          </IonSelect>
          <IonLabel className="register__title" position="stacked">Note </IonLabel>
          <IonInput placeholder="note write" onIonChange={(p) => setNote(p.detail.value!)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Bedrooms</IonLabel>
          <IonSelect placeholder="Bedrooms" onIonChange={(p) => setBedrooms(p.detail.value)}>
            <IonSelectOption>One</IonSelectOption>
            <IonSelectOption>Two</IonSelectOption>
            <IonSelectOption>Double bed</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Date and time</IonLabel>
          <IonDatetime value={date} onIonChange={p=> setDate(p.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Monthly rent price</IonLabel>
          <IonInput
            placeholder="Price"
            onIonChange={(p) => setPrice(p.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Furniture types</IonLabel>
          <IonSelect placeholder="Furniture" multiple onIonChange={(p) => setFurniture(p.detail.value)}>
            <IonSelectOption>Unfurnished</IonSelectOption>
            <IonSelectOption>Air conditioning</IonSelectOption>
            <IonSelectOption>Fridge</IonSelectOption>
            <IonSelectOption>tables and chairs</IonSelectOption>
            <IonSelectOption>toilets</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Name of the lessor</IonLabel>
          <IonInput
            placeholder="Enter Name"
            onIonChange={(p) => setName(p.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel className="register__title" position="stacked">Contact</IonLabel>
          <IonInput
            placeholder="Phone number ..."
            onIonChange={(p) => setContact(p.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem>
          <img src={filePicURL} alt="" width="100%" height="100%" />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Picture notes</IonLabel>
          <IonInput
            onIonChange={(e) => setPictureNote(e.detail.value!)}
          ></IonInput>
          <IonButton onClick={takePicture}>Select picture</IonButton>
        </IonItem>
        <IonButton expand="full" onClick={clickChange}>
          Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
