using System;
using System.Net;

namespace GameStats.Common.Framework
{
    public class ApiException : Exception
    {
        public ApiException(string message) : base(message)
        {
        }

        /// <summary>Gets or sets the status code. Default is InternalServerError.</summary>
        /// <value>The status code.</value>
        public HttpStatusCode StatusCode { get; set; } = HttpStatusCode.BadRequest;
    }
}
