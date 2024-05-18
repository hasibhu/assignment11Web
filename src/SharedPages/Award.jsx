

const Award = () => {
    return (
        <div className="mt-10 border-t-4 border-lime-500 rounded-xl">
            <h1 className="text-5xl font-bold text-center mb-10 mt-10 text-red-400">Our Award Wining Volunteer Groups</h1>
            <h1 className="text-2xl font-bold text-center mb-4 text-yellow-500">Our Recent Award Photos</h1>
            <div className="flex flex-row items-center justify-center gap-4">
                <div className="border border-blue-500 p-2">
                    <img className="w-[450px] border border-red-400" src={'https://i.ibb.co/hd6Crsg/award1.jpg'} alt="" />
                    <h2 className="text-center text-red-800 font-bold">Global Volunteer Award Winner, 2020 </h2>
                </div>
                <div className="border border-blue-500 p-2">
                    <img className="w-[450px] border border-red-400" src={'https://i.ibb.co/VH1FWf5/award2.jpg'} alt="" />
                    <h2 className="text-center text-red-800 font-bold">Global Volunteer Award Winner, 2023 </h2>
                </div>
            </div>
        </div>
    );
};

export default Award;