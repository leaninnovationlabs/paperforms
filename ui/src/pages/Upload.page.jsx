import { useMemo, useRef } from "react";
import Transition from "../components/Transition";
import ImportIcon from "@/lib/assets/import.svg"
import CloseIcon from "@/lib/assets/close.svg"
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useCallback } from "react";
import useStore from "@/lib/store";

const Upload = () => {
    const [file, setFile, selected] = useStore(useShallow((state) => [state.file, state.setFile, state.scope]))

    const id = useMemo(() => selected?.id ?? "", [selected]);

    const navigate = useNavigate();

    const ref = useRef();

    const handleFileChange = useCallback((e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles?.length) return;

        const newFile = selectedFiles[0];
        setFile(newFile);
    }, [setFile])

    const uploadSample = useCallback(async () => {
        // Programtically upload associated sample file
        if (ref.current) {
            const res = await fetch(selected.sample);
            if (!res.ok) {
              console.error(`Failed to fetch file: ${res.statusText}`);
              return
            }
            const blob = await res.blob();

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(new File([blob], selected.sample.split('/').pop() || 'downloaded-file', { type: blob.type }));
            ref.current.files = dataTransfer.files;
            ref.current.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }, [selected])

    const clear = (e) =>{
        e.preventDefault()
        if (ref.current) {
            ref.current.value = '';
            setFile(null)
        }
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
                    ref={ref}
                    type="file"
                    id="file"
                    hidden
                    name="file"
                    accept=".pdf,.png"
                    onChange={handleFileChange}
                />
                <label htmlFor="file" className="relative max-w-[500px] w-full h-[300px] border border-dashed rounded-md flex flex-col gap-y-2 items-center justify-center text-muted-foreground cursor-pointer">
                    <ImportIcon />
                    <p data-file={!!file} className="text-sm h-[20px] data-[file=true]:opacity-100 opacity-0 transition-opacity">
                        {file?.name ?? ""}
                    </p>
                    <CloseIcon data-file={!!file} className="absolute top-3 right-3 data-[file=true]:opacity-100 opacity-0 transition-opacity" onClick={clear}/>
                </label>
            </div>
            <div className="w-full flex justify-center pt-16 pb-6">
                <div className="flex flex-col">

                    <p className="text-center mb-12 text-muted-foreground text-sm hover:text-foreground transition-colors cursor-pointer select-none" onClick={uploadSample}>
                        or Use Sample File 
                    </p>


                    <button disabled={!file} className="btn"
                        onClick={() => navigate("/" + id + "/rules")}>
                        Next
                    </button>


                </div>
            </div>
        </Transition>
    )
}

export default Upload;