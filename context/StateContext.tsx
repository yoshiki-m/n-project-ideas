import React, { createContext, useState } from "react";

type TSelectedTask = {
  id: number;
  title: string;
};

type TSelectedTaskContext = {
  selectedTask: TSelectedTask;
  setSelectedTask: React.Dispatch<React.SetStateAction<TSelectedTask>>;
};

export const StateContext = createContext({} as TSelectedTaskContext);

const StateContextProvider = (props: { children: React.ReactNode }) => {
  const [selectedTask, setSelectedTask] = useState<TSelectedTask>({
    id: 0,
    title: "",
  });
  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
