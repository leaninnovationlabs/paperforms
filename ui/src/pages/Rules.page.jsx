import { useMemo } from "react";
import Transition from "../components/Transition";
import ImportIcon from "@/lib/assets/import.svg"
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import useStore from "@/lib/store";
import Input from "@/components/Input";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"

const Upload = () => {
    const [selected, addRule, setRule] = useStore(useShallow((state) => [state.selected, state.addRule, state.setRule]))

    const id = useMemo(() => selected?.id ?? "", [selected]);
    const rules = useMemo(() => selected?.rules ?? [], [selected])

    const navigate = useNavigate();

    useEffect(() => {
        // addRule()
    }, [])

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center ">
                        Define {selected?.label ?? ""} Rules <span className="opacity-50 text-2xl">(optional)</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Add rules corresponding to each field in your form <span className="underline">see example</span>
                    </p>
                </div>
            </div>
            <AnimatePresence mode="popLayout">

                <div className="flex justify-center mt-24 px-4">
                    <div className="relative flex flex-col gap-y-4 w-full max-w-[1000px] -rl-5">
                        <div className="absolute left-0 top-0 w-full grid grid-cols-[20px_2fr_5fr_50px_50px] gap-x-4 pl-2">
                            <div />
                            <p className="uppercase text-muted-foreground text-xs">
                                Field Name
                            </p>
                            <p className="uppercase text-muted-foreground text-xs">
                                Rule
                            </p>
                            <div />
                            <div />
                        </div>
                        <div className="h-[20px]" />



                        {rules.map(({ id, field, text }, idx, arr) => (
                            <motion.div layout="preserve-aspect" key={id} className="grid grid-cols-[20px_2fr_5fr_50px_50px] gap-x-4 w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 100 }}>
                                <div className="h-full mr-4 flex items-center text-muted-foreground text-xs ">
                                    {idx + 1}.
                                </div>
                                <Input placeholder="Field" value={field} onChange={(e) => setRule(id, e.target.value, text)} />
                                <Input placeholder="Rule" value={text} onChange={(e) => setRule(id, field, e.target.value)} />
                                <button className="w-full h-full border rounded-md cursor-pointer text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                                    onClick={() => console.log("TODO")}>
                                    -
                                </button>
                                {idx === arr.length - 1 ? <button className="w-full h-full border rounded-md cursor-pointer text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                                    onClick={addRule}>
                                    +
                                </button> : <div />}
                            </motion.div>
                        ))}

                    </div>
                </div>


                <motion.div key="nextbtn" layout className="w-full flex justify-center py-24">
                    <div className="flex flex-col">
                        <button disabled={true} className="btn"
                            onClick={() => navigate("/" + id + "/rules")}>
                            Next
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </Transition>
    )
}

export default Upload;