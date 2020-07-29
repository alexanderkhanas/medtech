import React from "react";
import s from "./News.module.css";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import { connect } from "react-redux";
import NewsCard from "../../misc/NewsCard/NewsCard";

const News = ({ recentNews }) => {
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Новини", path: "/news" },
  ];
  console.log("recent news ===", recentNews);
  return (
    <div>
      <div className={s.title__container}>
        <h1 className={s.title}>Новини</h1>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.section}>
          {/* <h3 className={s.section__title}>Новини</h3> */}
          <div className={s.news__container}>
            {recentNews.map((newsItem, i) => (
              <NewsCard {...{ newsItem }} key={newsItem._id} />
            ))}
          </div>
        </div>
      </FixedWrapper>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    recentNews: state.news.recent,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(News);
