import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useGetOneProductsByNameQuery } from "../../Redux/ProductApi";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./details_products.css";
import DetailsThumbb from "./DetailsThumbb";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import {
  Addproduct_to_cart,
  decremente,
  incremente,
  Add_cartt_array_to_localstorag,
} from "../../Redux/CartSlice";

import { auth } from "../../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const DetailsProducts = () => {
  const [user, loading] = useAuthState(auth);

  // @ts-ignore
  const { cartt_array, cartt_array_id } = useSelector((state) => state.carttt);

  const dispatch = useDispatch();

  let { stringid } = useParams();
  const { data, error, isLoading } = useGetOneProductsByNameQuery(stringid);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);

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
  }, [dispatch, user]);

  const Products_Quentité = (item_of_data) => {
    let new_array = cartt_array.find((item) => {
      return item.id === item_of_data.id;
    });
    return new_array.quantité;
  };

  const handleTab = (index) => {
    // this.setState({index: index})
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  if (isLoading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex" }}>
        <Typography variant="h1" color="error">
          {" "}
          ERROR{" "}
        </Typography>
      </Box>
    );
  }

  if (data) {
    return (
      <div className="app details-page">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{data.productName}</h2>
              <span>${data.price}</span>
            </div>

            <p>{data.description}</p>

            <DetailsThumbb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />

            {cartt_array_id.includes(data.id) ? (
              <Box>
                <IconButton
                  color="primary"
                  onClick={(params) => {
                    dispatch(decremente(data));
                    console.log(cartt_array);
                  }}
                >
                  <Remove />
                </IconButton>
                <Badge
                  // @ts-ignore
                  badgeContent={Products_Quentité(data)}
                  color="primary"
                  sx={{ mx: 2 }}
                />
                <IconButton
                  color="primary"
                  onClick={(params) => {
                    dispatch(incremente(data));
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
                  dispatch(Addproduct_to_cart(data));
                }}
              >
                <ShoppingCart sx={{ fontSize: "20px", mr: 1 }} />
                Add To Card
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DetailsProducts;
