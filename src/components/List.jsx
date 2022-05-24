import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import HistoryIcon from "@material-ui/icons/History";
import { useHistory } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { toggleDrawer  } from '../Reducers/Drawer'
import { addArticle } from '../Reducers/Article'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  block: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px"
  }
}));

export default function ItemsList({news}) {
  const {author,description,title,content,url} = news;
  let urlToImage = news.urlToImage || news.image;
  const publishedAt = news.publishedAt || news.published_at;
  const classes = useStyles();

  const dispatch = useDispatch()
  if(!urlToImage){
    urlToImage = "/images/newsCover.jpg"
  }
  function ArticleClick(){
    // setArticle();
    // console.log(toggleDrawer(true) + " nufabifk ja kfj  ")
    // toggleDrawer(true)()
    dispatch(toggleDrawer(true))
    dispatch(addArticle({
      urlToImage,author,publishedAt,title,description,content,url
    }))
    // history.push('/article')
  }

  return (
    <div
      style={{
        padding: "0",
        // display: "flex",
        // justifyContent: "space-between",
        width: "100%",
        cursor:'pointer'
        // alignItems: "center"
        
      }}

      onClick={ArticleClick}
    >
      <ListItem
        alignItems="flex-start"
        style={{
          padding: "0",
          display: "flex",
          justifyContent: "space-between",
          // alignItems: "center",
          margin: "15px 0",
          width: "100%"
        }}
      >
        <ListItemAvatar style={{ margin: "0", marginRight: "10px" }}>
          <img
            alt="Remy Sharp"
            src={urlToImage && urlToImage}
            height="100"
            width="100"
            style={{ borderRadius: "10px", marginRight: "10px"}}
          />
        </ListItemAvatar>
        <ListItemText
          primary={title && title}
          style={{width:"100% !important"}}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {author && author}
              </Typography>
              <Typography component="p"
                variant="body1"
                className={classes.block}
                color="textPrimary"
                style={{width:"100%" , overflowX:"hidden"}}>
                {
                  description?.substring(0, 124) 
                }...

              </Typography>
              <Typography
                component="div"
                variant="body4"
                className={classes.block}
                color="textPrimary"
              >
                <HistoryIcon style={{ fontSize: "17px", marginRight: "3px" }} />{" "}
                {publishedAt && (new Date(publishedAt)).toDateString()}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider
        style={{ marginTop: "5px" }}
        variant="fullWidth"
        component="li"
      />
    </div>
  );
}

