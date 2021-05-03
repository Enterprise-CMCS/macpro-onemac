const getCurrentRoute = path => {
    let route = path.split("/")[1];
    return (typeof route == 'undefined')
        ? ''
        : route.split('#')[0].toUpperCase();
}
export { getCurrentRoute };