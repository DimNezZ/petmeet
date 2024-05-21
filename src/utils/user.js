export function isAurhorized() {
    return localStorage.getItem('token') !== null
}
