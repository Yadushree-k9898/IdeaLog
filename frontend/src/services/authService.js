export const authService = {
    login: async ({ email, password }) => {
      return { email, id: "123" }; // Mocking auth
    },
    logout: () => {},
    getCurrentUser: () => null,
  };
  