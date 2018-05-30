// import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/do';

// @Interceptor()
// export class LoggingInterceptor implements NestInterceptor {
//     intercept(
//         dataOrRequest,
//         context: ExecutionContext,
//         stream$: Observable<any>,
//     ): Observable<any> {
//         const prefix: string = `${context.parent.name}.${context.handler.name}`;
//         console.log(`[${new Date().toString()}] ${prefix} Before...`);
//         const logInfo: any = {};
//         logInfo.originalUrl = dataOrRequest.originalUrl;
//         logInfo.method = dataOrRequest.method;
//         logInfo.ip = dataOrRequest.ip;
//         logInfo.query = dataOrRequest.query;
//         logInfo.body = dataOrRequest.body;
//         console.log(JSON.stringify(logInfo));
//         const now = Date.now();
//         return stream$.do(() => console.log(`[${new Date().toString()}] ${prefix} After... ${Date.now() - now}ms`));
//     }
// }
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IncomingMessage } from 'http';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        call$: Observable<any>,
    ): Observable<any> {
        const prefix: string = `${context.getClass().name}.${context.getHandler().name}`;
        console.log(`[${new Date().toString()}] ${prefix} Before...`);
        const incomingMessage: any = context.getArgs()[0];
        const logInfo: any = {};
        logInfo.originalUrl = incomingMessage.originalUrl;
        logInfo.method = incomingMessage.method;
        logInfo.ip = incomingMessage.ip;
        logInfo.query = incomingMessage.query;
        logInfo.body = incomingMessage.body;
        console.log(JSON.stringify(logInfo));

        const now = Date.now();
        return call$.pipe(tap(() => console.log(`[${new Date().toString()}] ${prefix} After... ${Date.now() - now}ms`)));
    }
}
