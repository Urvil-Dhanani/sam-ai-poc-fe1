"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function App({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);
  return <div>{children}</div>;
}
