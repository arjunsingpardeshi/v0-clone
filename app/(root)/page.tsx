"use client"
import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const runOnboarding = async () => {
  //       await onBoardUser();
  //     };

  //     runOnboarding();  
  // }, []);
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <Button className="">click me</Button>
      <UserButton/>
    </div>
  );
}
