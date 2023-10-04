 
import {
  Toolbar,
  AppBar,
  Link,
  IconButton,
  Box,
} from "@mui/material";
import { Home, LocalMall, Menu } from "@mui/icons-material";


const Appbar = ({ drawerWidth, showDrawer }) => {
  return (
    <AppBar
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { xs: 0, sm: `${drawerWidth}px` },
      }}
      position="static"
    >
      <Toolbar>
        <IconButton
          onClick={() => {
            showDrawer();
          }}
          sx={{ mr: "9px", display: { sm: "none" } }}
          color="inherit"
        >
          <Menu />
        </IconButton>
        <Link
          sx={{
            display:'flex',
            alignItems:'center',
            textDecoration: "none",
            transition:'all 0.5s !important',
            "&:hover": { letterSpacing:1  },
          }}
          color="inherit"
          href="/cart"
        >
          <LocalMall sx={{mr:1,transition:'all 0.5s !important', "&:hover": {  scale:'1.07'  }, }} />
         E-commerce Project
        </Link>
        <Box sx={{flexGrow:1}} ></Box>

        

        <Link href='/' color='inherit'>
          <Home   sx={{transition:'all 0.5s !important',fontSize:'26px', "&:hover": {  scale:'1.2' }, }}   />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
