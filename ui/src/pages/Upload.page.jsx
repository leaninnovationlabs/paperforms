import { useState } from "react";
import Transition from "../components/Transition";
import ImportIcon from "@/lib/assets/import.svg"
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState()
    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles?.length) return;

        const newFile = selectedFiles[0];
        setFile(newFile);
    };

    return (
        <Transition>
            <div className="flex justify-center ">
                <div>
                    <h1 className="text-3xl text-center ">
                        Upload Form W9
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
                    <p data-file={!!file} className="text-sm h-[20px] data-[file=true]:opacity-100 opacity-0 transition-opacity">
                        {file?.name ?? ""}
                    </p>
                </label>
            </div>
            <div className="w-full flex justify-center mt-24">
                <button disabled={!file} className="bg-lil disabled:opacity-20 disabled:bg-gray-500 text-white h-[48px] px-16 rounded-md disabled:cursor-not-allowed cursor-pointer hover:opacity-70 disabled:translate-y-1.5 transition ease-[cubic-bezier(.17,.67,.56,.98)] duration-500"
                    onClick={() => navigate("/upload/w9")}>
                    Next
                </button>
            </div>
        </Transition>
    )
}

export default Upload;