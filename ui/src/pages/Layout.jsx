
import Logo from "@/lib/assets/logo.svg"
import Avatar from "@/lib/assets/avatar.svg"
import Restart from "@/lib/assets/refresh.svg"
import Question from "@/lib/assets/question.svg"
import { AnimatePresence, motion } from "motion/react"
import { useLocation } from "react-router-dom"


const animate = {
    initial: { opacity: 0.01, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { type: 'spring', stiffess: 100, damping: 30 },
}

const Layout = ({ children, ...props }) => {
    const location = useLocation()
    return (
        <div className="relative w-full h-screen grid grid-rows-[70px_1fr] overflow-x-hidden">
            <nav className="relative w-full h-full border-b flex items-center px-8">
                <Logo className="h-[40px]" />
                <div className="absolute right-[calc(50%-25px)] -bottom-[30px] w-[60px] h-[60px] flex items-center justify-center rounded-full border p-3 bg-background pointer-events-none">
                    <Avatar className="h-[85%]" />
                </div>
                <div className="ml-auto [&>*]:ml-6">
                    <button className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                        <Restart className="h-[24px]"/>
                    </button>
                    <button className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                        <Question className="h-[24px]"/>
                    </button>
                    
                </div>
            </nav>
            <AnimatePresence initial={false} mode="wait">
                <motion.main key={location.pathname} {...animate} className="relative w-full h-full pt-6">
                    {children}
                </motion.main>
            </AnimatePresence>
        </div>
    )

}

export default Layout