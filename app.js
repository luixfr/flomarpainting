const renderTemplate = require("./server-src/RenderTemplates");
const express = require("express");
const handlebars = require("handlebars");
const fileUpload = require("express-fileupload");

const app = express();

app.get("/", (req, res) => {
  navigationActiveClasses = {
    "home-selected": true,
    "services-selected": false,
    "contact-selected": false,
  };
  const navigation = renderTemplate(
    "./public/templates/navigation.html",
    navigationActiveClasses
  );
  const headerTags = renderTemplate("./public/templates/headerTags.html");
  const footer = renderTemplate("./public/templates/footer.html");

  const source = fs.readFileSync("./public/static/index.html");
  const home = handlebars.compile(source.toString());
  res.send(home({ navigation, headerTags, footer }));
});

app.use(express.static(__dirname + "/public/static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 1 * 1024 * 1024 },
  })
);

// Map routes to all .js files in the /routes folder, to avoid adding each one by hand
const fs = require("fs");
fs.readdirSync("./routes").map((filename) => {
  const module = require(`./routes/${filename}`);
  const route = filename.replace(".js", "");
  app.use(`/${route}`, module);
});

app.listen(3000, () => console.log("server started"));
