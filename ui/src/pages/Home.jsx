import DocIcon from "@/lib/assets/doc.svg"



const Home = (props) => {
    return (
        <div className="w-full h-full pt-16">
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
                    ["w9", "w2"].map((x, idx) => (
                        <div key={idx} className="relative h-[270px] w-[220px] border-[rgba(236,236,236,0.43)] dark:border shadow-2xl rounded-2xl cursor-pointer p-4 flex flex-col items-center">
                            <div className="relative w-[40%] mt-[15%]">
                                <DocIcon className=""/>
                                <div className="absolute bg-foreground w-[50%] rounded-xl h-fit px-4 py-1 top-[12%] left-[-20%] flex justify-center border-[5px] border-background">
                                    <p className="text-background text-xs text-center uppercase font-semibold tracking-widest">
                                        {x}
                                    </p>
                                </div>
                            </div>
                            <h2 className="uppercase font-bold pt-6">

        
                                {`Form ${x}`}
                            </h2>
                            
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home