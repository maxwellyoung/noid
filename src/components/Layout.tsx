import { type PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

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
        <div className="h-full w-full border-slate-400 md:max-w-2xl">
          <Link href="/">
            <Image
              src="/Noid_logo.svg"
              alt="noid logo"
              width={300}
              height={300}
              className="mx-auto flex justify-center p-4 blur-none"
            />
          </Link>
          {props.children}
          <div className="scrolling-footer">
            <p className="scrolling-text">
              <a href="https://maxwellyoung.info/code/noid">
                This is a Twitter clone developed by Maxwell Young using React,
                Next.js, Tailwind CSS, TRPC, Prisma, and Planetscale in the year
                2023. Click here for further information.
              </a>
            </p>
          </div>
        </div>
      </main>
      <style jsx>{`
        .scrolling-footer {
          // background-color: #111;
          backdrop-filter: blur(10px);
          color: #fff;
          padding: 8px;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
        }

        .scrolling-text {
          animation: scroll-left 20s linear infinite;
          white-space: nowrap;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
};
