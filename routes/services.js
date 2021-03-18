const express = require("express");
const route = express.Router();
const renderTemplate = require("../server-src/RenderTemplates");
const handlebars = require("handlebars");
const fs = require("fs");

route.get("/", (request, response) => {
  navigationActiveClasses = {
    "home-selected": false,
    "services-selected": true,
    "contact-selected": false,
  };
  const navigation = renderTemplate(
    "./public/templates/navigation.html",
    navigationActiveClasses
  );
  const headerTags = renderTemplate("./public/templates/headerTags.html");
  const footer = renderTemplate("./public/templates/footer.html");

  const source = fs.readFileSync("./public/static/services.html");
  const template = handlebars.compile(source.toString());

  const data = {
    navigation,
    headerTags,
    footer,
  };

  const result = template(data);

  response.send(result);
});

module.exports = route;
