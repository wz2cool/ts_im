import { Catch, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { DisplayException } from '../model/exception';

@Catch(DisplayException)
export class DisplayExceptionFilter implements ExceptionFilter {
    catch(exception: any, response: any) {
        const status = 500;
        const message = exception.message || '内部错误';

        return response.status(status).json(message);
    }
}