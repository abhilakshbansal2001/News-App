import React, { useState,useEffect } from "react";
import "./styles.css";
import LabelBottomNavigation from "./components/BottomNavigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Discover from "./components/Discover";
import Search from "./components/Search";
import Info from "./components/Info";
import Query from "./components/Query";
import Article from "./components/Article";
import Drawer from "./components/Drawer";
import Information from "./components/Information";
import NewsCard from "./components/NewsCard";
import Source from "./components/Source";
import { AnimatedRoute } from "react-router-transition";
import About from "./components/About";
import Alan from './Alan/Alan'

export default function App() {
  const [value, setValue] = useState("home");



  return (
    <div className="App">
      <Router>
        <LabelBottomNavigation value={value} setValue={setValue} />
        <Drawer value={value} setValue={setValue} />

        <div>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" >
              <Home value={value} setValue={setValue} />
              {/* <Query /> */}
            </Route>
            <Route path="/category">
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
            <AnimatedRoute
              path="/article"
              component={Article}
              atEnter={{ offset: -100 }}
              atLeave={{ offset: -100 }}
              atActive={{ offset: 0 }}
              mapStyles={(styles) => ({
                transform: `translateX(${styles.offset}%)`
              })}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
