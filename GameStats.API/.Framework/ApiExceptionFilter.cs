using System.Diagnostics;
using System.Net;
using GameStats.Common.Framework;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace GameStats.API.Framework
{
    public class ApiExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ApiExceptionFilter> _logger;

        /// <summary>Constructs a new instance of the <see cref="ApiExceptionFilter"/> class.</summary>
        /// <param name="logger"></param>
        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Catches uncaught exceptions and returns 500 with exception object.
        /// </summary>
        /// <param name="context"></param>
        public override void OnException(ExceptionContext context)
        {
            ApiError apiError;
            if (context.Exception is ApiException exception)
            {
                context.Exception = null!;
                // Create friendly error for client
                apiError = new ApiError(exception.Message);

                context.HttpContext.Response.StatusCode = (int)exception.StatusCode;
            }
            else
            {
                // Unhandled errors
                _logger.LogError(new EventId(0), context.Exception, $"ApiExceptionFilter - unhandled exception: {context.Exception.Message}");

                var debugging = Debugger.IsAttached;
                var message = debugging ? context.Exception.GetBaseException().Message : "Oops, something went wrong.";
                var stack = debugging ? context.Exception.StackTrace : null;

                if (debugging)
                {
                    Debugger.Break();
                }

                apiError = new ApiError(message, stack);
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }

            var result = new JsonResult(apiError);

            context.Result = result;
            base.OnException(context);
        }
    }
}
