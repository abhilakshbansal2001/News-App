import React,{useState,useContext, useEffect} from "react";
import Divider from "@material-ui/core/Divider";
import "../styles/article.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HistoryIcon from "@material-ui/icons/History";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useLocation, useHistory } from "react-router-dom";
import {ArticleContext} from '../Context/ContextApi'

export default function Article() {
  const history = useHistory();
  // setValue('');
  // const [article,setArticle] = useContext(ArticleContext);
  const [article,,,,,,,,,,,,,,,,,toggleDrawer] = useContext(ArticleContext);

  // console.log(article , "hfrdtr");
  // useEffect(() => {
  //   if(!article){
  //     if(history.length == 0){
  //       history.replace("/home")
  //     }else{
  //       history.goBack();
  //     }
  //   }
  // } , [])
  return (
    <>
    {article && <div className="article">

      
      <div className="article-header">
       <div
        style={{
          width: "50px",
          backgroundColor: "#97978e",
          height: "6px",
          borderRadius: "50px",
          // margin: "10px auto",
          // marginTop: "25px",
          // padding: "0 5% !important"
        }}
        className="line"
      ></div>
        <HighlightOffIcon
          className="close-article"
          onClick={() => {
            toggleDrawer(false)();
          }}
          
        />
      </div>
      {/* <Divider
        style={{ marginTop: "30px ", margin: "0 auto", width: "90%" }}
        variant="fullWidth"
        component="div"
      /> */}
      <div className="article-img">
        <img
          src={article.urlToImage}
          alt=""
        />
      </div>

      <div className="article-content">
        <h1>{article.title}</h1>
        <div className="sub-head">
          <div className="article-author">
            <AccountCircleIcon
              style={{ marginRight: "10px", fontSize: "25px" }}
            />
            {article.author}
          </div>
          <div className="article-time">
            <HistoryIcon style={{ marginRight: "10px", fontSize: "25px" }} />
            {(new Date(article.publishedAt)).toDateString()}
          </div>
        </div>

        <div className="article-news">
          <p
          style={{
            fontWeight:'400',
            // fontSize:'20'
            fontStyle: 'italic',
            opacity:'0.8'
          }}
          >
            {/* <span className="para-heading">W</span> */}
          {article.description}
          </p>
          <p>
            {/* <span className="para-heading">W</span> */}
          {article.content && article.content.split("[")[0]} <a href={article.url} target="_blank" rel="noopener noreferrer">Learn More</a>
          </p>
          <Divider
            style={{ margin: "0 auto", width: "95%" }}
            variant="fullWidth"
            component="div"
          />
        </div>
      </div>
    </div>}
    </>
  );
}
