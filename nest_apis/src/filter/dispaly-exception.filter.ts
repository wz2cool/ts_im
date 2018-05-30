import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { DisplayException } from '../model/exception';

@Catch(DisplayException)
export class DisplayExceptionFilter implements ExceptionFilter {
    catch(exception: any, response: any) {
        console.error(exception);
        const status = 500;
        const message = exception.message || '内部错误';
        return response.status(status).json(message);
    }
}