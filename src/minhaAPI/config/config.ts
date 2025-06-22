// Configurando o secret para o JWT

// Use uma interface para tipar explicitamente jwtToken para maior segurança de tipo
interface JwtConfig {
    secret: string;
    exp: string | number; // '7d' é string, mas também aceita números (segundos)
}

interface AppConfig {
    jwt: JwtConfig;
}

export const jwtToken: AppConfig = {
    jwt: {
        // Assegure que process.env.JWT_SECRET é tratado como string
        // mesmo com o fallback, para acalmar o TypeScript.
        secret: (process.env.JWT_SECRET || 'default') as string, 
        exp: "7d", // Expiração do token
    }
};