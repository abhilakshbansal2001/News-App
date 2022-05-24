import React, { useEffect, useState } from "react";
import "./discover.css";
import StarIcon from "@material-ui/icons/Star";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Lists from "../List";
import { SourceSkeleton , CountryNewsSkeleton , DiscoverSkeleton } from './Skeleton'
import { useHistory } from "react-router-dom";
import { selectDiscoverHeadlines, fetchDiscoverHeadlines } from '../../Reducers/Discover/discover'
import { selectSource, fetchSource } from '../../Reducers/Discover/source'
import { selectCountryNews, fetchCountryNews } from '../../Reducers/Discover/countryNews'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

export default function Discover({setValue}) {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: window.innerWidth > 980 ? 5 : window.innerWidth > 500 ? 2 : 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 2000,
    arrows:false,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  // let slider;


    const dispatch = useDispatch()
    //Today
    const discover = useSelector(selectDiscoverHeadlines)
    const discoverStatus = useSelector(state => state.discover.status)

    useEffect(() => {
      if(discoverStatus == "idle"){
        dispatch(fetchDiscoverHeadlines());
      }
    }, [dispatch , discover])


    const sources = useSelector(selectSource)
    const sourceStatus = useSelector(state => state.sources.status)

    useEffect(() => {
      if(sourceStatus == "idle"){
        dispatch(fetchSource());
      }
    }, [dispatch , sources])
    
    const countryNews = useSelector(selectCountryNews)
    const countryNewsStatus = useSelector(state => state.countryNews.status)

    useEffect(() => {
      if(countryNewsStatus == "idle"){
        dispatch(fetchCountryNews());
      }
    }, [dispatch , countryNews])

 
    
    

  
  const [countryDiscover, setCountryDiscover] = useState(null);
  // const [sources, setSources] = useState();
  // const [mustSee, setMustSee] = useState();
    const s = new Array(20).fill(0);
    // console.log(s , " Hello worldhjc hj  ")
  const category = JSON.parse(localStorage.getItem("genre") ) || ["general"];
  const lang = JSON.parse(localStorage.getItem("lang")) || ["en"];


  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="discover">
      <div className="discover-header">
        <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fill-opacity="1"
              d="M0,32L30,64C60,96,120,160,180,176C240,192,300,160,360,128C420,96,480,64,540,48C600,32,660,32,720,32C780,32,840,32,900,42.7C960,53,1020,75,1080,112C1140,149,1200,203,1260,218.7C1320,235,1380,213,1410,202.7L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            ></path>
          </svg>
          <div className="discover-title">
            <div>
              <h4>THIS WEEK</h4>
              <h1>DISCOVER</h1>
            </div>
            <StarIcon
              style={{
                fontSize: "33px"
              }}
            />
          </div>
          
        {/* </div> */}
      <div className="discover-content">
          <Slider {...settings}>
            
          
            {discoverStatus==="completed" ?
              discover?.map(dis => {
              return <a className="slider-content" target="_BLANK " href={dis.url}>
                <div className="slider-image">
                  <img
                  src={dis.image || "/images/newsCover.jpg"}
                  height="100%"
                  width="100%"
                  alt=""
                  />
                  <div className="black-gradient"></div>
                  <div className="text">{dis.title}</div>
                </div>
              
            </a>
            }) : 
            new Array(15).fill(0).map(el =>(
              <div style={{textAlign : "center"}}>
              <Skeleton style={{maxHeight:"550px" , margin:"0 auto" }} height={"50vh"} width={"90%"} />
              </div>
              
        ))
            
            }
            
            
            
            
          </Slider>

        </div>
      {/* </div> */}
      </div>
      <div className="sources" style={{padding : "0% 5%"}}>
        <div className="source-heading">
          <h2>Popular Sources in your country</h2>
          
        </div>
        <div className="source-content">
        {sourceStatus === "completed" ? <List>
             {sources?.map(source => {
              return (
                <>
                <a target="_blank" href={source.url} style={{ overflowX: "visible", color: "black" ,textDecoration:'none'}}>
                <ListItem
              style={{
                alignItems: "flex-start",
                paddingLeft: "0"
              }}
              
              button
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ width: "65%" }}
                primary={source.name}
                secondary={
                  <React.Fragment>
                    <div>
                      <b> Category </b>
                      {source.category}
                    </div>
                    <div>{source.description}</div>
                    <div>
                      <b> Language </b>
                      {source.language}
                    </div>
                    
                </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
              
                <WhatshotIcon
                  style={{
                    fontSize: "40px",
                    color: "red"
                  }}
                />
             
              </ListItemSecondaryAction>
            </ListItem>
            </ a> 
            <Divider />
            </>
              )
            })}
            </List>: <SourceSkeleton />
            }
            
          
        </div>
      </div>
      
      <div className="popular">
        <h2
          style={{
            fontWeight: "800",
            paddingLeft: "5%",
            marginBottom: "3.4rem"
          }}
        >
          What's happening in <span className="country-name">India</span>
        </h2>

        <List
          style={{
            width: "100%",
            padding: "0 5%",
            className: "listCard",
            paddingBottom: "75px"
          }}
        >
          {countryNewsStatus === 'completed' ? countryNews?.map((news) => {
            
            return <Lists news={news}  />


          }) : <CountryNewsSkeleton />}
         
        </List>
      </div>
    </div>
  );
}
