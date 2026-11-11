"use client";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const UserInfo = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // Redirect to home after signing out
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <div className="flex items-center gap-3">
          <Link href="/profile">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                {user.image ? (
        // <Image 
        //             src={user.image}
        //             alt={user.name || "User Avatar"}
        //             referrerPolicy="no-referrer"
        //             className="w-full h-full object-cover"
        //           />


        <Image 
  src={user.image}
  alt={user.name || "User Avatar"}
  width={40}
  height={40}
  referrerPolicy="no-referrer"
  className="w-full h-full object-cover"
/>

                ) : (
                  <span className="text-sm font-bold text-gray-600">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>
          </Link>

          <div className="text-left hidden sm:block">
            <h2 className="text-xs font-bold text-gray-800">{user.name}</h2>
            <p className="text-[11px] text-gray-500">{user.email}</p>
          </div>

          <button
            onClick={handleSignout}
            className="bg-[#ec0101] hover:bg-[#c50101] text-white px-4 py-2 rounded-xl font-semibold text-xs shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-gray-900 font-semibold text-sm hover:text-[#0f8a42] transition-colors"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="bg-[#0f8a42] hover:bg-[#0c7236] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-green-700/20 transition-all active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;