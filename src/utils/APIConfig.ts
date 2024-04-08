const authModuleUrl =
    process.env.NODE_ENV === "production"
        ? `${import.meta.env.VITE_APP_BASE_API_URL}/Auth/`
        : "/api/Auth/"
const lookUpModuleUrl = process.env.NODE_ENV === "production" ? `${import.meta.env.VITE_APP_BASE_API_URL}/Lookup/` : "/api/Lookup/";
export const Endpoints = {
    login: `${authModuleUrl}login`,
    users: {
        getAll: `${authModuleUrl}get-users`,
        createUser: `${authModuleUrl}register`,
        activateUser: `${authModuleUrl}activate-user`,
        lookup: {
            getGovs: `${lookUpModuleUrl}governate-all`,
            getCities: `${lookUpModuleUrl}cities-all`,
        }
    },
};
