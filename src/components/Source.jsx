import React, { useState,useEffect } from "react";
import {  useHistory } from "react-router-dom";
import "../styles/query.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import axios from 'axios'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    position: "relative"
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontWeight: 900,
    fontSize: "25px",
    transform: "translate(-3%)"
  }
}));

export default function Source({setValue,...props}) {
  const classes = useStyles();
  const history = useHistory();
  const [items, setItems] = useState();


  useEffect(() => {
      axios.get(`https://newsapi.org/v2/sources?language=en&pageSize=15&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)
    .then((data) => {
      setItems({...data});
    })
    .catch(() => {
      console.log("something went wrong");
    })
  }, [])


 

  // const fetchMoreData = () => {
  //   if (items && items.data.articles >= 100) {
  //     setHasMore(false);
  //     return;
  //   }
  //   setPage(page+1);
  //   console.log(page);
  //   axios.get(`https://newsapi.org/v2/sources?language=en&pageSize=15&apiKey=3d9acd8ce84c433ab0fba12097fcadc6`)
  //   .then((ta) => {
  //     if(!ta)
  //       setHasMore(false)
  //     setItems({
  //       ...items,
  //       data : {
  //         ...items.data,
  //         articles:[
  //           ...items.data.articles,
  //           ...ta.data.articles
  //         ]
  //       }
  //       });
      
  //   })
  //   .catch(() => {
  //     console.log("something went wrong");
  //   })
    
  // };

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
              SOURCES
            </Typography>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </div>

      <div className="query-content">
        
        <Divider
          style={{ marginTop: "5px" }}
          variant="fullWidth"
          // component="li"
        />
        <div
          className="list-parso"
          style={{
            // width: "100%",

            marginBottom: "65px"
          }}
        >
          <List
            style={{
              width: "100%"
                          }}
          >
            
              {items && items.data.sources.map((source) => {

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
    </>
  );
}
