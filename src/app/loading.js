// src/app/loading.js
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071018]">
      <div className="text-center">
        <Image
          src="/logo1.png"
          alt="GreenChain"
          width={180}
          height={180}
          priority
          className="mx-auto"
        />
      </div>
    </div>
  );
}
