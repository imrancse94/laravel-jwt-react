export const getMainEndpoint = (endpoint) => {
    var arr = endpoint.split('/');
    return "/"+arr[1];
}



