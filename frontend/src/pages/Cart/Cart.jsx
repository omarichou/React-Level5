import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import "./cart.css";
import React, { useEffect } from "react";
import { Add, Delete, Remove } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import {
  decremente,
  delete_cart,
  incremente,
  Add_cartt_array_to_localstorag,

} from "../../Redux/CartSlice";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

const Cart = () => {
  const [user, loading] = useAuthState(auth);

  // @ts-ignore
  const { cartt_array } = useSelector((state) => state.carttt);
  const dispatch = useDispatch();
  let price_total = 0;

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

  if (loading) {
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

  if (user && user.emailVerified) {
    return (
      <Box>
        {cartt_array.map((item) => {
          price_total += Number(item.price) * Number(item.quantité);
          return (
            <Paper
              key={item.id}
              className="paper"
              elevation={4}
              sx={{
                backgroundColor: "#fff !important",
                my: 2,
                display: "flex",
                p: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Button
                  onClick={() => {
                    dispatch(delete_cart(item));
                  }}
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                  color="error"
                >
                  Delete
                </Button>

                <IconButton
                  onClick={() => {
                    dispatch(delete_cart(item));
                  }}
                  sx={{ display: { xs: "inline-flex", md: "none" } }}
                  color="error"
                >
                  <Delete />
                </IconButton>
              </div>

              <Typography variant="body1" color="initial" className="size">
                ${Number(item.price) * Number(item.quantité)}
              </Typography>

              <Box>
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(decremente(item));
                  }}
                >
                  <Remove />
                </IconButton>
                <Badge
                  badgeContent={item.quantité}
                  color="primary"
                  sx={{ mx: 2 }}
                />
                <IconButton
                  color="primary"
                  onClick={() => {
                    dispatch(incremente(item));
                  }}
                >
                  <Add />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1" color="initial" className="size">
                  {item.productName}
                </Typography>

              
            <img src={item.imageLink[0]} className="imaage"  alt=""  />

              </Box>
            </Paper>
          );
        })}

        <Paper
          elevation={4}
          sx={{ textAlign: "center", width: "260px", mx: "auto", my: "50px" }}
        >
          <Typography sx={{ py: 2 }} variant="body1">
            Cart Summary
          </Typography>
          <Divider />
          <Box
            sx={{ display: "flex", justifyContent: "space-between", p: 1.2 }}
          >
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">${price_total}</Typography>
          </Box>
          <Button fullWidth variant="contained">
            {" "}
            checkout{" "}
          </Button>
        </Paper>
      </Box>
    );
  }
};

export default Cart;
