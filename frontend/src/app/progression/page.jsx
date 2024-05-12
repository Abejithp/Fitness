import Navbar from "@/components/custom/Navbar";


function Progression() {
    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Navbar />
            <div className="flex flex-col text-white font-satoshi pt-32 px-16">
                <p className="font-medium uppercase text-lg">My Progress</p>
            </div>
        </div>
    );
}

export default Progression;