import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import MailIcon from '@material-ui/icons/Mail';
import HelpIcon from '@material-ui/icons/Help';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import {useHistory,Link } from 'react-router-dom'
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({value,setValue}) {
    const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => ( */}
          <ListItem button key={"A.I. Information"} onClick={() => {
            toggleDrawer(anchor, false)
            setValue('')
            history.push(`/information`)}}>
            <ListItemIcon> <HelpIcon /></ListItemIcon>
            <ListItemText primary={"A.I. Information"} />
          </ListItem>

          <ListItem button key={"About"}  onClick={() => {
            toggleDrawer(anchor, false)
            setValue('');
            history.push(`/about`)
          }}>
            <ListItemIcon> <InfoIcon /></ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>

          <Divider />

          <ListItem button key={"Contributers"}>
            <ListItemIcon> <AccountCircleIcon /></ListItemIcon>
            <ListItemText primary={"Contributers"} />
          </ListItem>
        {/* // ))} */}
      </List>
      
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)} style={{
              position:'absolute',
              top:'10px',
              right:'10px',
              color:'gray',
              zIndex:'100'
          }} ><MenuSharpIcon /></Button>
          <Drawer anchor={"left"} open={state["left"]} style={{
              display:'flex',
              alignItems:'center'
          }} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
