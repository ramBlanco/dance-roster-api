export declare const envToLogger: {
    development: boolean;
    production: boolean;
    test: boolean;
};
export type ENVIRONMENTS = keyof typeof envToLogger;
