"use client"
import{useEffect,useState} from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import AuthModal from "../../components/Authentication/AuthModal";
import { authModalState } from "../../atoms/authModalAtom";
import {useRecoilValue} from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const authModal= useRecoilValue(authModalState);
  const router=useRouter();
  const [user,loading,error]=useAuthState(auth);
  const [pageLoading,setPageLoading]=useState(true);
  useEffect(() => {
    if(user) router.push("/");
   if(!loading && !user) setPageLoading(false);
  }, [user,router,loading])
  if(pageLoading) return null;
  return (
    <main>
      <div className="bg-gradient-to-b from-gray-600 to-black h-screen relative">
        <div className="max-w-7xl mx-auto">
          <Navbar />
          <div className="flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none">
            <Image src="/hero.png" alt="Hero img" width="639" height="391" quality={95} />
          </div>
          {authModal.isOpen && <AuthModal />}
        </div>
      </div>
    </main>
  );
}
