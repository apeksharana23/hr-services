"use client";
import Link from "next/link";
import { FaRupeeSign } from "react-icons/fa";

export default function TrainingTypeCard({ item }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col mt-5">
            <div
                className="relative h-64 w-full bg-cover bg-center  "
                style={{
                    backgroundImage: `url(${item.image})`,
                }}
            >
                <span className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                    {item.status}
                </span>
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <h2 className="text-lg	!font-bold !leading-[1.25] !text-[1.3125rem]text-gray-900">{item.type}</h2>
                <div className="flex justify-between items-center gap-5">
                    <p className="text-lg text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-1 text-base font-bold text-blue-500 !mb-4">
                        <FaRupeeSign className="text-base font text-blue-500" />
                        <span>{Number(item.cost).toLocaleString('en-IN')}</span>

                    </div>
                </div>

                <div className="mt-4 text-gray-900 font-semibold flex items-center gap-1">
                    <Link href={`/checkout?courseId=${item._id}`}>
                        <button className="w-md  bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition">
                            Buy Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
