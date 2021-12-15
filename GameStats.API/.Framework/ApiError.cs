namespace GameStats.API.Framework
{
    /// <summary>
    /// All exceptions that bubble up to api client are transformed to this type.
    /// The messages should be formatted in a friendly way as api client will potentially show them.
    /// </summary>
    public class ApiError
    {
        /// <summary>Initializes a new instance of the <see cref="ApiError"/> class.</summary>
        public ApiError()
        {
        }

        /// <summary>Initializes a new instance of the <see cref="ApiError"/> class.</summary>
        /// <param name="message">The message.</param>
        /// <param name="detail">Detail about the error.</param>
        public ApiError(string message, string detail = null)
        {
            Message = message;
            Detail = detail;
            IsError = true;
        }
        /// <summary>Gets or sets the details.</summary>
        /// <value>The details.</value>
        public string Detail { get; set; }

        /// <summary>Gets or sets a value indicating whether this instance is error.</summary>
        /// <value><c>true</c> if this instance is error; otherwise, <c>false</c>.</value>
        public bool IsError { get; set; }

        /// <summary>Gets or sets the exception message.</summary>
        /// <value>The exception message.</value>
        public string Message { get; set; }
    }
}
