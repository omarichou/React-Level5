import React, { useEffect } from "react";
import {
  Email,
  KeyboardArrowRight,
  MailLock,
  PersonAddAlt,
} from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuthState } from "react-firebase-hooks/auth";

import { updateProfile } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import {  useDispatch } from "react-redux";
import {  Add_cartt_array_to_localstorag } from "../Redux/CartSlice";


const Signup = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.E_mail, data.Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid)
        // ...

        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
        });

        updateProfile(auth.currentUser, {
          displayName: data.user_Name,
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });

        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // ..
      });
  };


  useEffect(  () => {
    if  (user && user.emailVerified) {
      navigate("/");
    }
    if  (!user ) {
      dispatch(Add_cartt_array_to_localstorag(''))

    }
  });

  if (  loading) {
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

  if (!user) {
    return (
      <div>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "355px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <TextField
            {...register("user_Name", {
              required: { value: true, message: "user Name is required" },
              minLength: { value: 3, message: " minLength is 3" },
            })}
            error={Boolean(errors.user_Name)}
            type="text"
            // @ts-ignore
            noValidate
            autoComplete="off"
            fullWidth
            variant="standard"
            label="user-Name"
            sx={{ m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonAddAlt />
                </InputAdornment>
              ),
            }}
            // @ts-ignore
            helperText={errors.user_Name ? errors.user_Name?.message : null}
          />
  
          <TextField
            {...register("E_mail", {
              required: { value: true, message: "E_mail is required" },
              minLength: { value: 3, message: " minLength is 3" },
            })}
            error={Boolean(errors.E_mail)}
            type="email"
            // @ts-ignore
            noValidate
            autoComplete="off"
            fullWidth
            variant="standard"
            label="E-mail"
            sx={{ m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            // @ts-ignore
            helperText={errors.E_mail ? errors.E_mail?.message : null}
          />
  
          <TextField
            {...register("Password", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 3,
                message: "minLength is 3",
              },
            })}
            error={Boolean(errors.Password)}
            type="password"
            // @ts-ignore
            noValidate
            autoComplete="off"
            fullWidth
            variant="standard"
            label="Password"
            sx={{ m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailLock />
                </InputAdornment>
              ),
            }}
            // @ts-ignore
            helperText={errors.Password ? errors.Password?.message : null}
          />
  
          <Button
            type="submit"
            sx={{ mt: "20px", mb: "15px" }}
            variant="contained"
          
          >
            Login <KeyboardArrowRight />
          </Button>
  
          {/* {errors.title?.type === "required" && <h5>First name is required</h5>}
          {errors.title?.type === "minLength" && <h5> minLength is 3</h5>}
          {errors.price?.type === "required" && <h5>Prix is required</h5>}
          {errors.price?.type === "min" && (
            <h5>The number you entered must be greater than 3 </h5>
          )}
          {errors.price?.type === "max" && (
            <h5>The number you entered must be less than 100</h5>
          )} */}
  
          <Typography variant="body1">
            Already hava an account{" "}
            <span
              className="spn"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign-in
            </span>
          </Typography>
        </Box>
      </div>
    );
  }
  
  
};

export default Signup;
