
import Logo from "@/lib/assets/logo.svg"


const Layout = ({children, ...props}) => {
    return(
        <div className="w-full h-full grid grid-rows-[70px_1fr]">
            <nav className="w-full h-full border-b flex items-center px-4">
                <Logo className="h-[40px]"/>
            </nav>
            {children}
        </div>
    )

}

export default Layout