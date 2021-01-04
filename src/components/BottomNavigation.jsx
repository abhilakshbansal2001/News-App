import React, { useEffect,useContext,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import CategoryIcon from "@material-ui/icons/Category";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import { useHistory } from "react-router-dom";
import "../styles/BottomNavigation.css";
// import { Link, useParams } from "react-router-dom";
// import Alan from '../Alan/Alan'
import {ArticleContext} from '../Context/ContextApi'
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers';


const useStyles = makeStyles({
  root: {
    color: "red !important",
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f9f9f9",
    height: "60px",
    zIndex: 100
  }
});

export default function LabelBottomNavigation({ setValue, value }) {
  const history = useHistory();
  const classes = useStyles();
  let { pathname } = history.location;

  // const [,,, ,, ,, ,, ,,,newsArticle, setNewsArticle] = useContext(ArticleContext);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [,,, ,, ,, ,, ,,,newsArticles, setNewsArticles,activeArticle,setActiveArticle] = useContext(ArticleContext);

  function goTo(){
    history.push('/ai/news');
  }

  const [opening, setOpening] = useState(true)
  const name = JSON.parse(localStorage.getItem("name")) ? JSON.parse(localStorage.getItem("name")) :  'User';
  useEffect(() => {
    alanBtn({
      key: 'f5b3dbd1d22fad0807edcd80d26b62952e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, articles, number,place }) => {
        // if(opening){
        //   alanBtn().playText(`Welcome ${name}`)
        //   setOpening(false);
        // }
          if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
            goTo();
            // window.location.href = 'http://localhost:3000/ai/news'

          // console.log(command,articles,"yoyoyo");
          } 
           else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > articles.length) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              // window.location.href = 'http://localhost:3000/ai/news'
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          
          // else if(command == 'GoTO'){
          //     console.log(place , "<><><><>");
          //     window.location.href = `http://localhost:3000/${place}`
          // }
        }
      }

    })
    
  }, [])

  useEffect(() => {
    // console.log(pathname);

    handleChange(pathname.split("/")[1]);
  }, [pathname]);
  // useEffect(() => {
  //   if (value) history.push(`/${value}`);
  //   else {
  //     history.push(`/home`);
  //   }
  // }, [value]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      {/* <Link to="/home"> */}
      <BottomNavigationAction
        className="navigation"
        label="Home"
        value="home"
        onClick={() => {history.push(`/home`)
      setValue("home")
      }}
        icon={<HomeIcon />}
      />
      {/* </Link> */}

      {/* <Link to="/category"> */}
      <BottomNavigationAction
        label="Category"
        value="category"
        className="navigation"
        onClick={() => {history.push(`/category`)
        setValue("category")
      }}
        icon={<CategoryIcon />}
      />
      {/* </Link> */}

      {/* <Link to="/discover"> */}
      <BottomNavigationAction
        label="Discover"
        value="discover"
        className="navigation"
        style={{ width: "20px" }}
        onClick={() => {history.push(`/discover`)
        setValue("discover")
      }}
        icon={<StarIcon />}
      />
      {/* </Link> */}
      {/* 
<Link to="/search"> */}
      <BottomNavigationAction
        label="Search"
        value="search"
        className="navigation"
        onClick={() => {history.push(`/search`)
        setValue("search")
      }}
        icon={<SearchIcon />}
      />
      {/* </Link> */}

      {/* <Link to="/info"> */}
      <BottomNavigationAction
        label="Info"
        value="info"
        icon={<InfoIcon />}
        onClick={() => {history.push(`/info`)
        setValue("info")
      }}
      />
      {/* </Link> */}
    </BottomNavigation>
  );
}
