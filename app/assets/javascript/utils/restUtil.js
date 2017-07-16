export function fetch (url, successHandler, errorHandler) {
    $.ajax({
        type: 'GET',
        url: url,
        async: true,
        cache: false,
        success (result) {
            successHandler(result);
        },
        error (error) {
            errorHandler(error.responseJSON)
        }
    });
};
