import DocIcon from "@/lib/assets/doc.svg"
import { useMemo } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox"
import Transition from "../components/Transition";
import useStore from "../lib/store";
import { useShallow } from "zustand/react/shallow";



const Home = (props) => {
    const all = useStore(state => state.allDocs)
    const [selected, setSelected] = useStore(useShallow(state => [state.selected, state.setSelected]));
    const navigate = useNavigate()

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center ">
                        Hello, I'm Mr. Rocket!<br />
                        Select your document type.
                    </h1>
                </div>
            </div>
            <div className="w-full flex justify-center mt-24 gap-x-12">
                {
                    all.map(({ id, label }, idx) => {
                        let isSelected = selected?.id === id
                        return (
                            <div data-selected={isSelected} key={idx} className="card "onClick={() => isSelected ? setSelected(null) : setSelected(id)}>
                                <div className="relative w-[40%] mt-[12%]">
                                    <DocIcon className="" />
                                    <div data-selected={isSelected} className="absolute bg-foreground  data-[selected=true]:bg-lil transition-colors rounded-xl h-fit px-2 py-1 top-[12%] left-[-30%] flex justify-center border-[5px] border-background">
                                        <p className="text-background text-xs text-center font-semibold tracking-widest uppercase">
                                            {id}
                                        </p>
                                    </div>
                                </div>
                                <h2 className="font-bold mt-4">
                                    {label}
                                </h2>

                                <Checkbox className="mt-4 pointer-events-none" checked={isSelected} />

                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full flex justify-center py-24">
                <button disabled={!selected} className="btn"
                    onClick={() => navigate("/" + selected.id + "/upload")}>
                    Next
                </button>
            </div>
        </Transition>
    )
}

export default Home