declare const process: {
  env: {
    API_HOST: string;
  };
};

export const API_HOST = process.env.API_HOST;
