import { app } from "./index";

const PORT = process.env.PORT || 8091;

const server = app.listen(PORT, () =>
  console.log(`Server is running on PORT ${PORT}`)
);

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

export default server;
