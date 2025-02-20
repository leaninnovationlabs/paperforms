import { useMemo } from "react";
import Transition from "../components/Transition";
import ImportIcon from "@/lib/assets/import.svg"
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import useStore from "@/lib/store";
import Input from "@/components/Input";
import { useEffect } from "react";

const Upload = () => {
    const [selected, addRule, setRule] = useStore(useShallow((state) => [state.selected, state.addRule, state.setRule]))

    const id = useMemo(() => selected?.id ?? "", [selected]);

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

            <div className="flex justify-center mt-24 px-4">
                <div className="flex flex-col gap-y-4 w-full max-w-[1000px]">
                    {selected?.rules && selected.rules.map(({ id, field, text }, idx, arr) => (
                        <div key={id} className="grid grid-cols-[auto_2fr_5fr_50px] gap-x-6 w-full">
                            <div className="h-full mr-4 flex items-center text-xl text-muted-foreground ">
                                {idx + 1}.
                            </div>
                            <Input placeholder="Field" value={field} />
                            <Input placeholder="Rule" value={text} />
                            {idx === 0 && <button className="w-full h-full border rounded-md cursor-pointer text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                                onClick={addRule}>
                                +
                            </button>}
                            {idx === arr.length-1 && <button className="w-full h-full border rounded-md cursor-pointer text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-colors"
                                onClick={console.log("TODO")}>
                                -
                            </button>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex justify-center mt-24">
                <div className="flex flex-col">
                    <button disabled={true} className="btn"
                        onClick={() => navigate("/" + id + "/rules")}>
                        Next
                    </button>
                </div>
            </div>
        </Transition>
    )
}

export default Upload;