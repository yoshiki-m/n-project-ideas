import fetch from "node-fetch";
import { post } from "../components/types";

export const getAllPostsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = (await res.json()) as post[];
  const filteredPosts = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return filteredPosts;
};

export const getAllPostIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post/`
  );
  const posts = (await res.json()) as post[];
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

export const getPostData = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}/`
  );
  const post = await res.json();
  // return {
  //   post,
  // };
  return post;
};
