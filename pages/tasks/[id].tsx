import { useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getAllTaskIds, getTaskData } from "../../lib/tasks";

import { task } from "../../components/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Post = (props: { staticTask: task; id: string }) => {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${props.id}`,
    fetcher,
    {
      fallbackData: props.staticTask,
    }
  );
  useEffect(() => {
    mutate();
  }, []);
  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title={task.title}>
      <span className="mb-4">
        {"ID : "}
        {task.id}
      </span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page">
        <div className="flex cursor-pointer mt-8">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export async function getStaticPaths() {
  const paths = await getAllTaskIds();
  return {
    paths,
    fallback: true,
  };
}
export const getStaticProps = async ({ params }: any) => {
  //const { task: staticTask } = await getTaskData(params.id);
  const staticTask = (await getTaskData(params.id)) as task;
  return {
    props: {
      id: staticTask.id,
      staticTask,
    },
    revalidate: 3,
  };
};

export default Post;
