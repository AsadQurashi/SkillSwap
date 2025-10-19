// "use client";
// import { useIncomingSessions } from "@/app/customHook/useIncomingSessions";
// import { Bell } from "lucide-react";
// import { useRef, useState } from "react";

// export default function NotificationBell() {
//   const {sessions, respond } = useIncomingSessions();
//   const [open, setOpen] = useState(false);
//   const ref = useRef(null);

//   console.log("sessions in notification : ", sessions);

//   return (
//     <div className="relative" ref={ref}>
//       <button onClick={() => setOpen((s) => !s)} className="p-2 rounded-full">
//         <Bell className="w-6 h-6" />
//         {sessions.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//             {sessions.length}
//           </span>
//         )}
//       </button>

//       {open && (
//         <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-50">
//           <div className="p-3 border-b font-semibold">Incoming Requests</div>
//           {sessions.length === 0 ? (
//             <div className="p-4 text-sm text-gray-500">No new requests</div>
//           ) : (
//             <ul className="max-h-80 overflow-y-auto">
//               {sessions.map((s) => (
//                 <li
//                   key={s.id}
//                   className="p-3 flex justify-between items-start border-b"
//                 >
//                   <div>
//                     <div className="font-medium">{s.skillName}</div>
//                     <div className="text-xs text-gray-500">
//                       {new Date(s.scheduleTime).toLocaleString()}
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2 ml-4">
//                     <button
//                       onClick={() => respond(s.id, "accept")}
//                       className="text-xs bg-green-500 px-2 py-1 rounded text-white"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() => respond(s.id, "reject")}
//                       className="text-xs bg-red-500 px-2 py-1 rounded text-white"
//                     >
//                       Reject
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import { useIncomingSessions } from "@/app/customHook/useIncomingSessions";
import {
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function NotificationBell() {
  const { sessions, respond, loading } = useIncomingSessions();
  const [open, setOpen] = useState(false);
  const [responding, setResponding] = useState(null);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Show pulse animation for new notifications
  useEffect(() => {
    if (sessions.length > 0 && !open) {
      setHasNewNotifications(true);
      // Auto-hide pulse after 5 seconds
      const timer = setTimeout(() => setHasNewNotifications(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [sessions.length, open]);

  const handleRespond = async (sessionId, action) => {
    setResponding(sessionId);
    try {
      await respond(sessionId, action);
    } finally {
      setResponding(null);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getTimeStatus = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "text-red-500";
    if (diffHours < 24) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className="relative" ref={ref}>
      {/* Notification Bell Button */}
      <button
        onClick={() => {
          setOpen((s) => !s);
          setHasNewNotifications(false);
        }}
        className="relative p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      >
        <Bell
          className={`w-6 h-6 transition-colors duration-300 ${
            sessions.length > 0 ? "text-blue-600" : "text-gray-600"
          } group-hover:text-blue-700`}
        />

        {/* Notification Badge */}
        {sessions.length > 0 && (
          <>
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
              {sessions.length}
            </span>

            {/* Pulsing Ring Effect for New Notifications */}
            {hasNewNotifications && (
              <span className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full animate-ping opacity-75"></span>
            )}
          </>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/60 z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Session Requests</h3>
                  <p className="text-blue-100 text-sm">
                    {sessions.length} pending request
                    {sessions.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {sessions.length > 0 && (
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
              <p className="text-gray-600 text-sm">Loading requests...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && sessions.length === 0 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">All Caught Up!</h4>
              <p className="text-gray-600 text-sm mb-4">
                No new session requests at the moment.
              </p>
              <p className="text-gray-500 text-xs">
                New requests will appear here automatically
              </p>
            </div>
          )}

          {/* Sessions List */}
          {!loading && sessions.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {sessions.map((session) => (
                  <li
                    key={session.id}
                    className="p-4 hover:bg-blue-50/50 transition-colors duration-200 group"
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-800 text-sm leading-tight truncate">
                            {session.skillName}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0 ml-2">
                            <Clock
                              className={`w-3 h-3 ${getTimeStatus(
                                session.scheduleTime
                              )}`}
                            />
                            <span
                              className={getTimeStatus(session.scheduleTime)}
                            >
                              {formatTime(session.scheduleTime)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(session.scheduleTime).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(session.scheduleTime).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleRespond(session.id, "accept")}
                            disabled={responding === session.id}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {responding === session.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            Accept
                          </button>

                          <button
                            onClick={() => handleRespond(session.id, "reject")}
                            disabled={responding === session.id}
                            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-lg text-xs font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                          >
                            {responding === session.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Response time</span>
                        <span>Quick response recommended</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-1 rounded-full transition-all duration-1000"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          {sessions.length > 0 && (
            <div className="border-t border-gray-100 p-3 bg-gray-50/50">
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>Auto-refresh in 30s</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  View All Requests
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}