import { type PropsWithChildren } from "react";
import Image from "next/image";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex justify-center">
      <Image
        src="/Noid_logo.svg"
        alt="noid logo"
        width={300}
        height={300}
        className="invisible fixed  left-2 p-4 sm:visible "
      />
      <div className="h-full w-full  border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
