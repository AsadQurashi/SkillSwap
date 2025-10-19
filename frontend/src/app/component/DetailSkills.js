// "use client";

// import Image from "next/image";

// export function Details({ skill_details, onClose }) {
//   // replace backlaches
//   // const imageUrl = skill_details.image.replace(/\\/g, "/");

//   const imageUrl = skill_details.image
//     ? `${process.env.NEXT_PUBLIC_API_URL}${skill_details.image}`
//     : null;
  
//   console.log("Imageurl :",imageUrl)

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/65 z-50">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
//         {/* Image */}
//         {imageUrl && (
//           <img
//             src={imageUrl} // full URL is fine now
//             alt={skill_details.name}
//             width={500}
//             height={300}
//             className="object-cover w-full h-auto"
//           />
//         )}


//         {/* Content */}
//         <div className="p-6">
//           <h2 className="text-2xl font-bold mb-2">{skill_details.name}</h2>
//           <p className="text-gray-600 mb-4">{skill_details.description}</p>

//           {/* Info */}
//           <div className="space-y-3 text-sm">
//             <p>
//               <span className="font-semibold">ID:</span> {skill_details.id}
//             </p>
//             {skill_details.video && (
//               <a
//                 href={`/${skill_details.video}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-blue-600 hover:underline"
//               >
//                 🎥 Watch Video
//               </a>
//             )}
//             {skill_details.document && (
//               <a
//                 href={`/${skill_details.document}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-green-600 hover:underline"
//               >
//                 📄 View Document
//               </a>
//             )}
//             {skill_details.link && (
//               <a
//                 href={skill_details.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-purple-600 hover:underline"
//               >
//                 🔗 Visit Link
//               </a>
//             )}
//           </div>

//           {/* Level Badge */}
//           {skill_details.level && (
//             <span className="inline-block mt-4 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
//               {skill_details.level}
//             </span>
//           )}

//           {/* Close Button */}
//           <div className="mt-6 flex justify-end">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Play,
  FileText,
  ExternalLink,
  Download,
  Volume2,
  VolumeX,
  Maximize2,
} from "lucide-react";

export function Details({ skill_details, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  const imageUrl = skill_details.image
    ? `${process.env.NEXT_PUBLIC_API_URL}${skill_details.image}`
    : null;

  const videoUrl = skill_details.video
    ? `${process.env.NEXT_PUBLIC_API_URL}${skill_details.video}`
    : null;

  const documentUrl = skill_details.document
    ? `${process.env.NEXT_PUBLIC_API_URL}${skill_details.document}`
    : null;

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "from-green-500 to-emerald-600";
      case "intermediate":
        return "from-blue-500 to-cyan-600";
      case "advanced":
        return "from-purple-500 to-indigo-600";
      case "expert":
        return "from-red-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getLevelIcon = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🚀";
      case "advanced":
        return "💪";
      case "expert":
        return "🏆";
      default:
        return "📚";
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen?.();
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, isFullscreen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
      <div
        ref={modalRef}
        className={`bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${
          isFullscreen ? "w-full h-full" : "max-w-6xl w-full max-h-[90vh]"
        }`}
      >
        {/* Header */}
        <div className="relative">
          {/* Background Image with Overlay */}
          {imageUrl && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
              <img
                src={imageUrl}
                alt={skill_details.name}
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Header Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-2xl">
                      {skill_details.name}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold bg-gradient-to-r ${getLevelColor(
                          skill_details.level
                        )}`}
                      >
                        <span className="text-lg">
                          {getLevelIcon(skill_details.level)}
                        </span>
                        {skill_details.level}
                      </span>
                      <span className="text-blue-200 font-mono">
                        ID: #{skill_details.id}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={toggleFullscreen}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                    >
                      <Maximize2 size={20} className="text-white" />
                    </button>
                    <button
                      onClick={onClose}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                    >
                      <X size={20} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row h-[calc(90vh-16rem)] md:h-[calc(90vh-20rem)]">
          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/20 pb-2">
              {["overview", "media", "resources"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white/20 text-white backdrop-blur-sm"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="text-white">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-200">
                      Description
                    </h3>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {skill_details.description ||
                        "No description provided for this skill."}
                    </p>
                  </div>

                  {/* Skill Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">📚</div>
                      <div className="text-sm text-white/60">Level</div>
                      <div className="font-bold">{skill_details.level}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">🆔</div>
                      <div className="text-sm text-white/60">Skill ID</div>
                      <div className="font-bold">#{skill_details.id}</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">🎯</div>
                      <div className="text-sm text-white/60">Category</div>
                      <div className="font-bold">Professional</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-sm text-white/60">Rating</div>
                      <div className="font-bold">Expert</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "media" && (
                <div className="space-y-6">
                  {/* Video Player */}
                  {videoUrl && (
                    <div className="bg-black/40 rounded-2xl overflow-hidden backdrop-blur-sm">
                      <div className="relative aspect-video bg-black">
                        <video
                          ref={videoRef}
                          src={videoUrl}
                          className="w-full h-full object-cover"
                          onClick={toggleVideoPlayback}
                          muted={isMuted}
                        />
                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-4">
                            <button
                              onClick={toggleVideoPlayback}
                              className="p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                            >
                              <Play
                                size={32}
                                className="text-white"
                                fill="white"
                              />
                            </button>
                            <button
                              onClick={toggleMute}
                              className="p-4 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
                            >
                              {isMuted ? (
                                <VolumeX size={24} className="text-white" />
                              ) : (
                                <Volume2 size={24} className="text-white" />
                              )}
                            </button>
                          </div>
                        </div>
                        {/* Video Status Bar */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                            {isVideoPlaying ? "Playing" : "Paused"}
                          </span>
                          <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                            {isMuted ? "Muted" : "Unmuted"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Gallery */}
                  {imageUrl && (
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                      <h4 className="text-lg font-bold mb-3 text-blue-200">
                        Skill Image
                      </h4>
                      <div className="relative aspect-video rounded-xl overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={skill_details.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "resources" && (
                <div className="space-y-4">
                  {/* External Link */}
                  {skill_details.link && (
                    <a
                      href={skill_details.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                    >
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <ExternalLink size={24} className="text-blue-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">
                          External Resource
                        </h4>
                        <p className="text-white/60 text-sm truncate">
                          {skill_details.link}
                        </p>
                      </div>
                      <div className="text-white/40 group-hover:text-white transition-colors">
                        ↗
                      </div>
                    </a>
                  )}

                  {/* Document Download */}
                  {documentUrl && (
                    <a
                      href={documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 group"
                    >
                      <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                        <FileText size={24} className="text-green-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">
                          Learning Document
                        </h4>
                        <p className="text-white/60 text-sm">
                          PDF/DOC Resource
                        </p>
                      </div>
                      <div className="text-white/40 group-hover:text-white transition-colors">
                        <Download size={20} />
                      </div>
                    </a>
                  )}

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="p-4 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300 text-white font-medium">
                      Request Session
                    </button>
                    <button className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl backdrop-blur-sm transition-all duration-300 text-blue-300 font-medium">
                      Save to Favorites
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Additional Info */}
          <div className="lg:w-80 bg-white/5 backdrop-blur-sm border-l border-white/10 p-6 overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Skill Details</h3>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-bold text-blue-200 mb-2">
                  Proficiency Level
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {getLevelIcon(skill_details.level)}
                  </span>
                  <span className="text-white font-medium">
                    {skill_details.level}
                  </span>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-bold text-blue-200 mb-2">Availability</h4>
                <div className="text-white/80">
                  <div className="flex justify-between mb-1">
                    <span>Session Requests</span>
                    <span className="text-green-400">Open</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <h4 className="font-bold text-blue-200 mb-2">Quick Stats</h4>
                <div className="space-y-2 text-white/80">
                  <div className="flex justify-between">
                    <span>Experience</span>
                    <span className="text-white">2+ Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sessions Held</span>
                    <span className="text-white">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="text-green-400">94%</span>
                  </div>
                </div>
              </div>

              {/* Contact Action */}
              <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105">
                Connect with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}