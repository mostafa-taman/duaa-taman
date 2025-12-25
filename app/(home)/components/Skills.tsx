"use client";
import { Brush, Camera, Pencil, Video } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import GradientText from "@/components/general/GradientText";
import Link from "next/link";

const mySkills = [
    {
        name: "Video Editing",
        icon: <Video className="text-pink-600" size={40} />,
        desc: "I can edit videos on a professional level using tools like Davinci Reslove and Adobe Premiere."
    },
    {
        name: "Video Creation",
        icon: <Camera className="text-pink-600" size={40} />,
        desc: "I can high quality video about any topic for social media."
    },
    {
        name: "Script Writing",
        icon: <Pencil className="text-pink-600" size={40} />,
        desc: "If you need someone to write a script, you've come to the right place."
    },
    {
        name: "Graphic Design",
        icon: <Brush className="text-pink-600" size={40} />,
        desc: "In this day and age graphics are an essential tool that I know how to weild."
    },
];


    const skills = [
        { name: "Video Editing", level: 90 },
        { name: "Content Creation", level: 90 },
        { name: "Graphic Design", level: 80 },
        { name: "Script Writing", level: 70 },
        { name: "Photoshop", level: 80 },
        { name: "Canva", level: 90 },
        { name: "Adobe Premerie Pro", level: 40 },
        // Add more skills as needed
    ];

const Skills: React.FC = () => {
    return (
        <section>
            <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16" id="skills">
                <h2 className="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">
                    <GradientText text="Skills" />
                </h2>

                <div className="grid grid-cols-1 my-8 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
                    <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Explore some of my skills
                        </h2>

                        <p className="mt-4 text-gray-600">
                            I already have many skills and I am always adding new ones to my arsenal. Here is my main
                            set of skills. If you want more details you can check out my resume below.
                        </p>

                        <Link href="https://drive.google.com/file/d/1VXqcm9lb8SOAyRQuQdZ889vh6bx7lyou/view" target="_">
                            <Button
                                className="mt-8 inline-block rounded gradient-primary bg-gradient-to-l hover:scale-110 px-12 py-3 text-sm font-medium text-white transition"
                            >
                                Download My Resume
                            </Button>
                        </Link>

                    </div>

                    <div className="mt-8 grid grid-cols-1 justify-center">
                                 <div className="space-y-6 mt-6 w-full">
                        {skills.map((skill) => (
                            <div key={skill.name} className="w-full">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{skill.name}</span>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-3">
                                    <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-3">
                                        <motion.div
                                            className="bg-gradient-to-l gradient-primary w-full h-3 rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%`   }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                        {/* {mySkills.map((skill) => <div
                            key={skill.name}
                            className="block group rounded-xl border p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        >
                            <span className="inline-block rounded-lg p-3">
                                {skill.icon}
                            </span>

                            <h2 className="mt-2 font-bold">{skill.name}</h2>

                            <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                                {skill.desc}
                            </p>
                        </div>
                        )} */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;

