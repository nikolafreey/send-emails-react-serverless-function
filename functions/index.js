const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const cors = require("cors")({ origin: true });

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikolav54@gmail.com",
    pass: "nikolavukovic54",
  },
});

exports.sendEmail = functions.https.onRequest((req, res) => {
  //for testing purposes
  console.log(
    "from sendEmail function. The request object is:",
    JSON.stringify(req.body)
  );

  //enable CORS using the `cors` express middleware.
  cors(req, res, () => {
    //get contact form data from the req and then assigned it to variables
    // const email = req.body.data.email;
    // const name = req.body.data.name;
    // const message = req.body.data.message;

    console.log(
      "email ",
      req.body.email,
      "name ",
      req.body.name,
      "message ",
      req.body.message
    );

    //config the email message
    const mailOptions = {
      from: req.body.email,
      to: `your@email`,
      subject: "New message from the nodemailer-form app",
      text: `${req.body.name} says: ${req.body.message}`,
    };

    //call the built in `sendMail` function and return different responses upon success and failure
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      }

      return res.status(200).send({
        data: {
          status: 200,
          message: "sent",
        },
      });
    });
  });
});
