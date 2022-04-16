import React from 'react';
// import { Grid, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "../styles/information.css";

// import useStyles from './styles.js';

const infoCards = [
  { color: '#00838f', title: 'Latest News', text: '"Give me the latest news"' },
  { color: '#1565c0', title: 'Search by Topic', info: 'On any topic', text: '"Give me the news on"' },
  { color: '#4527a0', title: 'News by Category', info: 'Tech , Business,Health,Food', text: '"Show me news on Health"' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: '"Give me the news from CNN"' },
];

const useStyles = makeStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      width: '100%',
      minHeight: '65vh',
      padding: '10%',
      borderRadius: 10,
      color: 'white',
    },
    infoCard: {
      display: 'flex', flexDirection: 'column', textAlign: 'center',
      height:'100%',
    },
    container: {
      padding: '0 5%', width: '100%', margin: 0,
    },
    image:{
        margin:'30px auto',

    }
  });

const Information = ({ articles, activeArticle }) => {
  const classes = useStyles();


    return (
        <div style={{
            minHeight:'100vh',
            display:'flex',
            textAlign:"center",
            justifyContent:'center',
            alignItems:'center',
            marginBottom : "70px",
            flexDirection:'column',
            // padding : "0 5%",
        }}>
        {/* <img className={classes.image} height={'200px'} src="https://www.simplilearn.com/ice9/free_resources_article_thumb/How-to-Build-a-Career-in-AI-and-Machine-Learning-2.jpg" alt=""/> */}
        <div className="info-h1">
            <h1 style={{fontWeight:'800'}}>Voice Assistant </h1>
        </div>
      {/* <Grow in>
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5" component="h5" style={{
                    fontWeight:'900'
                }}>{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6" style={{
                    fontWeight:'300'
                }}><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6">Try saying: <br /> <i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow> */}
      <div className='information-voice'>
      {infoCards.map((infoCard) => (
            <div className={classes.infoCard}>
              <div className={classes.card} style={{ backgroundColor: infoCard.color }}>
                <h5 style={{fontWeight:'900'}}>{infoCard.title}</h5>
                {infoCard.info ? <h6 style={{
                    fontWeight:'300'
                }}><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</h6> : null}
                <h6>Try saying: <br /> <i>{infoCard.text}</i></h6>
              </div>
            </div>
          ))}
      </div>
      </div>
    );



};

export default Information;
