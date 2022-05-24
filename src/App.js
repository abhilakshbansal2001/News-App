import React, { useState,useEffect, useContext } from "react";
import "./styles.css";
import LabelBottomNavigation from "./components/BottomNavigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Discover from "./components/Discover/Discover";
import Search from "./components/Search/Search";
import Info from "./components/Info/Info";
import Query from "./components/Query";
import Article from "./components/Article";
import Drawer from "./components/Drawer";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Information from "./components/Information";
import NewsCard from "./components/NewsCard";
import Source from "./components/Source";
// import { AnimatedRoute } from "react-router-transition";
import About from "./components/About";
import { useSelector  , useDispatch } from 'react-redux';
import { toggleDrawer , selectDrawerState } from './Reducers/Drawer'
export default function App() {
  const [value, setValue] = useState("home");
  const drawerState = useSelector(selectDrawerState)
  
  const dispatch = useDispatch()


  return (
    
      <div className="App">
      <Router>
        <LabelBottomNavigation value={value} setValue={setValue} />
        <Drawer value={value} setValue={setValue} />
        <SwipeableDrawer
            anchor={'bottom'}
            open={drawerState}
            onClose={() => dispatch(toggleDrawer(false))}
            onOpen={() => dispatch(toggleDrawer(true))}
        >
          {/* <div>Hello world</div> */}
        <Article />
        </SwipeableDrawer>
        {/* {!navigator.onLine && <Offline />} */}
        {/* <Offline /> */}
        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
              
            </Route>
            <Route path="/home"  onEnter={() => console.log('Entered /')}>
              <Home value={value} setValue={setValue}  />
              {/* <Query /> */}
            </Route>
            <Route path="/category"  onEnter={() => setValue("category")}>
              <Category value={value} setValue={setValue} />
            </Route>
            <Route path="/discover">
              <Discover value={value} setValue={setValue} />
            </Route>
            <Route path="/search" >
              <Search value={value} setValue={setValue}/>
            </Route>
            <Route path="/info">
              <Info value={value} setValue={setValue} />
            </Route>
            <Route path="/query" >
              <Query value={value} setValue={setValue}/>
            </Route>
            <Route path="/source" >
              <Source value={value} setValue={setValue}/>
            </Route>
            <Route path="/about" >
              <About />
            </Route>
            <Route path="/information" >
              <Information />
            </Route>
            <Route path="/ai/news" >
              <NewsCard />
            </Route>
            
          </Switch>
        </div>
      </Router>
    </div>
  );
}
