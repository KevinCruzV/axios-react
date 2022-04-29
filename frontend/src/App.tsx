import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import {Routes, Route, BrowserRouter, Link} from "react-router-dom";
import useLogin from "./Hook/useLogin";
import {BlogInterface, LoginResponseInterface} from "./Interface/ResponsesInterfaces";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import useRegister from "./Hook/useRegister";
import useGetBlogList from "./Hook/useGetBlogList";
import BlogList from "./Component/BlogList";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import BlogForm from "./Component/BlogForm";
import useGetCookies from "./Hook/useGetCookies";
import useEraseCookie from "./Hook/useEraseCookie";
import About from "./Component/About";


function Order() {
    return null;
}

export default function App() {
    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [blogList, setBlogList] = useState<BlogInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getBlogList = useGetBlogList();
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: cookies.hetic_username,
                token: cookies.hetic_token
            }))
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                //
                .then(data => {
                    console.log(data)
                    //setLoggedUser(data)
                })

        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])

    useEffect(() => {
        getBlogList()
            .then(data => {
                setBlogList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }

    return (
        // <div className='container mt-5'>
        //     <HideIfLogged loggedUser={loggedUser}>
        //         <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
        //     </HideIfLogged>
        //
        //     <HideIfNotLogged loggedUser={loggedUser}>
        //         <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
        //         <BlogForm loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
        //     </HideIfNotLogged>
        //
        //     <BlogList blogList={blogList}/>
        // </div>

        <BrowserRouter>
            <div className='container mt-5'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='DashBoard'>DashBoard</Link></li>
                    <li><Link to='Order'>Order</Link></li>
                    <li><Link to='Product'>Product</Link></li>
                    <li><Link to='Customer'>Customer</Link></li>
                    <li><Link to='login'>Login</Link></li>
                </ul>
            <Routes>
                <Route path="/" element={<BlogList blogList={blogList}/>} />
                <Route path="login" element={<LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>} />

                <Route path="order" element={<Order/>}>
                    <Route path="about" element={<About/>} />
                </Route>
            </Routes>

            </div>
        </BrowserRouter>
    )
}
