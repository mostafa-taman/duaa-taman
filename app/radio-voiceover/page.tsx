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

export const fetchCache = "force-no-store";

const fetcher = async (url: string) => {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const ProjectPage: React.FC = () => {
    const { data, error, isLoading } = useSWR("/api/audio", fetcher);

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
                    <GradientText text="Radio & Voice Over Projects" />
                </h2>
                <p className="text-center text-gray-600">
                    Videos are not my only area of expertise, but I can also do voice over & all kinds of audio content when needed.
                </p>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 my-12">
                  {data?.resources.map((video: VideoType) => (
                    <div
                      key={video.public_id}
                      className="group w-full"
                    >
                      {/* Card */}
                      <div className="flex flex-col">
                        
                        {/* Video Container */}
                        <div className="overflow-hidden rounded-3xl shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 bg-neutral-900">
                          <CloudinaryContext cloud_name="codedog">
                            <Video
                              publicId={video.public_id}
                              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                              secure="true"
                              controls
                              fallbackContent="Your browser does not support HTML5 video tags."
                              className="w-full h-[420px] object-cover"
                            />
                          </CloudinaryContext>
                        </div>

                        {/* Title Section */}
                        <div className="mt-6 px-2">
                          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-100 transition-colors duration-300 group-hover:text-violet-500">
                            {video.display_name}
                          </h3>

                          {/* Accent line */}
                          <div className="mt-3 h-[2px] w-8 bg-violet-500 rounded-full transition-all duration-300 group-hover:w-14" />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectPage;