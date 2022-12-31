import Link from "next/link";

import { post } from "./types";

type key_post = {
  key: string;
  post: post;
};

const Post = (key_post: key_post) => {
  return (
    <div>
      <span>{key_post.post.id}</span>
      {" : "}
      <Link href={`/posts/${key_post.post.id}`}>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {key_post.post.title}
        </span>
      </Link>
    </div>
  );
};

export default Post;
