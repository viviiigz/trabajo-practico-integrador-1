import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    try {
        return bcrypt.hash(password, 10);
    } catch (error) {
        console.error("Error al hashear la contraseña:", error);
        throw new Error("No se pudo hashear la contraseña.");
    }
};

export const comparePasswords = (password, hashedPassword) => {
    try {
        // compara la contraseña en texto plano con la hasheada
        return bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error("Error al comparar contraseñas:", error);
        throw new Error("Error al autenticar.");
    }
};