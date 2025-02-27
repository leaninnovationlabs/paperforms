
import Logo from "@/lib/assets/logo.svg"
import Avatar from "@/lib/assets/avatar.svg"
import Restart from "@/lib/assets/refresh.svg"
import Question from "@/lib/assets/question.svg"
import BackIcon from "@/lib/assets/chevron-left.svg"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import useStore from "@/lib/store"
import { useShallow } from "zustand/react/shallow"


const Layout = ({ children, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [selected, restart] = useStore(useShallow(state => [state.selected, state.restart]))

    // Navigate home if we lose state
    useEffect(() => {
        if(!selected && location.pathname !== "/"){
            navigate("/")
        }
    }, [selected])

    return (
        <div className="relative w-full h-screen grid grid-rows-[70px_1fr] ">
            <div />
            <nav className="fixed top-0 left-0 h-[70px] w-full border-b flex items-center px-8 z-50 backdrop-blur-lg">
                <Logo className="h-[35px] cursor-pointer" onClick={() => navigate("/")} />
                <div className="absolute right-[calc(50%-25px)] -bottom-[25px] w-[50px] h-[50px] flex items-center justify-center rounded-full border p-3 bg-background pointer-events-none">
                    <Avatar className="h-[85%]" />
                </div>
                <div className="ml-auto [&>*]:ml-6">
                    <button className="widget" onClick={()=>{restart(); navigate("/")}}>
                        <Restart className="h-[24px]" />
                    </button>
                    <button className="widget">
                        <Question className="h-[24px]" />
                    </button>

                </div>
            </nav>
            <div className="fixed w-full h-full pointer-events-none z-10">
                <button disabled={location.pathname === "/"} className="widget p-12 mt-[80px] pointer-events-auto disabled:opacity-0" onClick={() => navigate(-1)}>
                    <BackIcon/>
                </button>
            </div>
            <main className="relative w-full h-full overflow-x-hidden">
                {children}
            </main>
        </div>
    )

}

export default Layout