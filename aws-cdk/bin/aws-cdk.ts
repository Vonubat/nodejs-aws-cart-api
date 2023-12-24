#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi, Cors } from 'aws-cdk-lib/aws-apigateway';
import { Runtime, Code, Function } from 'aws-cdk-lib/aws-lambda';
import { AwsCdkStack } from '../lib/aws-cdk-stack';
import { resolve } from 'path';
import 'dotenv/config';

import { HttpMethod, region } from '../src/constants';

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
});

const cartApiIntegration = new LambdaIntegration(cartApiLambda, {
  proxy: true,
});

api.root.addProxy({
  defaultIntegration: cartApiIntegration,
});
api.root.addMethod(HttpMethod.GET, cartApiIntegration);
