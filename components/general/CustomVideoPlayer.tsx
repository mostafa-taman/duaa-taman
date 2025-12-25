"use client";

import React, { useEffect, useRef, useState } from "react";

const btnBase =
    "w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-700 transition";

interface CustomVideoPlayerProps extends React.HTMLAttributes<HTMLVideoElement> {
    url: string;
    poster?: string;
    className?: string;
    type?: string;
    vertical?: boolean;
    onPlay?: () => void;
    onPause?: () => void;
}

const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
        .toString()
        .padStart(2, "0");
    const s = Math.floor(secs % 60)
        .toString()
        .padStart(2, "0");
    return `${m}:${s}`;
};

const CustomVideoPlayer: React.FC<CustomVideoPlayerProps> = ({
    url,
    poster,
    className = "",
    type,
    vertical = false,
    onPlay,
    onPause
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const [fullscreen] = useState(false);
    const [seeking, setSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Use 9/16 for vertical, 16/9 for horizontal
    const aspectRatio = vertical ? "9/16" : "16/9";

    useEffect(() => {
        const handleFullscreen = () => {
            const fsEl = document.fullscreenElement || document.fullscreenElement;
            setIsFullscreen(!!fsEl);
        };
        document.addEventListener("fullscreenchange", handleFullscreen);
        document.addEventListener("webkitfullscreenchange", handleFullscreen);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreen);
            document.removeEventListener("webkitfullscreenchange", handleFullscreen);
        };
    }, []);

    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play();
            setPlaying(true);
        } else {
            v.pause();
            setPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrent(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const value = Number(e.target.value);
        setCurrent(value);
        videoRef.current.currentTime = value;
        setSeekValue(value);
    };

    const handleSeekMouseDown = () => setSeeking(true);
    const handleSeekMouseUp = () => setSeeking(false);

    const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const v = Number(e.target.value);
        setVolume(v);
        videoRef.current.volume = v;
        setMuted(v === 0);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !muted;
        setMuted(!muted);
    };

    const toggleFullscreen = () => {
        const v = videoRef.current;
        if (!v) return;
        if (!fullscreen) {
            if (v.requestFullscreen) v.requestFullscreen();
            // @ts-expect-error: webkitRequestFullscreen is for Safari support
            else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            // @ts-expect-error: webkitRequestFullscreen is for Safari support
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
    };


    // If YouTube, just render iframe with native controls and correct aspect ratio
    if (type === "youtube") {
        return (
            <div className={`relative bg-black rounded-2xl overflow-hidden shadow-lg ${className}`} style={{ aspectRatio }}>
                <iframe
                    src={url}
                    title="YouTube video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                    style={{ border: "none", aspectRatio }}
                />
            </div>
        );
    }

    return (
        <div
            className={`relative bg-black rounded-2xl overflow-hidden shadow-lg ${className}`}
            style={{ aspectRatio, minHeight: 150 }}
        >
            <video
                ref={videoRef}
                src={url}
                poster={poster}
                className={
                    vertical
                        ? `w-full h-full${isFullscreen ? " vertical-fullscreen" : " object-contain"}`
                        : "w-full h-full object-cover"
                }
                onClick={togglePlay}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => { setPlaying(true); onPlay?.(); }}
                onPause={() => { setPlaying(false); onPause?.(); }}
                muted={muted}
                tabIndex={0}
                style={{ background: "#000" }}
            />
            {/* Controls */}
            <div className="absolute bottom-0 left-0 w-full flex flex-col bg-gradient-to-t from-black/80 via-black/30 to-transparent px-4 pb-3 pt-8">
                {/* Progress Bar */}
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={seeking ? seekValue : (current ?? 0)}
                    onChange={handleSeek}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={handleSeekMouseUp}
                    className="w-full h-2 appearance-none bg-gray-300 rounded-full outline-none"
                    style={{
                        background: `linear-gradient(to right, #3b82f6 ${(current / (duration || 1)) * 100}%, #d1d5db ${(current / (duration || 1)) * 100}%)`
                    }}
                />

                <div className={`flex items-center gap-2 ${vertical ? "sm:flex-col sm:gap-1" : ""}`}>
                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className={btnBase}
                        aria-label={playing ? "Pause" : "Play"}
                    >
                        {playing ? (
                            <svg width="24" height="24" fill="white">
                                <rect x="6" y="5" width="4" height="14" rx="1" />
                                <rect x="14" y="5" width="4" height="14" rx="1" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" fill="white">
                                <polygon points="6,4 20,12 6,20" />
                            </svg>
                        )}
                    </button>
                    {/* Mute/Unmute */}
                    <button
                        onClick={toggleMute}
                        className={btnBase}
                        aria-label={muted ? "Unmute" : "Mute"}
                    >
                        {muted || volume === 0 ? (
                            <svg width="24" height="24" fill="white">
                                <path d="M6 9v6h4l5 5V4l-5 5H6z" />
                                <line x1="23" y1="9" x2="17" y2="15" stroke="white" strokeWidth="2" />
                                <line x1="17" y1="9" x2="23" y2="15" stroke="white" strokeWidth="2" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" fill="white">
                                <path d="M6 9v6h4l5 5V4l-5 5H6z" />
                            </svg>
                        )}
                    </button>
                    {/* Volume */}
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={typeof volume === "number" ? volume : 1}
                        onChange={handleVolume}
                        className="w-20 h-2 appearance-none bg-gray-300 rounded-full accent-blue-500"
                        style={{
                            background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #d1d5db ${volume * 100}%)`
                        }}
                    />
                    {/* Time */}
                    <span className="text-xs text-white font-mono ml-2">
                        {formatTime(current)} / {formatTime(duration)}
                    </span>
                    <div className="flex-1" />
                    {/* Fullscreen */}
                    <button
                        onClick={toggleFullscreen}
                        className={btnBase}
                        aria-label={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                        {fullscreen ? (
                            <svg width="24" height="24" fill="currentColor">
                                <path d="M9 9H5v4M15 15h4v-4" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" fill="currentColor">
                                <path d="M4 4h7M4 4v7M20 20h-7M20 20v-7" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomVideoPlayer;