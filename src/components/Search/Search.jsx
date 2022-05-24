import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import LabelIcon from "@material-ui/icons/Label";
import { useHistory, Link } from "react-router-dom";
import "./search.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Search({setValue}) {
  const history = useHistory();
  function addSearchBtn(e) {
    document.querySelector(".inp").classList.add("focused");
    document.querySelector(".search-btn-div").classList.add("focused");

    document.querySelector(".search-icon").classList.add("focused");
    document.querySelector(".search-btn").classList.add("focused");
    document.querySelector(".search-body").classList.add("focused");
    document.querySelector(".input").classList.add("focused");
  }
  function removeSearchBtn(e) {
    document.querySelector(".inp").classList.remove("focused");
    document.querySelector(".search-btn-div").classList.remove("focused");
    document.querySelector(".search-icon").classList.remove("focused");
    document.querySelector(".search-btn").classList.remove("focused");
    document.querySelector(".search-body").classList.remove("focused");
    document.querySelector(".input").classList.remove("focused");
    

  }

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
      document.querySelector(".close-icon").classList.add("value");
    } else document.querySelector(".close-icon").classList.remove("value");
  }, [search]);

  useEffect(() => {
    setValue('search');
  }, [])

  const classes = useStyles();

  function FormRow({ cat1, cat2 }) {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div className="content">{cat1}</div>

            <ChevronRightIcon
              onClick={() => {
                GoToQuery(cat1);
              }}
              style={{ cursor: "pointer" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper button className={classes.paper}>
            <div className="content">{cat2}</div>

            <ChevronRightIcon
              onClick={() => {
                GoToQuery(cat2);
              }}
              style={{ cursor: "pointer" }}
            />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
  function ListItemSearch({ tag }) {
    return (
      <React.Fragment>
        <ListItem
          button
          onClick={() => {
            GoToQuery(tag);
          }}
        >
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText className="list-text" primary={tag} />
        </ListItem>
        <Divider style={{ width: "90%", margin: "0 auto" }} />
      </React.Fragment>
    );
  }

  function SearchQuery() {
    if (search !== "") history.push(`/query?q=${search}`);
  }
  function GoToQuery(query) {
    // if(search !== '')
    history.push(`/query?q=${query}`);
  }

  return (
    <>
      <div className="search">
        <div className="search-header">
          <h1>Search</h1>
          <div className="input">
            <div className="inp ">
              <input
                type="text"
                onFocus={addSearchBtn}
                className="search-box "
                // onBlur={removeSearchBtn}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key == 'Enter')
                    SearchQuery();
                }}
              />
              <SearchIcon className="search-icon " />
              <CloseIcon
                className="close-icon  "
                onClick={() => {
                  setSearch("");
                }}
              />
            </div>
            <div className="search-btn-div">

              <Button
                className="search-btn "
                variant="outlined"
                style={{ borderColor: "green", color: "green" }}
                onClick={SearchQuery}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="search-body" onClick={removeSearchBtn}>
          <div className="category-search">
            <h3>Popular Categories</h3>
            <div className="cat-content">
              <Grid container spacing={2}>
                <Grid container item xs={12} spacing={3}>
                  <FormRow cat1={"Politics"} cat2={"Animal"} />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <FormRow cat1={"Football"} cat2={"Movies"} />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <FormRow cat1={"Fashion"} cat2={"Covid"} />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className="category-search">
            <h3>Popular Tags</h3>
            <div
              className="list-content"
              style={{ backgroundColor: "theme.palette.background.paper" }}
            >
              <List component="nav" aria-label="main mailbox folders">
                <ListItemSearch
                  tag={"COVID"}
                  onClick={() => {
                    GoToQuery("covid");
                    console.log("something");
                  }}
                />
                <ListItemSearch
                  tag={"Virat Kholi"}
                  onClick={() => {
                    GoToQuery("virat kholi");
                  }}
                />
                <ListItemSearch
                  tag={"Football"}
                  onClick={() => {
                    GoToQuery("football");
                  }}
                />

                <ListItemSearch
                  tag={"India"}
                  onClick={() => {
                    GoToQuery("india");
                  }}
                />
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
