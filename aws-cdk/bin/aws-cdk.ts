#!/usr/bin/env node
import 'source-map-support/register';
import { App, Duration } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi, Cors } from 'aws-cdk-lib/aws-apigateway';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { AwsCdkStack } from '../lib/aws-cdk-stack';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { resolve } from 'path';
import 'dotenv/config';

import {
  HttpMethod,
  region,
  dbHost,
  dbName,
  dbPassword,
  dbPort,
  dbUser,
} from '../src/constants';

const app = new App();
const stack = new AwsCdkStack(app, 'CartApiStack', {
  env: { region },
});

const api = new RestApi(stack, 'CartApi', {
  restApiName: 'CartApi',
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowHeaders: Cors.DEFAULT_HEADERS,
    allowMethods: Cors.ALL_METHODS,
  },
});

const cartApiLambda = new Function(stack, 'CartApiLambda', {
  code: Code.fromAsset(resolve('dist')),
  runtime: Runtime.NODEJS_18_X,
  handler: 'main.handler',
  environment: {
    DB_HOST: dbHost,
    DB_NAME: dbName,
    DB_PORT: dbPort,
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
  },
  timeout: Duration.seconds(5),
});

const cartApiIntegration = new LambdaIntegration(cartApiLambda, {
  proxy: true,
});

api.root.addProxy({
  defaultIntegration: cartApiIntegration,
});
api.root.addMethod(HttpMethod.GET, cartApiIntegration);
