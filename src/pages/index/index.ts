import template from "./template.marko";

export default (req, res) => {
  res.marko(template, {
    showInfoCard: req.query.showInfoCard === "1",
  });
};
