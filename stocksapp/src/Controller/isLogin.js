function a() {
    var c = false;
    const b = window.localStorage.getItem('token');
    if (b == 1) {
        c = true;
    } else {
        c = false;
    }

return c;
}

export default a;