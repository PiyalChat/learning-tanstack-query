import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "../Api";
import ViewDetails from "./ViewDetails";

type Props = {
  setCurrentPage: any;
};

const CreatePost = (props: Props) => {
  const { setCurrentPage } = props;
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts", data.id], data); //manually adding it to cache for faster execution
      queryClient.invalidateQueries(["posts"] as InvalidateQueryFilters);// removing old data to reflect new data
      setCurrentPage(<ViewDetails postId={+data.id} />);
    },
    onMutate: (variables) => {
      return variables;
    },
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
      {createPostMutation.isError && (
        <div>{JSON.stringify(createPostMutation.error)}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Create Post!!!</h1>
          <label htmlFor="title">Title: </label>
          <input id="title" ref={titleRef} />
          <br />
          <label htmlFor="body">Body: </label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isPending}>
          {createPostMutation.isPending ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
