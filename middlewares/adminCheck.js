import { SESSION_USER } from "../public/src/js/index.js";

const adminCheck = (req, res, next) =>{
    SESSION_USER[0].isAdmin ? next() : res.send({error: "No puedes acceder a esta pagina"});
}

export default adminCheck;