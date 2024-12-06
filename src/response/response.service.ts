import {Action, ActionMetadata, BadRequestError, Interceptor, InterceptorInterface} from "routing-controllers";

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface{

    intercept(action: Action, response: any) {
        if (response instanceof BadRequestError || response instanceof Error) {
            return {
                status: 'error',
                message: response.message,
            };
        }

        return {
            status: 'success',
            result: response,
        };
    }
}