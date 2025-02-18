import DocIcon from "@/lib/assets/doc.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Checkbox from "../components/Checkbox"
import Transition from "../components/Transition";



const Home = (props) => {
    const [selected, setSelected] = useState();
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
                    [
                        { id: "w2", label: "Form W2" },
                        { id: "w9", label: "Form W9" },
                        { id: "custom", label: "Create your Own" }
                    ].map(({ id, label }, idx) => (
                        <div data-selected={selected === id} key={idx} className="card"
                            onClick={() => selected === id ? setSelected(null) : setSelected(id)}
                        >
                            <div className="relative w-[40%] mt-[12%]">
                                <DocIcon className="" />
                                <div data-selected={selected === id} className="absolute bg-foreground  data-[selected=true]:bg-lil transition-colors rounded-xl h-fit px-2 py-1 top-[12%] left-[-30%] flex justify-center border-[5px] border-background">
                                    <p className="text-background text-xs text-center font-semibold tracking-widest uppercase">
                                        {id}
                                    </p>
                                </div>
                            </div>
                            <h2 className="font-bold mt-4">
                                {label}
                            </h2>

                            <Checkbox className="mt-4 pointer-events-none" checked={selected === id} />

                        </div>
                    ))
                }
            </div>
            <div className="w-full flex justify-center mt-24">
                <button disabled={!selected} className="bg-lil disabled:opacity-20 disabled:bg-gray-500 text-white h-[48px] px-16 rounded-md disabled:cursor-not-allowed cursor-pointer hover:opacity-70 disabled:translate-y-1.5 transition ease-[cubic-bezier(.17,.67,.56,.98)] duration-500"
                    onClick={() => navigate("/upload/w9")}>
                    Next
                </button>
            </div>
        </Transition>
    )
}

export default Home