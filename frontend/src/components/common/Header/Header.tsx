import React from "react";
import { ReactComponent as Logo } from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import useFetchProfile from "hooks/user/useFetchProfile";
import useHeader from "hooks/common/useHeader";
import HeaderSearch from "./HeaderSearch";
import HeaderProfile from "./HeaderProfile";
import HeaderAction from "./HeaderAction";
import HeaderProgress from "./HeaderProgress";
import HeaderOption from "./HeaderOption";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Header.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Header = () => {
  const { login, admin, profile, logoutHandler } = useFetchProfile();
  const { clickEl, menuEl, scroll, showMenu, isPost, showMenuHandler } = useHeader();

  return (
    <header className={cx("header")}>
      <div className={cx("header-wrap")}>
        <Link to="/">
          <Logo className={cx("header-wrap-image")} />
        </Link>
        <div className={cx("header-wrap-profile")}>
          <HeaderSearch />
          {login && profile.id ? (
            <HeaderProfile
              menuEl={menuEl}
              admin={admin}
              profile={profile}
              showMenu={showMenu}
              showMenuHandler={showMenuHandler}
            >
              <HeaderOption admin={admin} handleLogout={logoutHandler} clickEl={clickEl} />
            </HeaderProfile>
          ) : (
            <HeaderAction />
          )}
        </div>
      </div>
      {isPost && <HeaderProgress scroll={scroll} />}
    </header>
  );
};

export default Header;
