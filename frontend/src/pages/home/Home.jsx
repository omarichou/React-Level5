import "./Home.css";

import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { useGetProductsByNameQuery } from "../../Redux/ProductApi";

import { useSelector, useDispatch } from "react-redux";
import {
  Addproduct_to_cart,
  decremente,
  incremente,
  Add_cartt_array_to_localstorag,
} from "../../Redux/CartSlice";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import {  useNavigate } from "react-router-dom";

import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

import { sendEmailVerification } from "firebase/auth";

const Home = () => {
  const { data, isLoading } = useGetProductsByNameQuery();

  const [user, loading] = useAuthState(auth);

  // @ts-ignore
  const { cartt_array, cartt_array_id } = useSelector((state) => state.carttt);

  const dispatch = useDispatch();

  const theme = useTheme();
  const Navigate = useNavigate();

  const Products_Quentité = (item_of_data) => {
    let new_array = cartt_array.find((item) => {
      return item.id === item_of_data.id;
    });
    return new_array.quantité;
  };

  const navigate = useNavigate();


  useEffect(() => {
    if (!user && !loading) {
      dispatch(Add_cartt_array_to_localstorag(""));
      navigate("/signin");
    }
  });

  useEffect(() => {
    if (user && user.emailVerified) {
      dispatch(Add_cartt_array_to_localstorag(user.uid));
    
    }
  },[dispatch, user]);


  if (isLoading && loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (user && !user.emailVerified) {
    return (
      <Stack sx={{ justifyContent: "center" }}>
        <Typography variant="body1">
          We send you an email to verify your Account
        </Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            sendEmailVerification(auth.currentUser).then(() => {
              // Email verification sent!
              // ...
            });
          }}
        >
          Send again
        </Button>
      </Stack>
    );
  }

  if (data && user && user.emailVerified) {
    // dispatch(Add_cartt_array_to_localstorag(user))
    return (
      <Stack
        direction="row"
        sx={{ justifyContent: "center", flexWrap: "wrap" }}
      >
        {data.map((item, index) => {
          return (
            <Card className="card" key={item.id} sx={{ maxWidth: 277, m: 1 }}>
              <CardMedia
                onClick={() => {
                  Navigate(`details_products/${item.id}`);
                }}
                component="img"
                height="277"
                image={item.imageLink[0]}
                alt="Paella dish"
              />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>

              <CardActions
                disableSpacing
                sx={{ justifyContent: "space-between" }}
              >
                {cartt_array_id.includes(item.id) ? (
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={(params) => {
                        dispatch(decremente(item));
                        // console.log(cartt_array);
                      }}
                    >
                      <Remove />
                    </IconButton>
                    <Badge
                      // @ts-ignore
                      badgeContent={Products_Quentité(item)}
                      color="primary"
                      sx={{ mx: 2 }}
                    />
                    <IconButton
                      color="primary"
                      onClick={(params) => {
                        dispatch(incremente(item));
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "capitalize",
                      lineHeight: 1.1,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      dispatch(Addproduct_to_cart(item));
                    
                    }}
                  >
                    <ShoppingCart sx={{ fontSize: "20px", mr: 1 }} />
                    Add To Card
                  </Button>
                )}

                <Typography variant="body1" color={theme.palette.error.light}>
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
    );
  }
};

export default Home;
