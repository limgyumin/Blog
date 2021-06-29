import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import useClose from "hooks/util/useClose";

export default function useHeader() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [scroll, setScroll] = useState<number>(0);

  const clickEl = useRef<HTMLDivElement>(null);
  const menuEl = useRef<HTMLDivElement>(null);

  const isPost = useMemo(() => pathname.split("/")[1] === "post", [pathname]);

  const handleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleClickTemp = useCallback(() => {
    history.push("/temp");
    handleShowMenu();
  }, [history, handleShowMenu]);

  const handleProgressBar = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const windowHeight = scrollHeight - clientHeight;
    const progress = scrollTop / windowHeight;

    setScroll(progress);
  }, []);

  useClose<HTMLDivElement>(clickEl, menuEl, handleShowMenu);

  useEffect(() => {
    window.addEventListener("scroll", handleProgressBar);
    return () => window.removeEventListener("scroll", handleProgressBar);
  }, [handleProgressBar]);

  useEffect(() => {
    return () => {
      setShowMenu(false);
      setScroll(0);
    };
  }, []);

  return {
    clickEl,
    menuEl,
    scroll,
    showMenu,
    isPost,
    handleShowMenu,
    handleClickTemp,
  };
}
