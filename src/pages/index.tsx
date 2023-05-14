import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "~/components/Loading";
import { api } from "~/utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "~/components/Layout";
import { PostView } from "~/components/PostView";

const CreatePostWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const err = e.data?.zodError?.fieldErrors.content;
      if (err && err[0]) {
        toast.error(err[0]);
      } else {
        toast.error("Failed to post.. try again another time.");
      }
    },
  });

  console.log(user);

  if (!user) return null;

  return (
    <div className="w-full gap-3">
      <div className="flex flex-col"></div>
      <div className="flex w-full gap-3">
        <Image
          src={user.profileImageUrl}
          alt="Profile Image"
          className="h-14 w-14 rounded-md"
          width={56}
          height={56}
        />
        <input
          type="text"
          placeholder="Say whatever you'd like to say"
          className="grow bg-transparent outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (input != "") {
                mutate({ content: input });
              }
            }
          }}
          disabled={isPosting}
        />

        {input != "" && !isPosting && (
          <button onClick={() => mutate({ content: input })}>Post</button>
        )}

        {isPosting && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong..</div>;
  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  //start fetching asap
  api.posts.getAll.useQuery();

  //return empty div if user isnt loaded
  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="flex rounded-md border border-zinc-800 bg-slate-800  p-4">
          {!isSignedIn && (
            <div className="flex justify-center text-slate-400 ">
              <SignInButton />
            </div>
          )}
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
};

export default Home;
