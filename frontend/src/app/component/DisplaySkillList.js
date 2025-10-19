// // "use client";

// // import { useEffect, useState } from "react";
// // import { GetAllSkills, DeleteSkill } from "../services/skillServieces";
// // import { getToken } from "../utils/token";
// // import { Loader2, Edit, Trash2, XCircle } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import { Details } from "./DetailSkills";
// // import CreateSession from "../services/sessionServices";

// // export default function SkillList({  reFreshTrigger  }) {
// //   const [skills, setSkills] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [confirmDelete, setConfirmDelete] = useState(null);
// //   const [selectSkill, setSelectedSkill] = useState(null);
// //   const [session, setSession] = useState(0)
  
// //   const router = useRouter();

  

// //   const loadSkills = async () => {
// //     try {
// //       setError("");
// //       const token = getToken();
// //       const { data } = await GetAllSkills(token);
// //       setSkills(data);
// //     } catch (err) {
// //       console.error("Error fetching skills:", err);
// //       setError("Failed to load skills. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!confirmDelete) return;
// //     try {
// //       const token = getToken();
// //       await DeleteSkill(confirmDelete.id, token);
// //       setSkills((prev) =>
// //         prev.filter((skill) => skill.id !== confirmDelete.id)
// //       );
// //       setConfirmDelete(null);
// //     } catch (err) {
// //       console.error("Delete failed:", err);
// //       setError("Failed to delete skill. Please try again.");
// //     }
// //   };

// //   // CreateSession
// //   const createSession = async (skill) =>
// //   {

// //     const exact_time = new Date();
// //     // const scheduleTime = exact_time.toISOString().split('.')[0]; //UTC time standard
// //     const scheduleTime = exact_time.toLocaleString("sv-SE").replace(" ", ":");
// //     console.log("Exact Time : ", scheduleTime);
// //     console.log("User id ", skill.user_id)
// //     if (!skill.user_id)
// //     { setError("User dosen't exist") }
// //     try {
// //       const token = getToken();
// //       console.log("Session token :", token);
// //       const sessionData = {
// //         skillName: skill.name, 
// //         scheduleTime: scheduleTime,
// //         reciever_id : skill.user_id
// //       }
// //       const response = await CreateSession(sessionData, token);
// //       setSession(response.data);
// //       console.log("Session response : ", response);
// //       setError("");
// //     }
// //     catch(err)
// //     {
// //       console.error("Session creation failed:", err);
// //     setError("Failed to create session. Please try again.");
// //   }

// //   }
  
// //   useEffect(() => {
// //     loadSkills();
// //   }, [reFreshTrigger]);

// //   const handleEdit = (skill) => 
// //   {
// //     // console.log("handleEdit",skill)
// //     router.push(`/skills/CreateSkill/${skill.id}`); // navigates to edit page
// //   }
// // console.log("SkillList props:", { reFreshTrigger });
  

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center py-12">
// //         <Loader2 className="animate-spin text-indigo-500" size={32} />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mt-8 px-3 md:px-6">
// //       {error && (
// //         <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200">
// //           {error}
// //         </div>
// //       )}

// //       {skills.length === 0 ? (
// //         <div className="flex justify-center items-center py-12">
// //           <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100">
// //             <p className="text-lg font-medium text-gray-700">No skills found</p>
// //             <p className="text-sm text-gray-500 mt-1">
// //               Try adding a new skill to get started!
// //             </p>
// //           </div>
// //         </div>
// //       ) : (
// //         <div className="grid gap-4">
// //           {skills.map((skill) => (
// //             <div
// //               key={skill.id}
// //               onClick={() => setSelectedSkill(skill)}
// //               className="p-3 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex justify-between items-center border border-gray-100"
// //             >
// //               <div>
// //                 <h3 className="font-semibold text-lg text-gray-800">
// //                   {skill.name}
// //                 </h3>
// //                 <p className="text-gray-600 mt-1">{skill.description}</p>
// //                 <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
// //                   {skill.level}
// //                 </span>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => {
// //                     handleEdit(skill);
// //                     console.log("Sending skill", skill);
// //                   }}
// //                   className="text-blue-500 flex items-center gap-1"
// //                 >
// //                   <Edit size={18} />
// //                 </button>
// //                 <button
// //                   onClick={() => setConfirmDelete(skill)}
// //                   className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
// //                 >
// //                   <Trash2 size={18} />
// //                 </button>
// //                 <button 
// //                   onClick={() => {
// //                     createSession(skill);
// //                     console.log("User id", skill.user_id)
                    
// //                   }}
// //                   className="text-blue-500 flex items-center gap-1">
// //                   Creat Session
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //             {selectSkill && (
// //               <Details skill_details={selectSkill}
// //                 onClose={() => setSelectedSkill(null)}
// //               />
// //             )}
// //         </div>
// //       )}

// //       {/* Custom Delete Confirmation Modal */}
// //       {confirmDelete && (
// //         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
// //           <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
// //             <XCircle className="mx-auto text-red-500" size={40} />
// //             <h2 className="text-lg font-semibold mt-3">
// //               Delete “{confirmDelete.name}”?
// //             </h2>
// //             <p className="text-sm text-gray-600 mt-1">
// //               This action cannot be undone.
// //             </p>
// //             <div className="mt-4 flex justify-center gap-3">
// //               <button
// //                 onClick={() => setConfirmDelete(null)}
// //                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={handleDelete}
// //                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { GetAllSkills, DeleteSkill } from "../services/skillServieces";
// import { getToken } from "../utils/token";
// import { Loader2, Edit, Trash2, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { Details } from "./DetailSkills";
// import { CreateSession } from "../services/sessionServices";

// export default function SkillList({ reFreshTrigger }) {
//   const [skills, setSkills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [confirmDelete, setConfirmDelete] = useState(null);
//   const [selectSkill, setSelectedSkill] = useState(null);
//   const [session, setSession] = useState(0);

//   const router = useRouter();

//   const loadSkills = async () => {
//     try {
//       setError("");
//       const token = getToken();
//       const { data } = await GetAllSkills(token);
//       setSkills(data);
//     } catch (err) {
//       console.error("Error fetching skills:", err);
//       setError("Failed to load skills. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirmDelete) return;
//     try {
//       const token = getToken();
//       await DeleteSkill(confirmDelete.id, token);
//       setSkills((prev) =>
//         prev.filter((skill) => skill.id !== confirmDelete.id)
//       );
//       setConfirmDelete(null);
//     } catch (err) {
//       console.error("Delete failed:", err);
//       setError("Failed to delete skill. Please try again.");
//     }
//   };

//   // CreateSession
//   const createSession = async (skill) => {
//     const exact_time = new Date();
//     const scheduleTime = exact_time.toLocaleString("sv-SE").replace(" ", ":");
//     console.log("Exact Time : ", scheduleTime);
//     console.log("User id ", skill.user_id);

//     if (!skill.user_id) {
//       setError("User doesn't exist");
//       return;
//     }

//     try {
//       const token = getToken();
//       console.log("Session token :", token);
//       const sessionData = {
//         skillName: skill.name,
//         scheduleTime: scheduleTime,
//         reciever_id: skill.user_id,
//       };
//       const response = await CreateSession(sessionData, token);
//       setSession(response.data);
//       console.log("Session response : ", response);
//       setError("");
//     } catch (err) {
//       console.error("Session creation failed:", err);
//       setError("Failed to create session. Please try again.");
//     }
//   };

//   useEffect(() => {
//     loadSkills();
//   }, [reFreshTrigger]);

//   const handleEdit = (skill, e) => {
//     e.stopPropagation(); // Prevent card click
//     router.push(`/skills/CreateSkill/${skill.id}`);
//   };

//   const handleDeleteClick = (skill, e) => {
//     e.stopPropagation(); // Prevent card click
//     setConfirmDelete(skill);
//   };

//   const handleCreateSession = (skill, e) => {
//     e.stopPropagation(); // Prevent card click
//     createSession(skill);
//   };

//   const handleCardClick = (skill) => {
//     setSelectedSkill(skill);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <Loader2 className="animate-spin text-indigo-500" size={32} />
//       </div>
//     );
//   }

//   return (
//     <div className="mt-8 px-3 md:px-6">
//       {error && (
//         <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200">
//           {error}
//         </div>
//       )}

//       {skills.length === 0 ? (
//         <div className="flex justify-center items-center py-12">
//           <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-100">
//             <p className="text-lg font-medium text-gray-700">No skills found</p>
//             <p className="text-sm text-gray-500 mt-1">
//               Try adding a new skill to get started!
//             </p>
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-4">
//           {skills.map((skill) => (
//             <div
//               key={skill.id}
//               onClick={() => handleCardClick(skill)}
//               className="p-3 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex justify-between items-center border border-gray-100 cursor-pointer"
//             >
//               <div className="flex-1">
//                 <h3 className="font-semibold text-lg text-gray-800">
//                   {skill.name}
//                 </h3>
//                 <p className="text-gray-600 mt-1">{skill.description}</p>
//                 <span className="inline-block mt-2 text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
//                   {skill.level}
//                 </span>
//               </div>
//               <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
//                 <button
//                   onClick={(e) => handleEdit(skill, e)}
//                   className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition-colors"
//                 >
//                   <Edit size={18} />
//                 </button>
//                 <button
//                   onClick={(e) => handleDeleteClick(skill, e)}
//                   className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//                 <button
//                   onClick={(e) => handleCreateSession(skill, e)}
//                   className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition-colors text-sm font-medium"
//                 >
//                   Request Session
//                 </button>
//               </div>
//             </div>
//           ))}
//           {selectSkill && (
//             <Details
//               skill_details={selectSkill}
//               onClose={() => setSelectedSkill(null)}
//             />
//           )}
//         </div>
//       )}

//       {/* Custom Delete Confirmation Modal */}
//       {confirmDelete && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
//             <XCircle className="mx-auto text-red-500" size={40} />
//             <h2 className="text-lg font-semibold mt-3">
//               Delete &quot;{confirmDelete.name}&quot;?
//             </h2>
//             <p className="text-sm text-gray-600 mt-1">
//               This action cannot be undone.
//             </p>
//             <div className="mt-4 flex justify-center gap-3">
//               <button
//                 onClick={() => setConfirmDelete(null)}
//                 className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { GetAllSkills, DeleteSkill } from "../services/skillServieces";
import { getToken } from "../utils/token";
import {
  Loader2,
  Edit,
  Trash2,
  XCircle,
  Search,
  Filter,
  User,
  Calendar,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Details } from "./DetailSkills";
import { CreateSession } from "../services/sessionServices";

export default function SkillList({ reFreshTrigger }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectSkill, setSelectedSkill] = useState(null);
  const [session, setSession] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const loadSkills = async () => {
    try {
      setError("");
      const token = getToken();
      const { data } = await GetAllSkills(token);
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Failed to load skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const token = getToken();
      await DeleteSkill(confirmDelete.id, token);
      setSkills((prev) =>
        prev.filter((skill) => skill.id !== confirmDelete.id)
      );
      setConfirmDelete(null);
      setSuccessMessage("Skill deleted successfully! 🗑️");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete skill. Please try again.");
    }
  };

  const createSession = async (skill) => {
    const exact_time = new Date();
    const scheduleTime = exact_time.toLocaleString("sv-SE").replace(" ", ":");

    if (!skill.user_id) {
      setError("User doesn't exist");
      return;
    }

    try {
      const token = getToken();
      const sessionData = {
        skillName: skill.name,
        scheduleTime: scheduleTime,
        reciever_id: skill.user_id,
      };
      const response = await CreateSession(sessionData, token);
      setSession(response.data);
      setSuccessMessage(`Session requested for ${skill.name}! 📅`);
      setTimeout(() => setSuccessMessage(""), 3000);
      setError("");
    } catch (err) {
      console.error("Session creation failed:", err);
      setError("Failed to create session. Please try again.");
    }
  };

  useEffect(() => {
    loadSkills();
  }, [reFreshTrigger]);

  const handleEdit = (skill, e) => {
    e.stopPropagation();
    router.push(`/skills/CreateSkill/${skill.id}`);
  };

  const handleDeleteClick = (skill, e) => {
    e.stopPropagation();
    setConfirmDelete(skill);
  };

  const handleCreateSession = (skill, e) => {
    e.stopPropagation();
    createSession(skill);
  };

  const handleCardClick = (skill) => {
    setSelectedSkill(skill);
  };

  const handleAddNewSkill = () => {
    router.push("/skills/CreateSkill");
  };

  // Filter skills based on search and filter
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === "all" || skill.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "from-green-500 to-emerald-600";
      case "Intermediate":
        return "from-blue-500 to-cyan-600";
      case "Advanced":
        return "from-purple-500 to-indigo-600";
      case "Expert":
        return "from-red-500 to-pink-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case "Beginner":
        return "🌱";
      case "Intermediate":
        return "🚀";
      case "Advanced":
        return "💪";
      case "Expert":
        return "🏆";
      default:
        return "📚";
    }
  };

  if (loading) {
    return (
      <div className="min-h-64 flex flex-col justify-center items-center py-12">
        <div className="relative">
          <Loader2 className="animate-spin text-blue-600" size={48} />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-20 animate-pulse"></div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4">
      {/* Unified Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/60 overflow-hidden mb-8">
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Available Skills
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover and connect with skilled professionals. Request sessions
              to learn from the best in your community.
            </p>
          </div>

          {/* Search and Controls Section */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-6">
              {/* Search and Filter Row */}
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center flex-1 w-full">
                {/* Search Bar */}
                <div className="relative flex-1 w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search skills or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all duration-200 shadow-sm"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative w-full md:w-48">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none shadow-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              {/* Add New Skill Button */}
              <button
                onClick={handleAddNewSkill}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <Plus size={20} />
                Add New Skill
              </button>
            </div>

            {/* Results Count and Clear */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">
                  {filteredSkills.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {skills.length}
                </span>{" "}
                skills found
                {(searchTerm || filterLevel !== "all") && (
                  <span className="text-blue-600 ml-2">
                    • {searchTerm && `Search: "${searchTerm}"`}{" "}
                    {searchTerm && filterLevel !== "all" && " • "}
                    {filterLevel !== "all" && `Level: ${filterLevel}`}
                  </span>
                )}
              </div>

              {(searchTerm || filterLevel !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLevel("all");
                  }}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-colors"
                >
                  <XCircle size={16} />
                  Clear all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 animate-shake">
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-3" />
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up">
            <div className="flex items-center">
              <div className="h-5 w-5 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
              <p className="text-green-800 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/60 p-12 text-center">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {searchTerm || filterLevel !== "all"
                ? "No matching skills found"
                : "No skills available"}
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              {searchTerm || filterLevel !== "all"
                ? "Try adjusting your search criteria or clear filters to see all available skills."
                : "Be the first to add a skill and start sharing knowledge with the community!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {(searchTerm || filterLevel !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLevel("all");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Clear all filters
                </button>
              )}
              <button
                onClick={handleAddNewSkill}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                <Plus size={20} className="inline mr-2" />
                Add First Skill
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => handleCardClick(skill)}
                className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl border border-white/60 transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden"
              >
                {/* Skill Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {skill.name}
                    </h3>
                    <span className="text-2xl">
                      {getLevelIcon(skill.level)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getLevelColor(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <User className="h-4 w-4 mr-1" />
                      <span>Expert</span>
                    </div>
                  </div>
                </div>

                {/* Skill Description */}
                <div className="p-6">
                  <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {skill.description ||
                      "No description provided. This skill speaks for itself through expertise and experience."}
                  </p>

                  {/* Action Buttons */}
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => handleEdit(skill, e)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors group/btn"
                    >
                      <Edit size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>

                    <button
                      onClick={(e) => handleDeleteClick(skill, e)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors group/btn"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>

                    <button
                      onClick={(e) => handleCreateSession(skill, e)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 group/btn"
                    >
                      <Calendar size={16} />
                      <span className="text-sm font-medium">Request</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skill Details Modal */}
        {selectSkill && (
          <Details
            skill_details={selectSkill}
            onClose={() => setSelectedSkill(null)}
          />
        )}

        {/* Delete Confirmation Modal */}
        {confirmDelete && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center animate-fade-in-up">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Delete Skill?
              </h2>
              <p className="text-gray-600 mb-2">
                Are you sure you want to delete{" "}
                <strong>&quot;{confirmDelete.name}&quot;</strong>?
              </p>
              <p className="text-sm text-red-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}