class ResponseTrait {
    /**
     * Generate success type response.
     *
     * Returns the success data and message.
     *
     * @param {Object} res - The response object 
     * @param {Object} data - The data to return
     * @param {string} message - The success message
     * @param {number} status_code - The HTTP status code
     * @returns {Object} The JSON response
     */
    responseSuccess(res, data, message = "Successful", status_code = 200) {
        return res.status(status_code).json({
            status: true,
            message: message,
            errors: null,
            data: data,
        });
    }

    /**
     * Generate Error response.
     *
     * Returns the errors data.
     *
     * @param {Object} res - The response object
     * @param {Object} errors - The errors to return
     * @param {string} message - The error message
     * @param {number} status_code - The HTTP status code
     * @returns {Object} The JSON response
     */
    responseError(res, errors, message, status_code = 400) {
        
        message = message || 'Data is invalid';
        
        return res.status(status_code).json({
            status: false,
            message: message,
            errors: errors,
            data: null,
        });
    }
}


module.exports = ResponseTrait;