import { Dialog } from "@capacitor/dialog";

const addTask = async (title: string, message: string) => {
  const { value, cancelled } = await Dialog.prompt({
    title,
    message
  });
  if (cancelled) {
    return null; // Return null to indicate cancellation
  }
  if (value === "") {
    return null;
  } else return value; // Return the user's input when not cancelled
};

export function useAddTask() {
  return {
    addTask
  };
}
