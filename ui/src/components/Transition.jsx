import { motion } from "framer-motion"
import { cn } from "../lib/utils"

const animate = {
    initial: { opacity: 0.01, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { type: "spring", stiffness: 120, damping: 20 },
}

const Transition = ({ children, className, ...props }) => {
    return (
        <motion.main {...animate} className={cn("relative w-full h-full pt-16", className)} {...props}>
            {children}
        </motion.main>
    )
}

export default Transition;