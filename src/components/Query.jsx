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
import axios from 'axios'

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
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  let lang = JSON.parse(localStorage.getItem("lang") )|| ["en"];
  // console.log(lang.join(",") + " Lanfganjfa ")
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const searchQuery = query.get("q");
  // let page = 1;
  // `https://newsapi.org/v2/everything?q=${searchQuery.toLowerCase()}&sortBy=popularity&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`
  useEffect(() => {
      axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&limit=20&languages=${lang.join(",")}&keywords=${searchQuery.toLowerCase()}`)
    .then((data) => {
      setItems({...data.data});
      // console.log(data.data.articles);
      console.log(data);
    })
    .catch(() => {
      console.log("something went wrong");
    })
  }, [])


  // setValue('');
  
  // console.log(query.get("q"), query.keys().next());
  // axios.get(`https://newsapi.org/v2/everything?q=${searchQuery.toLowerCase()}&page=${page}&sortBy=popularity&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)

  const fetchMoreData = () => {
    if (items?.data?.length >= 100) {
      setHasMore(false);
      return;
    }
    setPage(page+1);
    console.log(page);
    axios.get(`http://api.mediastack.com/v1/news?access_key=58c8ce96564a31ebb6e07ae5bb0f87fa&offset=${page*20}&limit=20&languages=${lang.join(",")}&keywords=${searchQuery.toLowerCase()}`)
    .then((ta) => {
      console.log(ta);
      if(!ta)
        setHasMore(false)
      setItems({
        ...items,
        data : [
          ...items.data,
          ...ta?.data.data
          // ...items.data,
          // articles:[
          //   ...items.data.articles,
          //   ...ta.data.articles
          // ]

        ]
        });
      // console.log(data.data.articles);
      console.log(items  , " : Items");
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
            {/* <Button color="inherit">Login</Button> */}
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
              dataLength={items ? items.data.length : page*20}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              { items?.data?.map((news) => (
               
              //  <Lists url={news.url} title={news.title} content={news.content} publishedAt={news.publishedAt} author={news.author} urlToImage={news.urlToImage} description={news.description}   />
               <Lists news={news}  />

              ))}
              
            </InfiniteScroll>
          </List>
         
        </div>
      </div>
    </>
  );
}
