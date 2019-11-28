import { ConfigModule } from '@nestify/config';
import { IConfigService } from '@nestify/core';
import { EventBusModule } from '@nestify/event-bus';
import { LoggerModule } from '@nestify/logger';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventEmitter } from 'events';
import * as path from 'path';
import { CONFIG_SERVICE } from './constants';
import { CoreModule } from './core';
import { ConfigProvider, EventPublisherProvider, LoggerProvider } from './providers';

ConfigModule.initEnvironment(process.cwd() + '/src/env');
const event = new EventEmitter();

@Global()
@Module({
    imports: [
        ConfigModule.register(path.resolve(process.cwd(), 'dist/config', '**/!(*.d).js')),
        LoggerModule.registerAsync({
            useFactory: (config: IConfigService) => config.get('logger'),
            inject: [CONFIG_SERVICE]
        }),
        EventBusModule.register({ event }),
        MongooseModule.forRootAsync({
            useFactory: (config: IConfigService) => config.get('mongo.connection'),
            inject: [CONFIG_SERVICE]
        }),
        CoreModule
    ],
    providers: [ConfigProvider, LoggerProvider, EventPublisherProvider],
    exports: [ConfigProvider, LoggerProvider, EventPublisherProvider]
})
export class CommonModule { }
