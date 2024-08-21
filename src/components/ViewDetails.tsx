import { useQuery } from "@tanstack/react-query";
import { getPostById, getUserById } from "../Api";

type Props = { postId: number };

const ViewDetails = (props: Props) => {
  const { postId } = props;
  const postQuery = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => getPostById(postId),
  });
  const apiQuery = useQuery({
    queryKey: ["api", postQuery.data?.userId],
    enabled:
      typeof postQuery.data !== "object" ||
      postQuery?.data?.userId != null ||
      postQuery?.data?.userId != undefined,
    queryFn: () => getUserById(postQuery?.data?.userId),
  });

  if (postQuery.isLoading || apiQuery.isLoading) return <h1>Loading...</h1>;
  else if (
    postQuery.data?.code ||
    postQuery.isError ||
    apiQuery.isError
  )
    return <h1>{`${JSON.stringify(apiQuery.error)} ${JSON.stringify(postQuery.error)}`}</h1>;
  return (
    <div>
      <div>
        <div key={postQuery.data?.id}>
          <p>{postQuery.data?.title}</p>
          <summary>{postQuery.data?.body}</summary>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

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

export default ViewDetails;
