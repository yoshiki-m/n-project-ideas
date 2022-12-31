import fetch from "node-fetch";

import { task } from "../components/types";

export const getAllTasksData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = (await res.json()) as task[];
  const staticfilterdTasks = tasks.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return staticfilterdTasks;
};

export const getAllTaskIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`
  );
  const tasks = (await res.json()) as task[];

  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
};
export async function getTaskData(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`
  );
  const task = await res.json();
  // return {
  //   task,
  // };
  return task;
}
