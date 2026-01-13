/*
This file contains a blank username for when the game is running in standalone mode.
When it is deployed to an environment with authentication, the integrated auth provider is used instead.
*/
export const useAuth = () => ({
    userDetails: { username: "" }
});