import "./App.css";
import ViewDetails from "./components/ViewDetails";
import CreatePost from "./components/CreatePost";

const POSTS: any[] = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
];
const App = () => {
  return (
    <div>
      <ViewDetails postId={5} />
      <CreatePost />
    </div>
  );
};

const wait = (duration: any) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
