// "use client";
// import { useEffect, useState } from "react";

// export default function CurrentDate() {
//   const [dateStr, setDateStr] = useState<string>("");

//   useEffect(() => {
//     setDateStr(
//       new Date().toLocaleDateString("bn-BD", {
//         dateStyle: "full",
//       })
//     );
//   }, []);

//   return <span className="text-xs text-gray-950 font-bold">{dateStr}</span>;
// }

// import { connection } from "next/server";

// export default async function CurrentDate() {
//   // Opts this component into request-time dynamic server rendering
//   await connection();

//   const dateStr = new Date().toLocaleDateString("bn-BD", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return <span>{dateStr}</span>;
// }


export default async function CurrentDate() {
  "use cache";

  const dateStr = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <span>{dateStr}</span>;
}