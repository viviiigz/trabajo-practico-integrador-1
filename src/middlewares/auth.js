import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => { 

    const token = req.cookies.token;
    if (!token) {
        // el usuario no está autenticado.
        return res.status(401).json({ message: "No autenticado. Por favor, inicia sesión." });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {

        res.status(401).json({ message: "Token no válido. Por favor, vuelve a iniciar sesión.", erro });
    }
};