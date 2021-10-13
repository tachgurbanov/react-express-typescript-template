// Token Key
export const TOKEN_KEY = "65a29308d13f891091a0df7551e7825f";

// Verify
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

// Return Token
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Login
export const login = (token: any) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Logout
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};