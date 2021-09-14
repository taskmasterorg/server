const errorMessage5XX: string = 'A server error has occured. ' +
                                'Apologies for the incovenience. ' + 
                                'It will be fixed soon.';

const errorMessage400: string = 'There is an issue with the URL parameter(s) ' +
                                'and/or key-value pairs passed in the body of the request.' +
                                'Please read the API docs to know the exact format of the request.'                       

const errorMessage404: string = 'Resource not found.';                                

export {
    errorMessage5XX,
    errorMessage400,
    errorMessage404
}
