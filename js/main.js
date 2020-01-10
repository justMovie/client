function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.post('http://localhost:3000/gsignin', {
        id_token
    }, (response => {
        localStorage.setItem('token', response.token);
        $('#gsignin').fadeOut('slow', function() {
            $('main').fadeIn();
        });
    }));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.clear();
    });
}
