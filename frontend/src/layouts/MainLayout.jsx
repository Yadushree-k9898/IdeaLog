

// import React from "react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// const MainLayout = ({ children }) => {
//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar with smooth transition */}
//       <div className="hidden md:block w-64 bg-white border-r border-gray-200">
//         <div className="h-full flex flex-col">
//           {/* Logo section */}
//           <div className="p-4 border-b">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
//                 <span className="text-white text-sm font-semibold">AI</span>
//               </div>
//               <span className="font-medium">AI Notes</span>
//             </div>
//           </div>
          
//           {/* Sidebar content */}
//           <div className="flex-1 overflow-y-auto">
//             <Sidebar />
//           </div>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar */}
//         <div className="bg-white border-b border-gray-200">
//           <div className="px-4 py-3">
//             <Navbar />
//           </div>
//         </div>

//         {/* Main content with scroll */}
//         <main className="flex-1 overflow-y-auto p-6">
//           <div className="max-w-5xl mx-auto">
//             {children}
//           </div>
//         </main>

//         {/* Mobile bottom navigation (optional) */}
//         <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
//           <div className="flex justify-around items-center">
//             <button className="p-2 text-gray-600 hover:text-purple-600">
//               <span className="text-sm">Home</span>
//             </button>
//             <button className="p-2 text-gray-600 hover:text-purple-600">
//               <span className="text-sm">Search</span>
//             </button>
//             <button className="p-2 text-gray-600 hover:text-purple-600">
//               <span className="text-sm">Settings</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;


import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar with smooth transition */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200">
        <div className="h-full flex flex-col">
          {/* Logo section */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AI</span>
              </div>
              <span className="font-medium">AI Notes</span>
            </div>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <Navbar />
          </div>
        </div>

        {/* Main content with scroll */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <Outlet />  {/* Renders the current route's content */}
          </div>
        </main>

        {/* Mobile bottom navigation (optional) */}
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3">
          <div className="flex justify-around items-center">
            <button className="p-2 text-gray-600 hover:text-purple-600">
              <span className="text-sm">Home</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600">
              <span className="text-sm">Search</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-purple-600">
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
