import React, { useEffect } from "react";
import s from "./SingleNews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import BreadCrumbs from "../../misc/BreadCrumbs/BreadCrumbs";
import vadim from "../../assets/vadim.jpg";
import FixedWrapper from "../../wrappers/FixedWrapper/FixedWrapper";
import NewsCard from "../../misc/NewsCard/NewsCard";
import { getSingleNewsAction } from "../../store/actions/newsActions";
import { connect } from "react-redux";

const SingleNews = ({ recentNews, getSingleNews, match, singleNews }) => {
  const { title, gallery, desc, createdAt, _id } = singleNews;
  console.log(singleNews);
  const breadCrumbsItems = [
    {
      name: "Головна",
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
    },
    { name: "Новина", path: "/single-news/:id" },
  ];
  useEffect(() => {
    getSingleNews(match.params.id);
  }, []);
  console.log("singleNews ===", singleNews);
  return (
    <div>
      <div className={s.title__container}>
        <h4 className={s.title}>НОВИНА</h4>
        <BreadCrumbs items={breadCrumbsItems} />
      </div>
      <FixedWrapper>
        <div className={s.single_new}>
          <div className={s.main_container}>
            <h4 className={s.news_title}>{title}</h4>
            <div className={s.image_container}>
              <img className={s.main__image} src={vadim} alt="loading" />
            </div>
            <div className={s.news_text}>
              <p>
                There’s only a week to go before I’m a Celebrity returns to
                screens, and ahead of the launch, show’s leading ladies have
                been enjoying some downtime together. Presenter Holly
                Willoughby, who has stepped in for Ant McPartlin this year, was
                pictured having a laugh with Scarlett Moffatt, who co-hosts the
                spin-off show, I’m a Celebrity: Extra Camp. The TV stars were
                joined by Declan Donnelly’s wife Ali Astall on their day out in
                New South Wales, Australia. Photographed in a suitably verdant
                setting alongside her co-presenter, Holly looked ready to take
                on anything with a retro Cowgirl-esque outfit. Dressed in the
                supercool Danish brand Ganni, a.k.a the go-to designer for
                influencers worldwide, Holly wore the ultra cute ‘Salvia’ suede
                mini skirt in dark camel with frill detailing that buttoned all
                the way up at the front.
              </p>
            </div>
          </div>
        </div>
        <div className={s.section}>
          <h3 className={s.section__title}>Популярні новини</h3>
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
    singleNews: state.news.single,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSingleNews: (id) => dispatch(getSingleNewsAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleNews);
