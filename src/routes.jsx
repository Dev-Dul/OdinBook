import Home from "./components/Home";
import Profile from "./components/Profile";
import Friends from "./components/Friends";
import Signup from "./components/Signup";
import Welcome from "./components/welcome";
import Error from "./components/Error";
import Chat from "./components/Chat";
import App from "./App";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Welcome /> },
            { path: "home", element: <Home /> },
            { path: "signup", element: <Signup /> },
            { path: "friends", element: <Friends /> },
            { path: "profile", element: <Profile /> },
            { path: "chats/:friendId", element: <Chat /> },
        ]
    }
]

export default routes;
