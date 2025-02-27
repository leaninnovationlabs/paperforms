import { useMemo } from "react";
import Transition from "../components/Transition";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import useStore from "@/lib/store";
import TextArea from "@/components/TextArea";
import LinkIcon from "@/lib/assets/link.svg"
import CloseIcon from "@/lib/assets/close.svg"

const Rules = () => {
    const [scope, rules, setRules, fields, setFields, file, setFile, generate] = useStore(useShallow((state) => [state.scope, state.rules, state.setRules, state.fields, state.setFields, state.file, state.setFile, state.generate]))

    const id = useMemo(() => scope?.id ?? "", [scope]);

    const navigate = useNavigate();

    const execute = () => {
        generate()
        navigate("/" + id + "/results")
    }

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center">
                        Define {scope?.label ?? ""} Rules
                    </h1>
                    <p className="text-muted-foreground mt-2 text-center">
                        Add your form fields and the rules you want to enforce <span className="underline">see example</span>
                    </p>
                </div>
            </div>



            <div className="flex justify-center py-12 px-2 mt-6">



                <div className="container max-w-[1000px] ">
                    <div className="bg-muted grid grid-cols-[auto_auto_1fr] gap-x-2 py-4 px-4 rounded-md select-none items-center text-muted-foreground h-14 mb-18">
                        <LinkIcon />
                        <p className="text-sm">
                            {file?.name ?? ""}
                        </p>
                        <CloseIcon className="ml-auto cursor-pointer" onClick={() => { setFile(null); navigate(-1) }} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <div className="flex flex-col gap-y-12 w-full ">


                            </div>
                            <h3 className="ml-1 mb-3 text-xs uppercase text-muted-foreground">
                                Fields
                            </h3>
                            <TextArea placeholder="Add fields" value={fields} onChange={(e) => setFields(e.target.value)} className="h-[300px] w-full" />
                        </div>
                        <div>
                            <h3 className="ml-1 mb-3 text-xs uppercase text-muted-foreground">
                                Rules
                            </h3>
                            <TextArea placeholder="Add rules" value={rules} onChange={(e) => setRules(e.target.value)} className="h-[300px] w-full" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center py-12">
            <button disabled={!(fields && rules)} className="btn"
                        onClick={execute}>
                        Validate
                    </button>
            </div>

        </Transition>
    )
}

export default Rules;