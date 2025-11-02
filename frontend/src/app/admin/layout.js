// "use client";

// import LoadingSpinner from "../component/ui/LoadingSpinner";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import AdminSidebar from "../component/admin/SideBar";
// import { useAuth } from "../context/AuthContext";

// export default function AdminLayout({ children }) {
//   const { user, isAuthenticated, isLoading } = useAuth();
//   const router = useRouter();
//   const [isAdmin, setAdmin] = useState(false);
//   const [checkAdmin, setChekingAdmin] = useState(true);

//   console.log("User from Admin layout : ", user);

//   useEffect(() => {
//     if (isLoading) {
//       console.log("⏳ Still loading auth state...");
//       return;
//     }
//     if (!isAuthenticated) {
//       console.log("❌ Not authenticated, redirecting to signin");
//       router.push("/SignIn");
//       return;
//     }
//     if (user && (user.role === "admin" || user.role === "super_admin")) {
//       setAdmin(true);
//     } else {
//       router.push("/");
//     }
//     setChekingAdmin(false);
//   }, [isAuthenticated, user, router, isLoading]);

//   if (isLoading || checkAdmin) {
//     return (
//       <div className="min-h-screen flex item-center justify-center">
//         <LoadingSpinner size="larger" />
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flext item-center justfy-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-red-600 mb-4">
//             Access Denied
//           </h1>
//           <p>You don&apos;t have permission to access the admin panel.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <AdminSidebar />
//       <main className="flex-1 ml-64 p-6">{children}</main>
//     </div>
//   );
// }

"use client";

import LoadingSpinner from "../component/ui/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "../component/admin/SideBar";
import { useAuth } from "../context/AuthContext";
import AdminFooter from "../component/AdminFooter"; // Add this import

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setAdmin] = useState(false);
  const [checkAdmin, setChekingAdmin] = useState(true);

  console.log("User from Admin layout : ", user);

  useEffect(() => {
    if (isLoading) {
      console.log("⏳ Still loading auth state...");
      return;
    }
    if (!isAuthenticated) {
      console.log("❌ Not authenticated, redirecting to signin");
      router.push("/SignIn");
      return;
    }
    if (user && (user.role === "admin" || user.role === "super_admin")) {
      setAdmin(true);
    } else {
      router.push("/");
    }
    setChekingAdmin(false);
  }, [isAuthenticated, user, router, isLoading]);

  if (isLoading || checkAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="larger" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p>You don&apos;t have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        {" "}
        {/* Added wrapper div */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}