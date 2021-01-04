import React, { useState, useEffect, createRef,useContext } from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography,Grid,Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {ArticleContext} from '../Context/ContextApi'
import {useHistory} from 'react-router-dom'
// import useStyles from './styles';

const useStyles = makeStyles({
    media: {
      height: 250,
    },
    border: {
      border: 'solid',
    },
    fullHeightCard: {
      height: '100%',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderBottom: '10px solid white',
    },
    activeCard: {
      borderBottom: '10px solid #22289a',
    },
    grid: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '20px',
    },
    title: {
      padding: '0 16px',
    },
    cardActions: {
      padding: '0 16px 8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  });

  const cardStyle = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '10%',
        borderRadius: 10,
        color: 'white',
      },
      infoCard: {
        display: 'flex', flexDirection: 'column', textAlign: 'center',
      },
      container: {
        padding: '0 5%', width: '100%', margin: 0,
      },
  })

  function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, activeArticle, i }){

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  
    
  //   const  = newsArticle;
    useEffect(() => {
      window.scroll(0, 0);
  
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);
  
    useEffect(() => {
      if (i === activeArticle && elRefs[activeArticle]) {
        scrollToRef(elRefs[activeArticle]);
      }
    }, [i, activeArticle, elRefs]);


    return (<Card ref={elRefs[i]} className={ activeArticle === i ? classes.activeCard : classes.card}>
    <CardActionArea href={url} target="_blank">
      <CardMedia className={classes.media} image={urlToImage || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} title={title} />
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
        <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
      </CardContent>
    </CardActionArea>
    <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" href={url}>Learn More</Button>
      <Typography variant="h5" color="textSecondary" component="h2">{i + 1}</Typography>
    </CardActions>
  </Card>);
  }

const NewsCards = () => {

    const classes = cardStyle();
    const history = useHistory();
    const [,,, ,, ,, ,, ,,,newsArticles, setNewsArticles,activeArticle] = useContext(ArticleContext);
    if(!newsArticles.length){
        history.replace("/home")
    }
  return (
    <>
    {/* <h1>Hello World</h1> */}
    {/* <h1</h1> */}
    <Grow in>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {newsArticles.map((article, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard activeArticle={activeArticle} i={i} article={article} />
          </Grid>
        ))}
      </Grid>
    </Grow>

   </>

  );
};

export default NewsCards;