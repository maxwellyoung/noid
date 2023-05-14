import { type PropsWithChildren } from "react";
import Image from "next/image";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <>
      <div className="bg-slate-800 blur-3xl">
        <Image
          src="/Noid_logo.svg"
          alt="noid logo"
          width={300}
          height={300}
          className="mx-auto flex h-24 justify-center"
        />
      </div>
      <main className="flex justify-center">
        <div className="h-full w-full   border-slate-400 md:max-w-2xl">
          <Image
            src="/Noid_logo.svg"
            alt="noid logo"
            width={300}
            height={300}
            className="mx-auto flex justify-center p-4  blur-none  "
          />
          {props.children}
        </div>
      </main>
    </>
  );
};
