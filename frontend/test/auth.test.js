import { authService } from "../src/services/authService";

test("should return a user on login", async () => {
  const user = await authService.login({ email: "test@test.com", password: "123456" });
  expect(user).toEqual({ email: "test@test.com", id: "123" });
});

test("should log out user", () => {
  authService.logout();
  expect(authService.getCurrentUser()).toBeNull();
});
