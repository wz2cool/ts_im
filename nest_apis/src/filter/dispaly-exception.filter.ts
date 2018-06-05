import { Catch, ExceptionFilter, HttpException, ArgumentsHost } from '@nestjs/common';
import { DisplayException } from '../model/exception';

@Catch(DisplayException)
export class DisplayExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.error(exception);
        const status = 500;
        const message = exception.message || '内部错误';
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        return response.status(status).json(message);
    }
}