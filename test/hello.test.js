const response = require("../src/functions/HelloWorld.js");

describe("Hello World Function", () => {
  test("should return 'Hello, World!'", async () => {
    const context = {};
    const req = {};
    await response(context, req);
    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe("Hello, World!");
  });

  test("should return 200 status code", async () => {
    const context = {};
    const req = {};
    await response(context, req);
    expect(context.res.status).toBe(200);
  });

  test("should return a non-empty response", async () => {
    const context = {};
    const req = {};
    await response(context, req);
    expect(context.res.body).toBeTruthy();
  });
});
