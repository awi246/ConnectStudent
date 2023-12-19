import Image from "../../../assets/favicon.svg";
export const FallbackPage = () =>
{
    return (
        <div className="flex justify-center m-auto items-center h-screen flex-col">
            <img src={Image}/>
            <span className="font-semibold text-[32px] mt-6 text-[#07223A]">Oops!</span>
            <p className="mt-1 text-[#07223A]">Something went wrong, please try again.</p>
        </div>
    );
};
