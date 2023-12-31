import axios from "axios";
import { useEffect, useState } from "react";

type Task = {
  titleId: string;
  title: string;
  completed: boolean;
};

export const TaskProvider = () => {
  const baseUrl = "http://localhost:3000/api/tasks/";
  const [task, setTask] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await getAllTasks();
    }
    fetchData();
  }, []);

  function getAllTasks() {
    return axios.get(baseUrl).then((response) => setTask(response.data));
  }

  function createTask(taskTitle: any) {
    let newTitle = { title: taskTitle };
    return axios.post(baseUrl, newTitle).then((response) => {
      getAllTasks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function toggleTaskTrue(titleId: string, task: boolean) {
    let url = baseUrl + titleId;
    let completed = { completed: 1 };
    return axios.put(url, completed).then((response) => {
      getAllTasks();
      return new Promise((resolve) => resolve(response.data));
    });
  }

  function toggleTaskFalse(titleId: string, task: boolean) {
    let url = baseUrl + titleId;
    let completed = { completed: 0 };
    return axios
      .put(url, completed)
      .then((response) => {
        getAllTasks();
        return new Promise((resolve) => resolve(response.data));
      })
      .catch(function (error) {
        console.error(error.toJSON());
      });
  }

  const deleteTask = (titleId: any) => {
    let url = baseUrl + titleId;
    return axios
      .delete(url)
      .then((response) => {
        getAllTasks();
        return new Promise((resolve) => resolve(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return {
    task,
    getAllTasks,
    deleteTask,
    createTask,
    toggleTaskTrue,
    toggleTaskFalse
  };
};

export default TaskProvider;
