class ApiError extends Error
{
    constructor(
        statisCode,
        message = "Something went wrong",
        errors = [],
        stack = ''
    ){
        super(message)
        this.statisCode = statisCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack)
        {
            this.stack = stack
        }
        else
        {
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}