import {
    IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { trash } from "ionicons/icons";
import { useHistory, useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { deleteElement, getUserID, updateDB } from "../database";
import { UserRental } from "../Model";
import "./Home.css";
import { toast } from "../toast";
interface idUpdate {
  id: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<idUpdate>();
  const [kindRom, setKindRom] = useState<any[]>([]);
  const [Bedrooms, setBedrooms] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [price, setPrice] = useState("");
  const [Furniture, setFurniture] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [filePicURL, setFilePicURL] = useState("assets/imgHolder.png");
  const [namePic, setNamePic] = useState("");

  const history = useHistory();
  function ChangeNamePic(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files != null) {
      const namePicture = event.target.files[0].name;
      const displayPic = URL.createObjectURL(event.target.files[0]);
      setFilePicURL(displayPic);
      setNamePic(namePicture);
    }
  }

  async function getIdUser() {
    const result = (await getUserID(Number.parseInt(id))) as UserRental;
    // console.log(result.filePicURL);
    setKindRom(result.kindRom[0].kindrom);
    setBedrooms(result.Bedrooms);
    setDate(result.date);
    setPrice(result.price);
    setFurniture(result.Furniture);
    setName(result.name);
    setContact(result.contact);
    setNote(result.kindRom[1].kindrom);
    setFilePicURL(URL.createObjectURL(result.filePicURL));
    setNamePic(result.namePic);
  }
  async function clickUpdate() {
    const kindrom = [
      {
        kindrom: kindRom,
       
      },
      {
        kindrom: note,
      },
    ];
    const respon = await fetch(filePicURL);
    const blob = await respon.blob();
    const changeElemt = {
      id: Number.parseInt(id),
      kindRom: kindrom,
      Bedrooms: Bedrooms,
      date: date,
      price: price,
      Furniture: Furniture,
      name: name,
      contact: contact,
      filePicURL: blob,
      namePic: namePic,
    };
    await updateDB(changeElemt);
    toast("update done!");
    history.goBack();
  }
  async function handledete() {
    const delet = await deleteElement(Number.parseInt(id));
    toast("delete done");
    history.goBack();
  }
  useEffect(() => {
    getIdUser();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonButton onClick={handledete} slot="end">
            <IonIcon slot="icon-only" icon={trash}></IonIcon>
          </IonButton>
          <IonTitle>Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Kind of room</IonLabel>
          <IonSelect
            value={kindRom}
            onIonChange={(p) => setKindRom(p.detail.value)}
          >
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Apartment">Apartment</IonSelectOption>
          </IonSelect>
          <IonLabel>Note</IonLabel>
          <IonInput
            value={note}
            placeholder="note write"
            onIonChange={(p) => setNote(p.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Bedrooms</IonLabel>
          <IonSelect
            value={Bedrooms}
            onIonChange={(p) => setBedrooms(p.detail.value)}
          >
            <IonSelectOption>One</IonSelectOption>
            <IonSelectOption>Two</IonSelectOption>
            <IonSelectOption>Double bed</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel >Date and time</IonLabel>
          <IonDatetime value={date} onIonChange={p=>setDate(p.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Monthly rent price</IonLabel>
          <IonInput
            value={price}
            placeholder="Price"
            onIonChange={(p) => setPrice(p.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Furniture types</IonLabel>
          <IonSelect
            value={Furniture}
            multiple
            onIonChange={(p) => setFurniture(p.detail.value)}
          >
            <IonSelectOption>Unfurnished</IonSelectOption>
            <IonSelectOption>Air conditioning</IonSelectOption>
            <IonSelectOption>Fridge</IonSelectOption>
            <IonSelectOption>tables and chairs</IonSelectOption>
            <IonSelectOption>toilets</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Name of the lessor</IonLabel>
          <IonInput
            value={name}
            placeholder="Enter Name"
            required
            onIonChange={(p) => setName(p.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Contact</IonLabel>
          <IonInput
            value={contact}
            placeholder="Phone number ..."
            required
            onIonChange={(p) => setContact(p.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <input type="file" onChange={ChangeNamePic}></input>
        </IonItem>
        <IonItem>{namePic}</IonItem>
        <IonItem>
          <img src={filePicURL} alt="" width="100%" height="100%" />
        </IonItem>
        <IonButton expand="full" onClick={clickUpdate}>
          Update
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Detail;
