"use client";
import { motion } from "framer-motion";
import SocialMedia from "@/components/general/SocialMedia";

const Footer: React.FC = () => {

    return (
        <footer className="relative px-4 pb-8 mt-24 overflow-hidden">
            {/* Decorative SVGs */}
            <motion.svg
                className="absolute top-0 left-0 w-64 h-64 opacity-20 -z-10"
                viewBox="0 0 200 200"
                fill="none"
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <circle cx="100" cy="100" r="100" fill="url(#footer-gradient1)" />
                <defs>
                    <linearGradient id="footer-gradient1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3b82f6" />
                        <stop offset="1" stopColor="#a78bfa" />
                    </linearGradient>
                </defs>
            </motion.svg>
            <motion.svg
                className="absolute bottom-0 right-0 w-64 h-64 opacity-20 -z-10"
                viewBox="0 0 200 200"
                fill="none"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            >
                <rect x="0" y="0" width="200" height="200" rx="60" fill="url(#footer-gradient2)" />
                <defs>
                    <linearGradient id="footer-gradient2" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#06b6d4" />
                        <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                </defs>
            </motion.svg>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    className="flex flex-col items-center text-center mb-8"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 drop-shadow">
                       Let&apos;s Connect!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-4">
                        Reach out through any platform below or send an email. I look forward to collaborating with you!
                    </p>
                    <div className="w-20 h-1 rounded-full bg-gradient-to-r gradient-primary opacity-70 mx-auto mb-2" />
                </motion.div>

                {/* Animated IconGrid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                   <SocialMedia />
                </motion.div>

                <motion.div
                    className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    &copy; {new Date().getFullYear()} Duaa Taman. All rights reserved.
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;