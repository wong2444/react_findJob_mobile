export function getRedirectTo(type, avatar){
    let path = ''
    if (type === 'boss') {
        path = 'boss'
    } else {
        path = 'employee'
    }
    if (!avatar) {
        path += 'info'
    }
    return path
}
