import React, { useState,useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../styles/query.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Lists from "./List";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from 'axios'
// import api from './axios.c'
import {  querySearch } from "../api/news";



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: "relative"
  },
  title: {
    // flexGrow: 1,
    // width:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    textAlign: "center",
    fontWeight: 900,
    fontSize: "25px",
    transform: "translate(-3%)"
  }
}));

export default function Query({setValue,...props}) {
  const classes = useStyles();
  const history = useHistory();
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  // console.log(lang.join(",") + " Lanfganjfa ")
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchQuery = query.get("q");
  useEffect(() => {
      querySearch(searchQuery.toLowerCase() , page)
    .then((data) => {
      if(Array.isArray(data))
      setItems(data);
    else throw "Error"

    })
    .catch(() => {
      console.log("something went wrong");
    })
  }, [])


  

  const fetchMoreData = () => {
    if (items?.length >= 100) {
      setHasMore(false);
      return;
    }
    setPage(prev => prev+1);
    console.log(page)
    querySearch(searchQuery.toLowerCase() , page+1)
    .then((ta) => {
      console.log(ta);
      if(!Array.isArray(ta)){
        setHasMore(false)
      }
      else 
      setItems(prev => {
      return [...prev , ...ta]  
      })
    })
    .catch(() => {
      console.log("something went wrong");
    })
    
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" className="app-bar-query" color="#fff">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              NEWS
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div className="query-content">
        <h1 className="heading-query">
          {searchQuery && searchQuery.toUpperCase()}
        </h1>
        <Divider
          style={{ marginTop: "5px" }}
          variant="fullWidth"
          // component="li"
        />
        <div
          className="list-parso"
          style={{
            marginBottom: "65px"
          }}
        >
          <List
            style={{
              width: "100%"
                          }}
          >
            <InfiniteScroll
              dataLength={items ? items.length : page*20}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              { items?.map((news) => (
               
               <Lists news={news}  />

              ))}
              
            </InfiniteScroll>
          </List>
         
        </div>
      </div>
    </>
  );
}
