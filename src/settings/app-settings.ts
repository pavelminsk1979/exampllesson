import { config } from 'dotenv';
config();

export type EnvironmentVariable = {
  [key: string]: string | undefined;
};
export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'TESTING';
export const Environments = ['DEVELOPMENT', 'STAGING', 'PRODUCTION', 'TESTING'];

export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}

  getEnv() {
    return this.env;
  }

  isProduction() {
    return this.env === 'PRODUCTION';
  }

  isStaging() {
    return this.env === 'STAGING';
  }

  isDevelopment() {
    return this.env === 'DEVELOPMENT';
  }

  isTesting() {
    return this.env === 'TESTING';
  }
}

class AppSettings {
  constructor(public env: EnvironmentSettings, public api: APISettings) {}
}

class APISettings {
  // Application
  public readonly APP_PORT: number;

  // Urls & CORS
  public readonly PUBLIC_FRONT_URL: string;

  // Database
  public readonly POSTGRES_USER: string;
  public readonly POSTGRES_PASSWORD: string;
  public readonly POSTGRES_HOST: string;
  public readonly POSTGRES_PORT: number;
  public readonly POSTGRES_DATABASE: string;

  constructor(private readonly envVariables: EnvironmentVariable) {
    // Application
    this.APP_PORT = this.getNumberOrDefault(this.envVariables.APP_PORT, 9876);

    // Urls & CORS
    this.PUBLIC_FRONT_URL =
      this.envVariables.PUBLIC_FRONT_URL ??
      'https://samesite.staging.samesite.com';

    // Database
    this.POSTGRES_USER = this.envVariables.POSTGRES_USER ?? 'postgres';
    this.POSTGRES_PASSWORD =
      this.envVariables.POSTGRES_PASSWORD ?? 'mysecretpassword';
    this.POSTGRES_HOST = this.envVariables.POSTGRES_HOST ?? 'localhost';
    this.POSTGRES_PORT = this.getNumberOrDefault(
      this.envVariables.POSTGRES_PORT,
      5433,
    );
    this.POSTGRES_DATABASE = this.envVariables.POSTGRES_DATABASE ?? 'postgres';
  }

  private getNumberOrDefault(value: string, defaultValue: number): number {
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      return defaultValue;
    }

    return parsedValue;
  }
}

const env = new EnvironmentSettings(
  (Environments.includes(process.env.ENV)
    ? process.env.ENV
    : 'DEVELOPMENT') as EnvironmentsTypes,
);

const api = new APISettings(process.env);
export const appSettings = new AppSettings(env, api);
