// Import Component
import Signup from "../pages/Signup/Signup"
import Login from "../pages/Login/Login"
import Landing from "../pages/Landing/Landing"
import FactionLayout from "../pages/Faction/FactionLayout"
import About from "../pages/About/About"
import Profile from "../pages/Profile/Profile"

// buat return {label,path,component} yang bakal di ambil di App.js
const route = (label, path, component) => ({
    label,
    path,
    component
})

// Bikin route
export const SIGNUP_PAGE = route("Signup","/signup",Signup)
export const LOGIN_PAGE = route('Login', '/login', Login)
export const LANDING_PAGE = route('Landing', '/', Landing)
export const FACTION_PAGE = route('Faction', '/faction', FactionLayout)
export const FACTION_ABSEN_PAGE = route('Faction', '/faction/absen', FactionLayout)
export const ABOUT_PAGE = route('About', '/about', About)
export const PROFILE_PAGE = route('Profile', '/profile', Profile)
//Misal nanti ada page ini:

// yang gak bisa diakses tanpa authentication
export const AllPrivateRoutes = [
    PROFILE_PAGE,
    FACTION_PAGE,
    FACTION_ABSEN_PAGE
]

export const AllOpenRoutes = [
    LANDING_PAGE,
    LOGIN_PAGE,
    ABOUT_PAGE
]

