import { makeStyles } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import { useRouteMatch } from "react-router";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LogoTEC from '../../blob/images/LogoTEC.png';
import { ReactComponent as Candor } from '../../blob/svg/candor.svg';
import Text from "../shared/Text";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from "react-responsive";


  


const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "white",
      width: "100%",
      minHeight:"100vh",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#24272C",
      color: "white",
      fontFamily:"Manifold"
    },
    active: {
      background: "#f4f4f4",
      color: "#24272C",
      fontWeight: "bold",
      borderTopRightRadius:"10px",
      borderBottomRightRadius:"10px",
      margin:"1rem 0"
    },
    marker: {
      position:"absolute",
      left:"0.3rem",
      width:"0.25rem",
      backgroundColor:"black",
      height:"2rem",
      borderRadius:"25px"
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor:"white"
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
    listitem: {
      margin:"1rem 0"
    }
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open,setOpen] = useState(false);
  const [username, setUsername] = useState((JSON.parse(localStorage.getItem('user'))).name)

  let { path, url } = useRouteMatch();

  const menuItems = [
    {
      text: "Home",
      path: `/faction`,
    },
    // {
    //   text: "Acara",
    //   path: `${url}/acara`,
    // },
    {
      text: "Absen",
      path: `/faction/absen`,
    },
  ];

  const isMobile = useMediaQuery({
      query: "(min-width: 425px)",
    });

  return (
    <div className={classes.root}>
      {
        !isMobile &&
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={()=>setOpen(true)}
          edge="start"
          style={{position:"absolute",left:"2rem",top:"1rem",color:"black"}}
        >
          <MenuIcon />
        </IconButton>
      }
      <AppBar 
        position="fixed" 
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Text type="secondary" color="black" className={classes.date}>
            Hello {username}
          </Text>
          <Avatar style={{cursor:'pointer'}} className={classes.avatar} onClick={()=>history.push('/profile')}/>
        </Toolbar>
      </AppBar>

      <Drawer
        style={{
          position:`${location.pathname === "/faction/absen" ? "absolute" : ""}`,
          width:0
        }}
        className={classes.drawer}
        variant={isMobile ? "permanent" : "persistent"}
        open={open}
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div style={{display:"flex", width:"100%", justifyContent:"space-between", padding:"0.5rem 1rem" }}>
          <img src={LogoTEC} style={{height:"2rem",cursor:"pointer"}} onClick={()=>history.push('/')}/>
          <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <Candor style={{height:"1.5rem"}}/> 
            <Text size={0.5}>
              Candor
            </Text>
          </div>
        </div>
        <br/>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={
                location.pathname == item.path ? classes.active : classes.listitem 
              }
            >
              {
                location.pathname == item.path
                &&
                <div className={classes.marker}/>
              }
              <Text type="secondary" color={location.pathname == item.path ? "black" : "white"}>
                {item.text} 
              </Text>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page} 
        onClick={
          ()=>{
            if(!isMobile && open){
              setOpen(false)
            }
          }
        } 
      >
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
