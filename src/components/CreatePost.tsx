import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "../Api";

type Props = {};

const CreatePost = (props: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const createPostMutation = useMutation({
    mutationFn: createPost,
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current?.value ?? "",
      body: bodyRef.current?.value ?? "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <label htmlFor="title">Title: </label>
        <input id="title" ref={titleRef} />
        <br />
        <label htmlFor="body">Body: </label>
        <input id="body" ref={bodyRef} />
      </form>
      <button disabled={createPostMutation.isPending} type="submit">
        {createPostMutation.isPending ? "Loading..." : "Create"}
      </button>
    </div>
  );
};

export default CreatePost;
