import Image from "../../../assets/loader.svg";
const Loading = () =>
{
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-transparent">
            {/* <div className="absolute animate-spin m-auto rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-200"/> */}
            <img src={Image} className="rounded-full animate-spin m-auto" width={120} />
        </div>
    );
};

export default Loading;