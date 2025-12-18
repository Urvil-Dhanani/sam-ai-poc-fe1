import { Suspense } from "react";
import dynamic from "next/dynamic";

const page = () => {
  const LoginClient = dynamic(() => import("./LoginClient"));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
};

export default page;
