// Import Component
import Login from "../pages/Login/Login";
import Landing from "../pages/Landing/Landing";
import FactionLayout from "../pages/Faction/FactionLayout";
import Profile from "../pages/Profile/Profile";

// buat return {label,path,component} yang bakal di ambil di App.js
const route = (label, path, component) => ({
  label,
  path,
  component,
});

// Bikin route
export const LOGIN_PAGE = route("Login", "/login", Login);
export const LANDING_PAGE = route("Landing", "/", Landing);
export const FACTION_PAGE = route("Faction", "/faction", FactionLayout);
export const PROFILE_PAGE = route("Profile", "/profile", Profile);

// yang gak bisa diakses tanpa authentication
export const AllPrivateRoutes = [
  PROFILE_PAGE,
  FACTION_PAGE,
];

export const AllOpenRoutes = [LANDING_PAGE, LOGIN_PAGE];
