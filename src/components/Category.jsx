import React,{useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../styles/category.css";
import { useLocation, useHistory } from "react-router-dom";

const catImages = {
  sports : "https://xioyuna.com/envato/yui/demo/Yui/img/categories/sports.jpg",
  entertainment : "https://www.forbesindia.com/media/images/2019/Oct/img_122803_media_and_entertainment.jpg",
  health : "https://www.orfonline.org/wp-content/uploads/2019/04/Health-as-a-poll-issue.jpg",
  business : "https://xioyuna.com/envato/yui/demo/Yui/img/categories/travel.jpg",
  technology : "https://image.freepik.com/free-vector/futuristic-mobile-technology_46706-680.jpg",
  science : "https://images.ctfassets.net/hrltx12pl8hq/2yLJmfUi2QujkWc4SK5DN0/b1fb61f162c480a73d19de05afed3794/shutterstock_510957727-min.jpg?fit=fill&w=800&h=300", 
  general : "https://thumbs.dreamstime.com/b/newspapers-showing-theresa-may-black-white-london-uk-circa-june-front-page-day-general-elections-which-104040850.jpg",
}

const all = [
  "sports" , "health" , "business" , "technology" , "science" , "food" , "entertainment"
]

export default function Category({setValue}) {
  const history = useHistory();
  const [genre, setGenre] = React.useState([]);

  useEffect(() => {
    // setValue('category');
    const g = localStorage.getItem("genre")
    ? JSON.parse(localStorage.getItem("genre"))
    : all;
  setGenre(g.length == 0 ? all : g);
  }, [])

  function FormRow({ img , cap }) {
    return (
      <React.Fragment>
        <div className="element-div" onClick={() => history.push("/query?q=" + cap)}>
              <img className="element-image" src={img} />
              <span className="element-cap">{cap}</span>
        </div>
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
            // flexGrow: 1,
            marginLeft: "5%",
            marginRight: "5%"
          }}
          className="element-c"
        >

          {genre.map((elem , idx) => {
              return <FormRow
              img={
                catImages[elem]
              }
              cap={elem} />
          }) }
              
             {/* <FormRow
              img={
                "https://www.orfonline.org/wp-content/uploads/2019/04/Health-as-a-poll-issue.jpg"
              }
              cap={"Health"}
            />
            <FormRow
                img={
                  "https://xioyuna.com/envato/yui/demo/Yui/img/categories/travel.jpg"
                }
                cap={"Business"} />
              <FormRow
                img={
                  "https://image.freepik.com/free-vector/futuristic-mobile-technology_46706-680.jpg"
                }
                cap={"Technology"}
              />

              <FormRow
                img={
                  "https://images.ctfassets.net/hrltx12pl8hq/2yLJmfUi2QujkWc4SK5DN0/b1fb61f162c480a73d19de05afed3794/shutterstock_510957727-min.jpg?fit=fill&w=800&h=300"
                }
                cap={"Science"} />
              <FormRow
                img={
                  "https://xioyuna.com/envato/yui/demo/Yui/img/categories/food.jpg"
                }
                cap={"Food"}
              /> */}
          
          

        </div>
      </div>
    </div>
  );
}
