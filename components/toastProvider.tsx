'use client';

import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

// ✅ Dynamic import (THIS IS THE FIX)
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
    />
  );
}

// 'use client';

// import * as ReactToastify from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function ToastProvider() {
//   return (
//     <ReactToastify.ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       closeOnClick
//       pauseOnHover
//       draggable
//     />
//   );
// }



