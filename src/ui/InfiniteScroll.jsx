import { forwardRef, useCallback, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import Heading from "./Heading";

export default function InfiniteScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, results, error, hasNextPage } = useFetch(currentPage);
  console.log(currentPage, isLoading);

  const observer = useRef();

  const lastPostElement = useCallback(
    (post) => {
      console.log(isLoading);
      if (isLoading) return;
      console.log("callback code");

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        function ([entry]) {
          console.log(entry);
          if (entry.isIntersecting && hasNextPage) {
            setCurrentPage((page) => page + 1);
          }
        },
        {
          root: null,
          threshold: 0.6,
        }
      );

      if (post) observer.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (error?.isError)
    return (
      <h2>{error.message || "Error while getting data. Please try again"}</h2>
    );

  const content = results?.map((post, index, arr) => {
    if (arr.length === index + 1) {
      console.log("we are at last post " + (index + 1) + " " + arr.length);
      return <Post key={post.id} post={post} ref={lastPostElement} />;
    }

    return <Post key={post.id} post={post} />;
  });

  return (
    <div className="flex flex-col gap-4">
      <Heading as="h3">React Infinite Scroll</Heading>
      <div className="flex flex-col gap-2">{content}</div>
      {isLoading && <h1>Loading Page number {currentPage}</h1>}
      <div>Back to top</div>
    </div>
  );
}

const Post = forwardRef(function Post({ post }, ref) {
  const content = (
    <>
      <h2>
        {post.id} {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );

  const render = ref ? (
    <div className="border-2 border-indigo-800 p-2 bg-rose-200" ref={ref}>
      {content}
    </div>
  ) : (
    <div className="border-2 border-indigo-800 p-2 bg-rose-200">{content}</div>
  );

  return render;
});
