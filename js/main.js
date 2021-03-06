$(document).ready(function () {

    $(".alert-warning").hide();

    if (localStorage.getItem('token')) {
        $('#gsignin').fadeOut()
        $('main').fadeIn()
    }
    let pickedDate = ''

    $('#month-picker').on('change', function () {
        const month = Number($(this).val())
        populateHolidays(month)
    })

    $(document).on('click', '.holiday-item', function () {
        $('.picked').empty()

        pickedDate = $(this).find('.holiday-day').html()
        pickedName = $(this).find('.holiday-name').html()
        pickedDesc = $(this).find('.holiday-description').html()

        $('.holiday-picker').fadeOut('slow', function () {
            $('.picked').append(`
        <div class="holiday-item">
            <div class="left-item">
                <div class="holiday-day">${pickedDate}</div>
            </div>
            <div class="right-item">
                <div class="holiday-name"><h4>${pickedName}</h4></div>
                <div class="holiday-description">
                <em>${pickedDesc || 'There is no description yet'}</em>
                </div>
                <button id="change-date" class="btn btn-warning">Change</button>
            </div>
        </div>
      `)
            $('.picked').fadeIn()
        })
    })

    $(document).on('click', '#change-date', function () {
        $('.picked').fadeOut('slow', function () {
            $('.holiday-picker').fadeIn('slow', function () {
                $('.picked').hide()
            })
        })
    })

    $("#form-message").on("submit", (e) => {
        e.preventDefault();
        const to = $("#send-to").val();
        const message = $("#msg-body").val();

        $.post("http://localhost:3000/sms", {
                message,
                to
            },
            function(data, status) {
                $("#msg-content").append(`
            <div class="card mt-3">
                <div class="card-body p-1 pl-3">
                <p class="mb-0">${data.body}</p>
                </div>
            </div>
        `)
            })
    });
})

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.post('http://localhost:3000/gsignin', {
        id_token
    }, (response => {
        localStorage.setItem('token', response.token);
        $('#gsignin').fadeOut('slow', function () {
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