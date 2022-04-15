import React, { useEffect, useState } from "react";
import "../styles/info.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from './Drawer'
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    display: "block"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // fontFamily: 'sans-serif',
    outline: "0",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const category = [
  "business",
  "entertainment",
  "food",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];
const lang = ["en", "hi", "fr", "de", "ru", "es", "zh"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      lang.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    padding: "15px"
  };
}

export default function Info({setValue}) {
  const classes = useStyles();
  const theme = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [name, setname] = useState("");
  const [modalEmail, setModalEmail] = useState("");
  const [personName, setPersonName] = React.useState([]);
  const [language, setLanguage] = React.useState([]);
  const [genre, setGenre] = React.useState([]);
  // const [country, setCountry] = React.useState(null);
  // const [outLanguage, setOutLanguage] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const na = localStorage.getItem("name")
      ? JSON.parse(localStorage.getItem("name"))
      : "Full Name";
    setName(na);
    // setname(na);
    const em = localStorage.getItem("email")
      ? JSON.parse(localStorage.getItem("email"))
      : "Email@email.com";
    setEmail(em);
    // setModalEmail(em);
    const l = localStorage.getItem("lang")
      ? JSON.parse(localStorage.getItem("lang"))
      : [];
    setLanguage(l);
    // setOutLanguage(l);
    const g = localStorage.getItem("genre")
      ? JSON.parse(localStorage.getItem("genre"))
      : [];
    setGenre(g);
    // setPersonName(g);

    setValue('info')

  }, []);

  const handleChange = (event) => {
    setGenre(event.target.value);
  };
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // useEffect(() => {}, [email]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function saveDetails() {
    localStorage.setItem("name", JSON.stringify(name));
    // localStorage.setItem("country", JSON.stringify(country));
    localStorage.setItem("email", JSON.stringify(email));
    localStorage.setItem("genre", JSON.stringify(genre));
    localStorage.setItem("lang", JSON.stringify(language));
    // setName(name);
    // setEmail(modalEmail);
    // setCountry(modalCountry);
    // setOutLanguage(language);
    // setGenre(personName);
    handleClose();
  }

  return (
    <div className="info">



      {/* //Modal */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" className="heading">
              Profile
            </h2>
            <div className="modal-content">
              <div className="name-div">
                <TextField
                  id="outlined-full-width"
                  label="Full Name"
                  style={{ margin: 8 }}
                  placeholder="Ex:- Abhilaksh Bansal"
                  //  helperText="Full width!"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className="modal-name"
                  variant="outlined"
                />
              </div>

              <div className="email-div">
                <TextField
                  id="outlined-full-width"
                  label="Email"
                  style={{ margin: 8 }}
                  placeholder="Ex:- ab@ba.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  className="modal-email"
                  variant="outlined"
                />
              </div>
              <h4 className="heading">
                Category{" "}
                <span style={{ fontWeight: "200", fontSize: "14px" }}>
                  (Choose)
                </span>
              </h4>
              <div className="select-modal">
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">
                    Select Genre
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={genre}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {category.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, genre, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* //Languages */}

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-mutiple-chip-label">Language</InputLabel>
                  <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={language}
                    onChange={handleLanguageChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <div className={classes.chips}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={value}
                            className={classes.chip}
                          />
                        ))}
                      </div>
                    )}
                    MenuProps={MenuProps}
                  >
                    {lang.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, language, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                className="save-btn"
                onClick={saveDetails}
              >
                SAVE
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>

      {/* //Display Information */}
      <div className="avatar">
        <div className="news-logo"> </div>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<EditIcon />}
          className="add-btn"
          onClick={handleOpen}
        >
          Edit
        </Button>
        <div className="input-info">
          <div className="name-div">
            <TextField
              id="filled-read-only-input"
              label={"Full Name"}
              defaultValue={name}
              InputProps={{
                readOnly: true
              }}
              value={name}
              variant="filled"
              className="name-info"
            />
          </div>

          <div className="email-div">
            <TextField
              id="filled-read-only-input"
              label="Email"
              defaultValue={email}
              InputProps={{
                readOnly: true
              }}
              value={email}
              variant="filled"
              className="email-info"
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="personal-cat">
          <div className="heading">
            <div>
              <h4>Category</h4>
            </div>
          </div>
          <div className="personal-cat-content">
            {language.length !== 0 || genre.length !== 0 ? (
              <>
                <h5 style={{ margin: 0, marginBottom: "10px" }}>Genre</h5>
                {genre.map((gen) => {
                  return <Chip label={gen} variant="outlined" />;
                })}
                <div className="lang-div">
                  <h5 style={{ margin: 0, marginBottom: "10px" }}>Language</h5>
                  {language.map((lang) => {
                    return <Chip label={lang} variant="outlined" />;
                  })}
                </div>
              </>
            ) : (
              "0 items (Add something)"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
