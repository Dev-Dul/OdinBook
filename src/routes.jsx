import Home from "./components/Home";
import Profile from "./components/Profile";
import Friends from "./components/Friends";
import Signup from "./components/Signup";
import Welcome from "./components/welcome";
import Error from "./components/Error";
import SearchPage from "./components/Search";
import NewPost from "./components/NewPost";
import PostView from "./components/PostView";
import UserView from "./components/User";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Welcome /> },
            { path: "home", element: <Home /> },
            { path: "new", element: <NewPost /> },
            { path: "signup", element: <Signup /> },
            { path: "friends", element: <Friends /> },
            { path: "profile", element: <Profile /> },
            { path: "search", element: <SearchPage /> },
            { path: "posts/view/:postId", element: <PostView /> },
            { path: "users/view/:userId", element: <UserView /> },
        ]
    }
]

export default routes;
