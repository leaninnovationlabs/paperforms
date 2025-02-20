import { useMemo } from "react";
import Transition from "../components/Transition";
import ImportIcon from "@/lib/assets/import.svg"
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import useStore from "@/lib/store";

const Upload = () => {
    const [uploaded, setUploaded, selected] = useStore(useShallow((state) => [state.uploaded, state.setUploaded, state.selected]))

    const id = useMemo(() => selected?.id ?? "", [selected]);

    const navigate = useNavigate();

    const handleFileChange = useCallback((e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles?.length) return;

        const newFile = selectedFiles[0];
        setUploaded(newFile);
    }, [setUploaded])

    const useSample = () => {
        setUploaded(selected.sample)
        navigate("/" + id + "/rules")
    }

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center ">
                        Upload {selected?.label ?? ""}
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        None of your data will be shared. We just need it temporarily to create a report.
                    </p>
                </div>
            </div>
            <div className="flex justify-center mt-24 ">

                <input
                    type="file"
                    id="file"
                    hidden
                    name="file"
                    accept=".pdf,.png"
                    onChange={handleFileChange}
                />
                <label htmlFor="file" className="max-w-[500px] w-full h-[300px] border border-dashed rounded-md flex flex-col gap-y-2 items-center justify-center text-muted-foreground cursor-pointer">
                    <ImportIcon />
                    <p data-file={!!uploaded} className="text-sm h-[20px] data-[file=true]:opacity-100 opacity-0 transition-opacity">
                        {uploaded?.name ?? ""}
                    </p>
                </label>
            </div>
            <div className="w-full flex justify-center mt-24">
                <div className="flex flex-col">


                    <button disabled={!uploaded} className="btn"
                        onClick={() => navigate("/" + id + "/rules")}>
                        Next
                    </button>
                    <p className="text-center mt-6 text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer" onClick={useSample}>
                        or Use Sample
                    </p>
                    
                </div>
            </div>
        </Transition>
    )
}

export default Upload;