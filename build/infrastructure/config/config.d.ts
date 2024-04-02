declare const _default: {
    api: {
        port: number;
        environment: string;
        publicApiSecretJwt: string;
        domainName: string;
        defaultPageSize: number;
        maxPageSize: number;
        defaultPage: number;
        logger: string;
    };
    security: {
        jwtSecret: string;
    };
    database: {
        postgresPassword: string;
        postgresUser: string;
        postgresDb: string;
        postgresHost: string;
    };
};
export default _default;
