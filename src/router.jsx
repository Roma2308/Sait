import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Info from "./pages/Info/Info";
import Reviews from "./pages/Reviews/Reviews";
import Izbr from "./pages/Izbr/Izbr";
import Login from "./pages/Login/Login";
import Vnutr from "./pages/Vnutr/Vnutr";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Sales from "./pages/Sales/Sales";
import Support from "./pages/Support/Support";
import Poll from "./pages/Poll/Poll";




export const myRouter = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/info",
                element: <Info/>
            },
            {
                path: "/rev",
                element: <Reviews/>
            },
            {
                path: "/izbr",
                element: <Izbr/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/vnutr/:id",
                element: <Vnutr/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/sales",
                element: <Sales/>
            },
            {
                path: "/support",
                element: <Support/>
            },
            {
                path: "/poll",
                element: <Poll/>
            },
        ]
    }
])