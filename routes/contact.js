const express = require("express");
const route = express.Router();
const renderTemplate = require("../server-src/RenderTemplates");
const handlebars = require("handlebars");
const fs = require("fs");
const nodemailer = require("nodemailer");

route.get("/", (request, response) => {
  navigationActiveClasses = {
    "home-selected": false,
    "services-selected": false,
    "contact-selected": true,
  };
  const navigation = renderTemplate(
    "./public/templates/navigation.html",
    navigationActiveClasses
  );
  const headerTags = renderTemplate("./public/templates/headerTags.html");
  const footer = renderTemplate("./public/templates/footer.html");

  const source = fs.readFileSync("./public/static/contact.html");
  const template = handlebars.compile(source.toString());

  const data = {
    navigation,
    headerTags,
    footer,
  };

  const result = template(data);

  response.send(result);
});

route.post("/", async (request, response) => {
  const clientInfo = request.body;

  const clientName = clientInfo.formName;
  const clientPhone = clientInfo.formPhone;
  const clientEmail = clientInfo.formEmail;
  const clientMessage = clientInfo.formMessage;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });

  const emailMessage = `${clientName} wants to contact you.
  Client Info
  Name: ${clientName}
  Email: ${clientEmail}
  Phone: ${clientPhone}
  Message: ${clientMessage}`;

  const emailHTMLMessage = `<h1>${clientName} wants to contact you</h1>
  <p><strong>Name:</strong></p>${clientName}
  <p><strong>Email:</strong></p>${clientEmail}
  <p><strong>Phone:</strong></p>${clientPhone}
  <p><strong>Message:</strong></p>${clientMessage}`;

  const emailOptions = {
    from: "flomarpainting.com",
    to: "luisk.fra@gmail.com",
    subject: "Someone tried to contact you trough your website",
    text: emailMessage,
    html: emailHTMLMessage,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
  response.send({ message: "Email Sent" });
});

module.exports = route;
