const fs = require("fs");
const handlebars = require("handlebars");

const renderTemplate = (template, props = null) => {
  let source = fs.readFileSync(template, "utf8").toString();
  let html = handlebars.compile(source);
  if (props) {
    return html(props);
  } else return html();
};

module.exports = renderTemplate;
