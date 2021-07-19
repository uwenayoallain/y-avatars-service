const React = require("react");
const { renderToString } = require("react-dom/server");
const Avatar = require("y-avatars");
const DEFAULT_COLORS = [
  "#92A1C6",
  "#146A7C",
  "#F0AB3D",
  "#C271B4",
  "#C20D90",
].join(",");
const DEFAULT_SIZE = 200;
const DEFAULT_RADIUS = 50;
const DEFAULT_VARIANT = "marble";
const VALID_VARIANTS = new Set([
  "pixel",
  "frame",
  "ring",
  "smilly",
  "sunset",
  "marble",
  "triangle",
  "patterns",
  "classic",
]);

function normalizeColors(colors) {
  const colorPalette = colors.split(",");

  if (colorPalette.length) {
    return colorPalette.map((color) =>
      color.startsWith("#") ? color : `#${color}`
    );
  }
}

const app = require("express")();

app.get("/:variant?/:size?/:name?/:radius?", (req, res) => {
  const variant = req.params.variant || DEFAULT_VARIANT;
  const size = req.params.size || DEFAULT_SIZE;
  const name = req.query.name || req.params.name || Math.random().toString();
  const colors = normalizeColors(req.query.colors || DEFAULT_COLORS);
  const radius = req.query.radius || req.params.radius || DEFAULT_RADIUS;

  if (!VALID_VARIANTS.has(variant)) {
    return res.send(`Invalid Variant`);
  }
  res.send(
    renderToString(
      React.createElement(Avatar, { variant, size, name, colors, radius })
    )
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}, http://localhost:${port}`);
});
