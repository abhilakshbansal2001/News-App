import React, { useEffect, useState,useContext } from "react";
import "../styles/discover.css";
import StarIcon from "@material-ui/icons/Star";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import Lists from "./List";
import axios from 'axios'
import { Link,useHistory } from "react-router-dom";
import {ArticleContext} from '../Context/ContextApi'


export default function Discover({setValue}) {
  const history = useHistory();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "-50px ",
    // slidesToShow: 3,
    slidesToScroll: 3,
    // dots:true,
    speed: 500,
    dotsClass: "dotClass",
    slidesToShow: window.innerWidth > 980 ? 4 : 2
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
  const [slider, setSlider] = useState("");
  const [,,, ,, ,, ,discover, setDiscover,sources,setSources,mustSee,setMustSee] = useContext(ArticleContext);

  
  // const [discover, setDiscover] = useState();
  // const [sources, setSources] = useState();
  // const [mustSee, setMustSee] = useState();

  const category = JSON.parse(localStorage.getItem("genre") );

  useEffect(() => {
    const ac = new AbortController();

    if(!discover)
      axios.get(`https://newsapi.org/v2/top-headlines?country=in&${category && category[0] && `category=${category[0]}`}&pageSize=20&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)
      .then((data) => {
        setDiscover({...data});
        console.log(data);
      })
      .catch((err) => {
        console.log("something went wrong",err);
      })
    
    //Must See
    // axios.get(`https://newsapi.org/v2/top-headlines?country=in&${category[0] && `category=${category[0]}`}&pageSize=15&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)
    // .then((data) => {
    //   setDiscover({...data});
    //   console.log(data);
    // })
    // .catch((err) => {
    //   console.log("something went wrong",err);
    // })


    //Sources
    if(!sources)
    axios.get(`https://newsapi.org/v2/sources?country=in&pageSize=15&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)
    .then((data) => {
      setSources({...data});
      // console.log(data);
      // console.log(data);
    })
    .catch((err) => {
      console.log("something went wrong",err);
    })
    setValue('discover')
   return () => ac.abort();



  }, [])

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
        <div className="gradient">
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
        </div>
      </div>
      <div className="discover-content">
        <div className="carousel">
          <Slider {...settings}>
            {/* <div className="slider-content">
              <img
                src="https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500 "
                height="80%"
                width="80%"
                alt=""
              />
              <div className="black-gradient"></div>
              <div className="text">Something Title heu this is slick</div>
            </div> */}

            {discover && discover.data && discover.data.articles.map(dis => {
              return <div className="slider-content">
              <img
                src={dis.urlToImage}
                height="80%"
                width="80%"
                alt=""
              />
              <div className="black-gradient"></div>
            <div className="text">{dis.title}</div>
            </div>
            })}
            
            
            
            
          </Slider>

          <Divider />
        </div>
      </div>
      <div className="sources">
        <div className="source-heading">
          <h2>Popular Sources</h2>
          <Link to="/source" style={{textDecoration:'none'}}>
          <Button
            variant="contained"
            color="secondary"
            href="#contained-buttons"
          >
            See All
          </Button>
          </Link>
        </div>
        <div className="source-content">
          <List>
            {sources && sources.data.sources.map(source => {
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
                secondary={source.description}
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
            
          </List>
        </div>
      </div>
      <div className="must-see">
        <div className="must-see-header">
          <h2>MUST SEE</h2>
        </div>
        <div className="must-see-content">
          <Slider ref={(c) => setSlider(c)} {...settings2}>

          {discover && discover.data.articles.slice(10,15).map((news) => {
            
            return (
            <div className="must-see-card">
              <img
                className="must-see-card-img"
                src={news.urlToImage}
                alt={news.title}
              />
              <div className="must-see-overlay"></div>
              <div className="must-see-text">
                {news.title}
              </div>
            </div>

            )


          })}


           
          </Slider>
        </div>

        <Divider style={{ marginTop: "2rem" }} />
      </div>
      <div className="popular">
        <h2
          style={{
            fontWeight: "800",
            // marginBottom:'-2%'
            paddingLeft: "5%",
            marginBottom: "3.4rem"
          }}
        >
          Popular
        </h2>

        <List
          style={{
            width: "100%",
            // maxWidth: "36ch"
            padding: "0 5%",
            className: "listCard",
            paddingBottom: "75px"
            // transform: "translateY(-15vh)"
          }}
        >
          {discover && discover.data && discover.data.articles.slice(15,20).map((news) => {
            
            return <Lists news={news}  />


          })}
         
        </List>
      </div>
    </div>
  );
}
