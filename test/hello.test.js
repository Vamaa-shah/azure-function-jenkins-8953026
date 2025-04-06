// test/hello.test.js

describe("Hello World Function", () => {
    test("should return 'Hello, World!'", () => {
      const context = {};
      const req = {};
      const response = require("../index");
  
      return response(context, req).then(() => {
        expect(context.res.status).toBe(200);
        expect(context.res.body).toBe("Hello, World!");
      });
    });
  
    test("should return 200 status code", async () => {
      const context = {};
      const req = {};
      const response = require("../index");
  
      await response(context, req);
      expect(context.res.status).toBe(200);
    });
  
    test("should return a non-empty response", async () => {
      const context = {};
      const req = {};
      const response = require("../index");
  
      await response(context, req);
      expect(context.res.body).toBeTruthy();
    });
  });
  