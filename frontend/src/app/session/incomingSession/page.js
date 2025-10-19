// "use client";

// import { useIncomingSessions } from "@/app/customHook/useIncomingSessions";
// export default function InComingSession() {
//   const { sessions, loading, error, respond } = useIncomingSessions();

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold">Incoming Session Request</h2>
//       {sessions.length === 0 ? (
//         <p className="text-gray-500 mt-2">No new request</p>
//       ) : (
//         <ul className="space-y-3 mt-4">
//           {sessions.map((s) => (
//             <li
//               key={s.id}
//               className="p-4 bg-white shadow rounedd-lg flex justify-between"
//             >
//               <div>
//                 <h3 className="font-medium"> {s.skillName} </h3>
//                 <p className="text-sm text-gray-500">
//                   Scheduled : {new Date(s.scheduleTime).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => respond(s.id, "accept")}
//                   className="px-3 py-1 bg-green-500 text-white rounded-lg"
//                 >
//                   Accept
//                 </button>
//                 <button
//                   onClick={() => respond(s.id, "reject")}
//                   className="px-3 py-1 bg-red-500 text-white rounded-lg"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


"use client";

import { useIncomingSessions } from "@/app/customHook/useIncomingSessions";
import {
  Loader2,
  Calendar,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function InComingSession() {
  const { sessions, loading, error, respond } = useIncomingSessions();
  const [isMounted, setIsMounted] = useState(false);
  const [responding, setResponding] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    return {
      date: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      relative: getRelativeTime(date),
    };
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMs = date - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else {
      return "soon";
    }
  };

  if (loading) {
    return (
      <div className="min-h-64 flex flex-col justify-center items-center py-12">
        <div className="relative">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading session requests...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-red-800 mb-2">
          Unable to load sessions
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/60 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-8 text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Session Requests
                </h1>
                <p className="text-blue-100 text-lg">
                  Manage your incoming learning sessions
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-blue-200 text-sm">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-blue-200 text-sm">Accepted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0</div>
                <div className="text-blue-200 text-sm">Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        {sessions.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/60 p-12 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Session Requests
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              You&apos;re all caught up! New session requests will appear here when
              someone wants to learn from you.
            </p>
            <div className="text-sm text-gray-500">
              Share your skills to get more session requests
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {sessions.map((session) => {
              const timeInfo = formatTime(session.scheduleTime);
              return (
                <div
                  key={session.id}
                  className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl border border-white/60 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      {/* Session Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {session.skillName}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                <span>{timeInfo.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-green-500" />
                                <span>{timeInfo.time}</span>
                              </div>
                              <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                {timeInfo.relative}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-500 mb-1">
                              Requested By
                            </div>
                            <div className="font-semibold text-gray-800">
                              {session.requesterName || "Anonymous"}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-500 mb-1">
                              Duration
                            </div>
                            <div className="font-semibold text-gray-800">
                              60 mins
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-500 mb-1">
                              Session Type
                            </div>
                            <div className="font-semibold text-gray-800">
                              One-on-One
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3 lg:w-48">
                        <button
                          onClick={() => handleRespond(session.id, "accept")}
                          disabled={responding === session.id}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {responding === session.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                          Accept Session
                        </button>

                        <button
                          onClick={() => handleRespond(session.id, "reject")}
                          disabled={responding === session.id}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {responding === session.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          Decline
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Response Time</span>
                        <span>Quick responses increase acceptance rate</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips Section */}
        {sessions.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bell className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 mb-2">Quick Tips</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>
                    • Respond to session requests within 24 hours for best
                    results
                  </li>
                  <li>• Schedule sessions at least 2 hours in advance</li>
                  <li>• Prepare your materials before the session starts</li>
                  <li>• Confirm the meeting link 15 minutes before starting</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}