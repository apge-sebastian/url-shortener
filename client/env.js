export function getEnvVars() {
    if (import.meta.env.DEV) {
        return import.meta.env;
    } else {
        return import('./.env.production').then((env) => {
            return { ...env.default };
        });
    }
}
