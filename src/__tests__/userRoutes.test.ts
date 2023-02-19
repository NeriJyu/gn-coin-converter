// import request from "supertest";
// // import { app } from "../index";
// import server from "../server";

// describe("Create user", () => {
//   //   let server: any;
//   //   beforeEach(() => {
//   //     server = app.listen(8000);
//   //   });

//   it("should be able to create user!", async () => {
//     const response = await request(server).post("/users").send({
//       name: "Usuário Teste",
//       email: "usuariotestederota4@hotmail.com",
//       password: "ABC123def456",
//     });

//     console.log("response: ", response);

//     expect(response.status).toBe(201);
//   });

//   afterEach(() => {
//     server.close();
//   });
// });
