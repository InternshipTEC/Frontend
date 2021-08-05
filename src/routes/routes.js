// Import Component
import Signup from "../pages/Signup/Signup"
import Login from "../pages/Login/Login"
import Landing from "../pages/Landing/Landing"
import Faction from "../pages/Faction/Faction"

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
export const FACTION_PAGE = route('Faction', '/faction', Faction)
//Misal nanti ada page ini:

// yang gak bisa diakses tanpa authentication
export const AllPrivateRoutes = [

]

export const AllOpenRoutes = [
    LANDING_PAGE,
    LOGIN_PAGE,
    SIGNUP_PAGE,
    FACTION_PAGE,
]

