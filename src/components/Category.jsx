import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../styles/category.css";
import { useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Category({setValue}) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setValue('category');
    
  }, [])

  function FormRow({ img1, img2, cat1, cat2 }) {
    return (
      <React.Fragment>
        <Grid
          onClick={() => history.push("/query?q=" + cat1)}
          item
          xs={6}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            background: `url(${img1})`,
            width: "100%",
            height: "140px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "5px",
            transform: "scale(0.97)",
            cursor: "pointer"
          }}
        >
          <div className="category-title">{cat1}</div>
        </Grid>

        <Grid
          item
          xs={6}
          onClick={() => history.push("/query?q=" + cat2)}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            background: `url(${img2})`,
            width: "100%",
            height: "140px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "5px",
            transform: "scale(0.97)",
            cursor: "pointer"

            //  padding:'0 !important'
          }}
        >
          <div className="category-title">{cat2}</div>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div style={{ marginBottom: "65px" }}>
      <h1 className="header-c">Category</h1>

      <div
        className="container-c"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            flexGrow: 1,
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
          className={classes.root}
        >
          <Grid container>
            <Grid container item xs={12}>
              <FormRow
                img1={
                  "https://xioyuna.com/envato/yui/demo/Yui/img/categories/sports.jpg"
                }
                cat1={"Sports"}
                img2={
                  "https://www.orfonline.org/wp-content/uploads/2019/04/Health-as-a-poll-issue.jpg"
                }
                cat2={"Health"}
              />
            </Grid>
            <Grid container item xs={12}>
              <FormRow
                img1={
                  "https://xioyuna.com/envato/yui/demo/Yui/img/categories/travel.jpg"
                }
                cat1={"Business"}
                img2={
                  "https://image.freepik.com/free-vector/futuristic-mobile-technology_46706-680.jpg"
                }
                cat2={"Technology"}
              />
            </Grid>
            <Grid container item xs={12}>
              <FormRow
                img1={
                  "https://images.ctfassets.net/hrltx12pl8hq/2yLJmfUi2QujkWc4SK5DN0/b1fb61f162c480a73d19de05afed3794/shutterstock_510957727-min.jpg?fit=fill&w=800&h=300"
                }
                cat1={"Science"}
                img2={
                  "https://xioyuna.com/envato/yui/demo/Yui/img/categories/food.jpg"
                }
                cat2={"Food"}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
