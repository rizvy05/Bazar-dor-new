"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    if (isPending) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-500 font-medium">প্রোফাইল লোড হচ্ছে...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <p className="text-gray-700">দয়া করে প্রথমে সাইন ইন করুন।</p>
                <button
                    onClick={() => router.push("/signin")}
                    className="bg-[#0f8a42] text-white px-6 py-2 rounded-xl font-semibold shadow-md"
                >
                    সাইন ইন করুন
                </button>
            </div>
        );
    }

    const handleSignout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authClient.updateUser({
                name: name,
            }, {
                onSuccess: () => {
                    alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
                    router.refresh();
                },
                onError: (ctx) => {
                    alert(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে।");
                }
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 my-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="text-gray-600 text-sm mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>

            {/* User Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User Avatar"}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-xl font-bold text-gray-600">
                                {user.name?.charAt(0) || "U"}
                            </span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                <button
                    onClick={handleSignout}
                    className="bg-[#ec0101] hover:bg-[#c50101] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-sm transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                    সাইন আউট
                </button>
            </div>

            {/* Update Form Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">তথ্য</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">নাম</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f8a42]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-xl cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#0f8a42] hover:bg-[#0c7236] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-green-700/20 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;