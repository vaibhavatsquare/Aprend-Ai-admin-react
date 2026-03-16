"use client";

const Dashboard = () => {

    return (
        <div className="px-4 grid grid-cols-3 gap-2 animate-pulse">

            {/* LEFT SIDE */}
            <div className="h-[calc(100vh-80px)] p-2 col-span-2 flex flex-col gap-4">

                {/* Streak Card */}
                <div className="h-[120px] rounded-lg bg-gray-200" />

                {/* Week Selector */}
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                        <div
                            key={i}
                            className="w-[56px] h-[66px] rounded-lg bg-gray-200"
                        />
                    ))}
                </div>

                {/* Task Header */}
                <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-gray-200 rounded" />
                    <div className="h-6 w-24 bg-gray-200 rounded" />
                </div>

                {/* Task List */}
                <div className="flex flex-col gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-[72px] rounded-[14px] bg-gray-200"
                        />
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-4 h-[calc(100vh-80px)] p-2">

                {/* AI Tutor Card */}
                <div className="h-[126px] rounded-xl bg-gray-200" />

                {/* Upload Notes */}
                <div className="h-[166px] rounded-xl bg-gray-200" />

                {/* Question Bank */}
                <div className="h-[60px] rounded-xl bg-gray-200" />

                {/* Weak Spot */}
                <div className="h-[60px] rounded-xl bg-gray-200" />
            </div>
        </div>
    );
};

export default Dashboard;