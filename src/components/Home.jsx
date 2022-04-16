import React, { useState, useEffect,useContext } from "react";
import TimeToDate from "./Date";
import dateFormat from "dateformat";
import Grid from "@material-ui/core/Grid";
import Lists from "./List";
import List from "@material-ui/core/List";
import { AnimatedRoute } from "react-router-transition";
import HistoryIcon from "@material-ui/icons/History";
import "../styles/home.css";
import { Link,useHistory } from "react-router-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';
import {ArticleContext} from '../Context/ContextApi'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    // height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridListTile: {
    height:'300px'
  }
}));


export default function Home({setValue , toggleDrawer}) {


  const classes = useStyles();
  const [,,today, setToday,yesterday, setYesterday,parso, setParso] = useContext(ArticleContext);


  function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  function getYesterdayBeforeDate() {
    var date = new Date();
    date.setDate(date.getDate() - 2);
    return date;
  }

  // const [today, setToday] = useState();
  // const [yesterday, setYesterday] = useState();
  // const [parso, setParso] = useState();

  const getYesterdaysDay = dateFormat(getYesterdaysDate(), "dddd");
  const getYesterdaysBeforeDay = dateFormat(getYesterdayBeforeDate(), "dddd");

  const yestTo = dateFormat(new Date(), "isoDateTime").split("T")[0]
  const yestFrom = dateFormat(getYesterdaysDate(), "isoDateTime").split("T")[0]

  const parsoTo = dateFormat(getYesterdaysDate(), "isoDateTime").split("T")[0]
  const parsoFrom = dateFormat(getYesterdayBeforeDate(), "isoDateTime").split("T")[0]
  // console.log(parsoTo, parsoFrom, "><><><<>");
  useEffect(() => {
    const ac = new AbortController();
    // const lan = localStorage.getItem("lang")
    const lang = localStorage.getItem("lang")
      ? JSON.parse(localStorage.getItem("lang"))
      : ["en"];
    
    if(!today){
      // `https://newsdata.io/api/1/news?apikey=pub_65467390a18e52bd65f9f93a66f79968808e&language=${lang}`
      // `http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&language=${lang.join(",")}`
      // 'https://newsapi.org/v2/top-headlines?country=in&pageSize=5&apiKey=3d9acd8ce84c433ab0fba12097fcadc6'
    axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=5`)
    .then((data) => {
      setToday({...data.data});
      console.log(data , "dnaif j fkjf kjw ");
    })
    .catch(() => {
      console.log("something went wrong");
    })
}
    //Yesterday
  if(!yesterday){
    // `https://newsapi.org/v2/everything?q=india&pageSize=10&from=${yestFrom}&to=${yestTo}&sortBy=popularity&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
    
    axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=8&languages=${lang.join(",")}&date=${yestFrom},${yestTo}`)
    .then((data) => {
      setYesterday({...data.data});
      // console.log(data.data.articles);
    })
    .catch(() => {
      console.log("something went wrong");
    })
    }
    //PARSO
    if(!parso){
      // `https://newsapi.org/v2/everything?q=india&pageSize=5&from=${parsoFrom}&to=${parsoTo}&sortBy=popularity&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
    axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=5&languages=${lang.join(",")}&date=${parsoFrom},${parsoTo}`, {signal: ac.signal})
    .then((data) => {
      setParso({...data.data});
      // console.log(data.data.articles);
    })
    .catch(() => {
      console.log("something went wrong");
    })
  }

  setValue('home');

   return () => ac.abort();


  }, [])





  return (
    <div className="scroll">
      <div className="card-container">
       
          <div className="date-home">
            <TimeToDate date={new Date()} />
          </div>
     
        <h2 className="today">TODAY</h2>

        {today?.data?.map(news => {
          return (
        <div className="card">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
          <img
            className="width-image"
            alt={news.title}
            src={news.image || "https://media.gettyimages.com/vectors/abstract-globe-background-vector-id1311148884?s=612x612"}
            height={"100%"}
            width={"100%"}
          />
          <h3>{news.title}  -  {news.source}</h3>
          <div className="author">{news.author || news.source || "Anonymous"}</div>
          </a>
        </div>

          )
        })}
        
      </div>

      <div className="yesterday">
        <div className="yesterday-home">
          <TimeToDate date={getYesterdaysDate()} />
        </div>
        <h2 className="yesterday-day">{getYesterdaysDay}</h2>

  
        <GridList cellHeight={180} className={classes.gridList}>
       
        {yesterday?.data?.map((tile) => (
          <GridListTile className={classes.gridListTile} key={tile.urlToImage}>
            <img src={tile.image || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"} alt={tile.title} />
            <a href={tile.url} target="_blank" rel="noopener noreferrer">
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
            </a>
          </GridListTile>
        ))}
      </GridList>
      </div>

      <div className="parso">
        <div className="date-home">
          <TimeToDate date={getYesterdayBeforeDate()} />
        </div>
        <h2 className="today">{getYesterdaysBeforeDay}</h2>
      </div>
      {parso && 
      <div className="card">
        <img
          className="width-image"
          alt={"potty"}
          src={parso?.data[0].image || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"}
          height={"100%"}
          width={"100%"}
        />
        <h3>{parso?.data[0].title}</h3>
        <div className="time-parso author">
          <HistoryIcon /> <span style={{ marginLeft: "10px" }}>2 Days Ago</span>
        </div>
        <div
          className="list-parso"
          style={{
            // width: "100%",

            marginBottom: "65px"
          }}
        >
          <List
            style={{
              width: "100%",
              // maxWidth: "36ch"
              paddingTop: "45px",
              paddingBottom: "65px"
            }}
          >
            <Lists news={parso?.data[1]} />
            <Lists news={parso?.data[2]} />
            <Lists news={parso?.data[3]} />
            <Lists news={parso?.data[4]} />
            {/* <Lists url = {parso.data.articles[1].url} title={parso.data.articles[1].title} content={parso.data.articles[1].content} publishedAt={parso.data.articles[1].publishedAt} author={parso.data.articles[1].author} urlToImage={parso.data.articles[1].urlToImage} description={parso.data.articles[1].description}   />
            <Lists url = {parso.data.articles[2].url} title={parso.data.articles[2].title} content={parso.data.articles[2].content} publishedAt={parso.data.articles[2].publishedAt} author={parso.data.articles[2].author} urlToImage={parso.data.articles[2].urlToImage} description={parso.data.articles[2].description}  />
            <Lists url = {parso.data.articles[3].url} title={parso.data.articles[3].title} content={parso.data.articles[3].content} publishedAt={parso.data.articles[3].publishedAt} author={parso.data.articles[3].author} urlToImage={parso.data.articles[3].urlToImage} description={parso.data.articles[3].description}  />
            <Lists url = {parso.data.articles[4].url} title={parso.data.articles[4].title} content={parso.data.articles[4].content} publishedAt={parso.data.articles[4].publishedAt} author={parso.data.articles[4].author} urlToImage={parso.data.articles[4].urlToImage} description={parso.data.articles[4].description}  /> */}
          </List>
        </div>
      </div>
      }
    </div>
  );
}
