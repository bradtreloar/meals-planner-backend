import createApp from "./app";

const PORT = 3000;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
