import { ApiForbiddenResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

const DocSchema = ({ status, message }: { status: number; message: string }) => ({
  status,
  schema: {
    example: {
      statusCode: status,
      message,
    },
  },
});

export const ApiResponseInternalServerError = (message = 'Internal server error') => {
  return ApiResponse(DocSchema({ status: 500, message }));
};

export const ApiResponseUnauthorized = (message = 'Unauthorized') => {
  return ApiUnauthorizedResponse(DocSchema({ status: 401, message }));
};

export const ApiResponseForbidden = (message = 'Forbidden') => {
  return ApiForbiddenResponse(DocSchema({ status: 403, message }));
};
