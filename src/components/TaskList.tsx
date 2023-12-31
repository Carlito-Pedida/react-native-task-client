import {
  IonCheckbox,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import "./TaskList.css";
import taskProvider from "../hooks/taskProvider";
import React from "react";
import { add } from "ionicons/icons";
import { useAddTask } from "../hooks/useAddTask";

interface ContainerProps {
  header1: string;
  header2: string;
}

const TaskContainer: React.FC<ContainerProps> = ({ header1, header2 }) => {
  const { task, createTask, deleteTask, toggleTaskTrue, toggleTaskFalse } =
    taskProvider();
  const { addTask } = useAddTask();
  const items = task || [];

  console.log(items);

  const notCompleted = items.filter((item: any) => item.completed == false);
  const yesCompleted = items.filter((item: any) => item.completed == true);

  const addNewTask = () => {
    addTask("Create Task", "New Task Title")
      .then((title: any) => {
        if (title !== null) {
          createTask(title);
        } else {
          // Handle the case where 'title' is null
          window.alert("Operation was cancelled or has no input");
        }
      })
      .catch(function (error) {
        console.error(error.toJSON());
      });
  };

  return (
    <React.Fragment>
      <div>
        <IonList>
          <IonToolbar>
            <IonTitle className="heads">{header1}</IonTitle>
          </IonToolbar>
          {notCompleted.map(({ title, titleId, completed }) => (
            <IonItemSliding key={titleId}>
              <IonItem>
                <IonCheckbox onClick={() => toggleTaskTrue(titleId, completed)}>
                  {title}
                </IonCheckbox>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() => deleteTask(titleId)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </div>
      <div>
        <IonList>
          <IonToolbar>
            <IonTitle className="heads">{header2}</IonTitle>
          </IonToolbar>
          {yesCompleted.map(({ title, titleId, completed }) => (
            <IonItemSliding key={titleId}>
              <IonItem>
                <IonCheckbox
                  color="task"
                  checked={true}
                  onClick={() => toggleTaskFalse(titleId, completed)}
                >
                  {title}
                </IonCheckbox>
              </IonItem>
              <IonItemOptions>
                <IonItemOption
                  color="danger"
                  onClick={() => deleteTask(titleId)}
                >
                  Delete
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab slot="fixed" vertical="bottom" horizontal="center">
          <IonFabButton color="task" className="add" onClick={addNewTask}>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </div>
    </React.Fragment>
  );
};

export default TaskContainer;
