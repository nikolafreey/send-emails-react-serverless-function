import { useState } from "react";
import "./App.css";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

//add CSS classes for Material UI components calling a function that returns another function
const useStyles = makeStyles((theme) => ({
  //the CSS class honeypot is added to the honeypot field later on, which is not displayed to users.
  honeypot: {
    display: "none",
  },
}));

function App() {
  //assign the constant `classes` to an object for Material IU components by calling a function
  const classes = useStyles();

  //define `error` state and the function to change it. The value is false by default
  const [error, setError] = useState(false);

  //define `openSnackbar` state and the function to change it. The value is false by default
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //define `isLoading` state and the function to change it. The value is false by default
  const [isLoading, setIsLoading] = useState(false);

  //define `formIsValid` state and the function to change it. The value is false by default
  const [formIsValid, setFormIsValid] = useState(false);

  //define `contacForm` state and the function to change it
  //the whole form is represented by an object, with nested objects inside that represent the input fields
  const [contactForm, setContactForm] = useState({
    name: {
      value: "",
      elementConfig: {
        required: true,
        id: "standard-basic",
        label: "Your Name",
      },
      validation: {
        required: true,
        errorMessage: "Please, enter your name!",
      },
      valid: false,
      blur: false,
    },
    email: {
      value: "",
      elementConfig: {
        required: true,
        id: "standard-basic",
        label: "Your Email",
      },
      validation: {
        required: true,
        isEmail: true,
        errorMessage: "Please, enter your email",
      },
      valid: false,
      blur: false,
    },
    message: {
      value: "",
      elementConfig: {
        required: true,
        id: "standard-multiline-static",
        label: "Your Message",
        multiline: true,
        rows: 4,
      },
      validation: {
        required: true,
        errorMessage: "Please, enter your message",
      },
      valid: true,
      blur: true,
    },

    //this honeypot field isn't rendered to the DOM, so users don't see it, but it fools bots that fill it automatically
    honeypot: {
      value: "",
      elementConfig: {
        className: classes.honeypot,
        label:
          "If you are a human, do not type anything here. I am here to fool bots",
      },
      validation: {},
      valid: true,
      blur: false,
    },
  });

  //convert the `contactForm` object into an array
  const formElementsArray = [];
  for (let key in contactForm) {
    formElementsArray.push({
      id: key,
      ...contactForm[key],
    });
  }

  const formElements = formElementsArray.map((element) => {
    return (
      <Box key={element.id}>
        <TextField
          {...element.elementConfig}
          error={!element.valid && element.blur}
          helperText={
            !element.valid && element.blur
              ? element.validation.errorMessage
              : null
          }
          onChange={(event) => inputChangedHandler(event, element.id)}
          onBlur={(event) => inputChangedHandler(event, element.id)}
          value={element.value}
        ></TextField>
      </Box>
    );
  });

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = {
      ...contactForm[inputIdentifier],
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        contactForm[inputChangedHandler].validation
      ),
      blur: event.type == "blur" ? true : false,
      touched: true,
    };
  };

  return <div></div>;
}

export default App;
