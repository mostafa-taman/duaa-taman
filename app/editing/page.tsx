"use client";

import {
    CloudinaryContext,
    Video,
} from "cloudinary-react";
import { Ghost, ShieldX } from "lucide-react";

import GradientText from "@/components/general/GradientText";
import GridLoader from "react-spinners/GridLoader";
import { VideoType } from "@/types/ui";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

export const fetchCache = "force-no-store";

const VideoEditingPage: React.FC = () => {
    const { data, error, isLoading } = useSWR("/api/editing", fetcher);

    if (isLoading) return <div className="flex justify-center h-screen items-center">
        <GridLoader color="#7e22ce" className="justify-center" size={30} />
    </div>;

    if (error) return <div className="mx-auto max-w-screen-xl px-4 py-8 h-screen sm:px-6 sm:py-12 lg:py-9">
        <p className="text-neutral-500 flex flex-col gap-8 items-center justify-center h-4/5 text-xl">
            <ShieldX size={80} />
            We encountered technical issues 😅 ... try again in a minute.
        </p>
    </div>;

    if (data === undefined) return <div className="mx-auto max-w-screen-xl px-4 py-8 h-screen sm:px-6 sm:py-12 lg:py-9">
        <p className="text-neutral-500 flex flex-col gap-3  p-8 h-screen items-center justify-center">
            <Ghost size={50} />
            No projects in this category yet 😅 ... Come back later I always update my work.
        </p>
    </div>;


    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">
                    <GradientText text="Video Projects" />
                </h2>
                <p className="text-center text-gray-600">
                    Video editing is my bread and butter, here is some projects I am proud of.
                </p>

                <div className="grid grid-cols-1 gap-28 md:grid-cols-2 lg:grid-cols-3 my-8">
                    {
                        data !== undefined && data.resources.map((video: VideoType) => (
                            <div
                                key={video.public_id}
                                className="relative w-full"
                            >
                                <CloudinaryContext cloud_name="codedog">
                                    <Video
                                        publicId={video.public_id}
                                        cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                                        secure="true"
                                        controls
                                        fallbackContent="Your browser does not support HTML5 video tags."
                                        className="md:h-[500px] md:w-[500px] bg-zinc-700"
                                    />
                                </CloudinaryContext>
                                <div className="w-full mt-4 px-4 py-3 rounded-2xl bg-gray-300 dark:bg-neutral-900/80 shadow flex flex-col gap-1">
                                    <span className="font-bold text-base text-violet-700 dark:text-violet-500">{video.public_id.split("/")[1]}</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default VideoEditingPage;