import React, {  useEffect } from "react";
import TimeToDate from "../Date";
import { getYesterdayBeforeDate , getYesterdaysDate } from '../../utilities/Dates'
import dateFormat from "dateformat";
import Lists from "../List";
import List from "@material-ui/core/List";
import HistoryIcon from "@material-ui/icons/History";
import "./home.css";
import {TodaySkeleton , PastSkeleton , ParsoSkeleton} from "./Skeleton";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { selectTodayHeadlines, fetchTodayHeadlines } from '../../Reducers/Home/today'
import { selectYesterdayHeadlines, fetchYesterdayHeadlines } from '../../Reducers/Home/yesterday'
import { selectParsoHeadlines, fetchParsoHeadlines } from '../../Reducers/Home/parso'
import { useSelector, useDispatch } from 'react-redux'

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


export default function Home({setValue}) {




  const classes = useStyles();

  const dispatch = useDispatch()
  //Today
  const today = useSelector(selectTodayHeadlines)
  const todayStatus = useSelector(state => state.today.status)
  //Yesterday
  const yesterday = useSelector(selectYesterdayHeadlines)
  const yesterdayStatus = useSelector(state => state.yesterday.status)
  //Parso
  const parso = useSelector(selectParsoHeadlines)
  const parsoStatus = useSelector(state => state.parso.status)

  useEffect(() => {
    if (todayStatus === 'idle') {
      dispatch(fetchTodayHeadlines())
    }
  }, [todayStatus, dispatch])

  //Yesterday
  useEffect(() => {
    if (yesterdayStatus === 'idle') {
      dispatch(fetchYesterdayHeadlines())
    }
  }, [yesterdayStatus, dispatch])

  //Parso
  useEffect(() => {
    if (parsoStatus === 'idle') {
      dispatch(fetchParsoHeadlines())
    }
  }, [parsoStatus, dispatch])



  const getYesterdaysDay = dateFormat(getYesterdaysDate(), "dddd");
  const getYesterdaysBeforeDay = dateFormat(getYesterdayBeforeDate(), "dddd");


  useEffect(() => {
 setValue('home');
}, [])





  return (
    <div className="scroll">
      <div className="card-container">
       
          <div className="date-home">
            <TimeToDate date={new Date()} />
          </div>
     
        <h2 className="today">TODAY</h2>

        {todayStatus === "completed" ? today?.map(news => {
          return (
        <div className="card">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
          <img
            className="width-image"
            alt={news.title}
            src={news.urlToImage || "https://media.gettyimages.com/vectors/abstract-globe-background-vector-id1311148884?s=612x612"}
            height={"100%"}
            width={"100%"}
          />
          <h3>{news.title}  -  {news?.source?.name}</h3>
          <div className="author">{news.author || news?.source?.name || "Anonymous"}</div>
          </a>
        </div>

          )
        }) :
        <TodaySkeleton  />
      }
        
      </div>

      <div className="yesterday">
        <div className="yesterday-home">
          <TimeToDate date={getYesterdaysDate()} />
        </div>
        <h2 className="yesterday-day">{getYesterdaysDay}</h2>

        {yesterdayStatus === "completed" ?
        <GridList cellHeight={180} className={classes.gridList}>
       
         {yesterday?.map((tile) => (
          <GridListTile className={classes.gridListTile} key={tile.urlToImage}>
            <img src={tile.urlToImage || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"} alt={tile.title} />
            <a href={tile.url} target="_blank" rel="noopener noreferrer">
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author || tile?.source?.name}</span>}
              actionIcon={ 
                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
            </a>
          </GridListTile>

        ))}</GridList> : 
        <>
        <PastSkeleton />
       
        </>
        }
      
      </div>

      <div className="parso">
        <div className="date-home">
          <TimeToDate date={getYesterdayBeforeDate()} />
        </div>
        <h2 className="today">{getYesterdaysBeforeDay}</h2>
      </div>
      {parsoStatus === "completed" ?
      <div className="card">
        <img
          className="width-image"
          alt={"News"}
          src={parso[0]?.urlToImage || "https://elegalmetrology.jharkhand.gov.in/japnet/images/news.jpg"}
          height={"100%"}
          width={"100%"}
        />
        <h3>{parso[0]?.title}</h3>
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
            <Lists news={parso[1]} />
            <Lists news={parso[2]} />
            <Lists news={parso[3]} />
            <Lists news={parso[4]} />
            
          </List>
        </div>
      </div> : <ParsoSkeleton />
      }
    </div>
  );
}
