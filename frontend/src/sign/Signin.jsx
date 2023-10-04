import React, { useEffect, useState } from "react";
import { Email, KeyboardArrowRight, MailLock } from "@mui/icons-material";
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

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

import { useAuthState } from "react-firebase-hooks/auth";
import { sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
import {  Add_cartt_array_to_localstorag } from "../Redux/CartSlice";
import {  useDispatch } from "react-redux";


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

const Signin = () => {
  const [affiche_error, setaffiche_error] = useState(false);
  const [errorr, seterrorr] = useState("");

  const [user, loading] = useAuthState(auth);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();


  const [emmail, setemmail] = useState("");
  const [passsword, setpasssword] = useState("");

  const [E_maill_reset, setE_maill_reset] = useState("");

  useEffect(() => {
    if (user && user.emailVerified) {
      dispatch(Add_cartt_array_to_localstorag(user.uid)) 
      navigate("/");
    }
  });

  useEffect(() => {
    if (!user && !loading) {
     dispatch(Add_cartt_array_to_localstorag(''))  
    }
 });

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
          // onSubmit={handleSubmit(onSubmitt)}
          sx={{
            width: "355px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <TextField
            {...register("E_maill", {
              required: { value: true, message: "E_mail is required" },
              minLength: { value: 3, message: " minLength is 3" },
            })}
            // error={Boolean(errors.E_maill)}
            type="email"
            onChange={(eo) => {
              setemmail(eo.target.value);
            }}
            defaultValue={emmail}
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
            helperText={errors.E_maill ? errors.E_maill?.message : null}
          />

          <TextField
            {...register("Passwordd", {
              required: { value: true, message: "Password is required" },
              minLength: {
                value: 3,
                message: "minLength is 3",
              },
            })}
            // error={Boolean(errors.Passwordd)}
            type="password"
            // @ts-ignore
            onChange={(eo) => {
              setpasssword(eo.target.value);
            }}
            defaultValue={passsword}
            noValidate
            autoComplete="off"
            fullWidth
            variant="standard"
            label="Passwordd"
            sx={{ m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailLock />
                </InputAdornment>
              ),
            }}
            // @ts-ignore
            helperText={errors.Passwordd ? errors.Passwordd?.message : null}
          />

          <Button
            type="submit"
            sx={{ mt: "20px", mb: "15px" }}
            variant="contained"
            onClick={(eo) => {
              eo.preventDefault();
              signInWithEmailAndPassword(auth, emmail, passsword)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  // ...
                  sendEmailVerification(auth.currentUser).then(() => {
                    // Email verification sent!
                    // ...
                  });

                  navigate("/");
                  setemmail("");
                  setpasssword("");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;

                  setaffiche_error(true);
                  seterrorr(errorCode);
                });
            }}
          >
            Sign in <KeyboardArrowRight />
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
            Don't hava an account{" "}
            <span
              className="spn"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign-up
            </span>
          </Typography>
        </Box>

        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleOpen}
        >
          Forgot Passwoed ?
        </Button>
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
          <Fade in={open}>
            <Box sx={style} component="form">
              <TextField
                {...register("E_maill_reset", {
                  required: {
                    value: true,
                    message: "E_mail_reset is required",
                  },
                  minLength: {
                    value: 3,
                    message: "minLength is 3",
                  },
                })}
                onChange={(eo) => {
                  setE_maill_reset(eo.target.value);
                }}
                type="email"
                defaultValue={E_maill_reset}
                // @ts-ignore
                noValidate
                autoComplete="off"
                fullWidth
                variant="standard"
                label="E-mail reset Passwordd"
                sx={{ m: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailLock />
                    </InputAdornment>
                  ),
                }}
                // @ts-ignore
                helperText={
                  errors.E_maill_reset ? errors.E_maill_reset?.message : null
                }
              />
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  onClick={(eo) => {
                    eo.preventDefault();
                    sendPasswordResetEmail(auth, E_maill_reset)
                      .then(() => {
                        // Passwordd reset email sent!
                        setE_maill_reset("");
                        // ..
                        handleClose();
                      })
                      .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                      });
                  }}
                  variant="contained"
                  sx={{ mt: 1 }}
                >
                  reset Passwordd
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>

        {affiche_error && (
          <Typography sx={{ mt: 3 }} variant="body1">
            {errorr}
          </Typography>
        )}
      </div>
    );
  }
};

export default Signin;
