import { useShallow } from "zustand/react/shallow";
import useStore from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import Transition from "../components/Transition";



const animate = {
    initial: { opacity: 0.01 },
    animate: { opacity: 1 },
    exit: { opacity: 0, },
    transition: { type: "spring", stiffness: 100, damping: 20 },
}



const Results = () => {

    const [results, isThinking] = useStore(useShallow((state) => [state.results, state.isThinking]))

    return (
        <Transition>
            <AnimatePresence mode="sync">
                {isThinking ?
                    <motion.div key="thinking" {...animate} className="absolute w-full">

                        <div className="flex justify-center ">
                            <div>
                                <h1 className="text-3xl text-center ">
                                    Hang tight. We're working on it ...
                                </h1>
                            </div>
                        </div>


                        <div className="px-4 flex justify-center w-full mt-12" {...animate}>
                            <img src="/file-load.gif" className="w-[175px]" alt="file load" />
                        </div>
                    </motion.div>
                    :
                    <motion.div key="not-thinking" className=" absolute w-full" {...animate}>



                        <div className="flex justify-center ">
                            <div>
                                <h1 className="text-3xl text-center ">
                                    Results
                                </h1>
                                <p className="text-muted-foreground mt-2">
                                    Add your form fields and the rules you want to enforce <span className="underline">see example</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                }


            </AnimatePresence>

        </Transition >
    )
}

export default Results;