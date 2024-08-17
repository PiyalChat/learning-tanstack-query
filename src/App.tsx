import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import "./App.css";
import axios from "axios";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useRef,
} from "react";
import { createPost, getPost, getPostById } from "./Api";

const POSTS: any[] = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
];
const App = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts", 3],
    queryFn: () => getPostById(3),
  });
  const apiQuery = useQuery({
    queryKey: ["api", postQuery.data?.userId],
    enabled: Boolean(postQuery?.data?.userId),
    queryFn: async () => {
      return await axios
        .get(`/${postQuery?.data?.userId}`, {
          baseURL: "https://fake-json-api.mock.beeceptor.com/users",
        })
        .then((res) => res.data)
        .catch((err) => console.log("error caught", err));
    },
    refetchInterval: 1000 * 60,
  });

  /* const apiRequest = axios.get(
    "https://api.coindesk.com/v1/bpi/currentprice.json"
  ); */

  /* const newPostMutation = useMutation({
    mutationFn: (title: any) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), name: title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"] as InvalidateQueryFilters);
    },
  }); */

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

  if (postQuery.isLoading || apiQuery.isLoading) return <h1>Loading...</h1>;
  else if (postQuery.isError || apiQuery.isError)
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  return (
    <div>
      <div>
        {/* {postQuery.data?.map(
          (post: { id: Key | null | undefined; title: string }) => (
            <div key={post.id}>{post.title}</div>
          )
        )} */}
        <div key={postQuery.data?.id}>{postQuery.data?.title}</div>
        {/* <button
          disabled={newPostMutation.isPending}
          onClick={() => newPostMutation.mutate("New Post")}
        >
          Add new
        </button> */}
      </div>
      <br />
      <br />
      {/* <form onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <label htmlFor="title">Title: </label>
        <input id="title" ref={titleRef} />
        <br />
        <label htmlFor="body">Body: </label>
        <input id="body" ref={bodyRef} />
      </form>
      <button disabled={createPostMutation.isPending} type="submit">
        {createPostMutation.isPending ? "Loading..." : "Create"}
      </button> */}
      <br />
      <br />
      {/* {apiQuery.data?.map((api: any) => (
        <div key={api.id}>
          <h1>{api.name}</h1>
          <div>
            <label>Company: </label>
            <span>{api.company}</span>
            <br />
            <label>Email: </label>
            <span>{api.email}</span>
          </div>
        </div>
      ))} */}
      <div key={apiQuery.data?.id}>
        <h1>{apiQuery.data?.name}</h1>
        <div>
          <label>Company: </label>
          <span>{apiQuery.data?.company}</span>
          <br />
          <label>Email: </label>
          <span>{apiQuery.data?.email}</span>
        </div>
      </div>
    </div>
  );
};

const wait = (duration: any) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
