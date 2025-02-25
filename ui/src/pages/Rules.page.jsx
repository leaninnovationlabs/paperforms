import { useMemo } from "react";
import Transition from "../components/Transition";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/lib/store";
import TextArea from "@/components/TextArea";
import LinkIcon from "@/lib/assets/link.svg"
import CloseIcon from "@/lib/assets/close.svg"

const Rules = () => {
    const [scope, rules, setRules, fields, setFields, file, setFile] = useStore(useShallow((state) => [state.scope, state.rules, state.setRules, state.fields, state.setFields, state.file, state.setFile]))

    const id = useMemo(() => scope?.id ?? "", [scope]);

    const navigate = useNavigate();

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center ">
                        Define {scope?.label ?? ""} Rules
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Add your form fields and the rules you want to enforce <span className="underline">see example</span>
                    </p>
                </div>
            </div>


            <div className="flex justify-center mt-18 px-4 pb-36">

                <div className="flex flex-col gap-y-12 w-full max-w-[650px]">
                    <div className="bg-muted grid grid-cols-[auto_auto_1fr] gap-x-2 py-4 px-2 rounded-md select-none items-center text-muted-foreground">
                        <LinkIcon />
                        <p className="text-sm">
                            {file?.name ?? ""}
                        </p>
                        <CloseIcon className="ml-auto cursor-pointer" onClick={() => {setFile(null); navigate(-1)} }/>
                    </div>


                    <div>
                        <h3 className="mb-6">
                            Fields
                        </h3>
                        <TextArea placeholder="Add fields" value={fields} onChange={(e) => setFields(e.target.value)} className="h-[300px]" />
                    </div>
                    <div>
                        <h3 className="mb-6">
                            Rules
                        </h3>
                        <TextArea placeholder="Add rules" value={rules} onChange={(e) => setRules(e.target.value)} className="h-[300px]" />
                    </div>
                </div>


            </div>


            <footer className="sticky bottom-0 bg-background w-full flex justify-center items-center h-24 border-t ">
                <div className="flex flex-col">
                    <button disabled={!(fields && rules)} className="btn"
                        onClick={() => navigate("/" + id + "/rules")}>
                        Validate Form
                    </button>
                </div>
            </footer>

        </Transition>
    )
}

export default Rules;