import "./App.css";
import ViewDetails from "./components/ViewDetails";
import CreatePost from "./components/CreatePost";
import { useState } from "react";

const POSTS: any[] = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
];

const App = () => {
  const [currentPage, setCurrentPage] = useState<JSX.Element | null>(<></>);
  return (
    <div>
      <div>
        <button onClick={() => setCurrentPage(<ViewDetails postId={1} />)}>
          View Details
        </button>
        <button
          onClick={() =>
            setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
          }
        >
          CreatePost
        </button>
      </div>
      {currentPage}
    </div>
  );
};

const wait = (duration: any) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
