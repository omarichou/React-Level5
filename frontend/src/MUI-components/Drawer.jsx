import {
  Divider,
  Drawer,
  List,
  useTheme,
  IconButton,
  Badge,
  styled,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Box,
  ButtonGroup,
  Button,
} from "@mui/material";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {  signOut } from "firebase/auth";

import {
  Brightness4,
  Brightness7,
  Home,
  Login,
  Logout,
  ShoppingCart,
  VpnKey,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { useSelector  } from "react-redux";
import { auth } from "../firebase/config";



import React from "react";
// import { Add_cartt_array_to_localstorag, remove_data_to_local_storage } from "../Redux/CartSlice";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 377,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "6px",
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Drawerr = ({
  drawerWidth,
  setmyMOde,
  noneORblock,
  drawerType,
  hideDrawer,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const currentLocation = useLocation();

  const navigate = useNavigate();
  const theme = useTheme();
  

  // @ts-ignore
  const { cartt_array } = useSelector((state) => state.carttt);

  const myList = [
    { text: "Home", icon: <Home />, path: "/" },
    {
      text: "Cart",
      icon: (
        <StyledBadge badgeContent={cartt_array.length} color="secondary">
          <ShoppingCart />
        </StyledBadge>
      ),
      path: "/cart",
    },
    { text: "Sign-up", icon: <VpnKey />, path: "/signup" },
    { text: "Log-in", icon: <Login />, path: "/signin" },
  ];



  return (
    <Drawer
      sx={{
        display: { xs: noneORblock, sm: "block" },

        width: `${drawerWidth}px`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}px`,
          boxSizing: "border-box",
        },
      }}
      variant={drawerType}
      anchor="left"
      open={true}
      onClose={() => {
        hideDrawer();
      }}
    >
      <List>
        <ListItem
          sx={{ display: "flex", justifyContent: "center", mb: "14px" }}
          disablePadding
        >
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );

              setmyMOde(theme.palette.mode === "light" ? "dark" : "light");
            }}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7 sx={{ color: "orange" }} />
            ) : (
              <Brightness4 />
            )}
          </IconButton>
        </ListItem>

        <Divider />

        {myList.map((item) => {
          return (
            <ListItem
              key={item.text}
              sx={{
                bgcolor:
                  currentLocation.pathname === item.path
                    ? // @ts-ignore
                      theme.palette.favColor.main
                    : null,
              }}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleOpen}
          >
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log-out" />
          </ListItemButton>
        </ListItem>

        
      </List>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open} className="yes_or_non" >
          <Box sx={style}>
            <Typography variant="h6" color="error" sx={{ textAlign: "center" , pb:3 }}>
              are you sure
            </Typography>

            <ButtonGroup  fullWidth variant="text" aria-label="text button group">
              <Button sx={{p:1}} 
              onClick={async () => {
                signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  navigate("/signin");
                })
                .catch((error) => {
                  // An error happened.
                });

                  handleClose()



              }}>Yes</Button>

              <Button onClick={handleClose}>Non</Button>
            
            </ButtonGroup>

          </Box>
        </Fade>
      </Modal>
    </Drawer>
  );
};

export default Drawerr;
