import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import "./Home.css";
import TaskContainer from "../components/TaskList";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="task" class="title">
          <h1>Task List</h1>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <TaskContainer header1="Incomplete" header2="Completed" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
