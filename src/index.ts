type ErrorBuilder = (response: Response) => Error
type OnError = ErrorBuilder | string | Error | ((response: Response) => Promise<Error>)
type ResponseValidator = (response: Response) => boolean

async function reject(onError: OnError, response: Response): Promise<any> {
	let error: Error | string
	if (typeof onError === 'function') {
		error = await onError(response)
	} else {
		// onError is static, so log the error response and throw it away
		console.error(`Response error = ${await response.text()}, status=${response.status}: ${response.statusText}`)
		error = onError
	}
	if (error instanceof Error) {
		return Promise.reject(error)
	} else {
		return Promise.reject(new Error(error))
	}
}

function defaultResponseValidator(response: Response): boolean {
    return response.ok
}

function defaultErrorBuilder(errorMessage: string = 'Response status'): ErrorBuilder {
	return (response) => new Error(`${errorMessage}: ${response.status} ${response.statusText}`)
}

export function validateResponse(onError: OnError = defaultErrorBuilder(), responseValidator: ResponseValidator = defaultResponseValidator): (response: Response) => Promise<any> {
	return async (response: Response) => {
		if (!responseValidator(response)) {
			return reject(onError, response)
		} else {
			return Promise.resolve(response)
		}
	}
}



/**
 * Build error and log response possibly sensitive data and don't put them to the error
 * @param messagePrefix
 */
export function handleErrorWithLogging(messagePrefix: string) {
    return async (response: Response) => {
        const errorMessage = `${messagePrefix}: ${response.status}`
        console.error(`${errorMessage} ${await response.text()}`)
        return new Error(errorMessage)
    }
}

export function getSuccessJson(onError: OnError = defaultErrorBuilder(), responseValidator: ResponseValidator = defaultResponseValidator) {
	return (response: Response) => validateResponse(onError, responseValidator)(response)
		.then(r => r.json())
}

export function getSuccessText(onError: OnError = defaultErrorBuilder(), responseValidator: ResponseValidator = defaultResponseValidator) {
	return (response: Response) => validateResponse(onError, responseValidator)(response)
		.then(r => r.text())
}
