import { observer } from "mobx-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Main from "../../components/Main";
import useStore from "../../util/lib/hooks/useStore";
import { PostsResponse } from "../../util/types/Response";
import useQuery from "../../util/lib/hooks/useQuery";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

interface MainContainerProps {}

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

const MainContainer = ({}: MainContainerProps) => {
  const { search } = useLocation();
  const query = useQuery();

  const { store } = useStore();
  const { posts, handlePosts, initPosts } = store.PostStore;
  const { totalPostCount, categories, handleCategories } = store.CategoryStore;
  const { admin } = store.UserStore;

  //posts
  const [postCount, setPostCount] = useState<number>(0);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [fixedLoading, setFixedLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const mainRef = useRef<HTMLDivElement>(null);

  //categories
  const [modify, setModify] = useState<boolean>(false);

  const [ref, inView] = useInView({ threshold: 0.5 });

  const handlePostsCallback = useCallback(async () => {
    setLoading(true);
    const param: PostParamsType = {
      page: page,
      limit: 18,
    };
    const category: number = Number(query.get("tab"));
    if (category) {
      param.category = category;
    } else {
      delete param.category;
    }
    await handlePosts(param)
      .then((res: PostsResponse) => {
        setLoading(false);
        setPostCount(res.data["post_count"]);
        if (res.data["posts"].length > 0 || page > 1) {
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch((err: Error) => {
        toast.error("으악! 글 목록 조회에 실패했어요.");
      });
  }, [page, search]);

  const handleCategoriesCallback = useCallback(async () => {
    if (categories.length === 0) {
      await handleCategories().catch((err: Error) => {
        toast.error("앗! 카테고리 조회에 실패했어요.");
      });
    }
  }, []);

  const scrollToTop = () => {
    mainRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (inView && !loading && posts.length < postCount) {
      setLoading(true);
      setPage((page) => page + 1);
    }
  }, [inView, postCount, page, loading]);

  const initPostsCallback = useCallback(() => {
    initPosts();
    setPage(1);
  }, [search]);

  useEffect(() => {
    initPostsCallback();
  }, [initPostsCallback]);

  useEffect(() => {
    handleCategoriesCallback();
  }, [handleCategoriesCallback]);

  useEffect(() => {
    handlePostsCallback();
  }, [handlePostsCallback]);

  return (
    <>
      <Helmet>
        <title>Untitled</title>
        <meta name="description" content="개발자를 꿈꾸는 한 학생의 이야기" />
        <meta name="og:title" content="Untitled" />
        <meta
          property="og:description"
          content="개발자를 꿈꾸는 한 학생의 이야기"
        />
        <meta name="twitter:title" content="Untitled" />
        <meta
          property="twitter:description"
          content="개발자를 꿈꾸는 한 학생의 이야기"
        />
      </Helmet>
      <Main
        posts={posts}
        categories={categories}
        totalPostCount={totalPostCount}
        notFound={notFound}
        loading={loading}
        postRef={ref}
        admin={admin}
        modify={modify}
        setModify={setModify}
        scrollToTop={scrollToTop}
        mainRef={mainRef}
      />
    </>
  );
};

export default observer(MainContainer);
