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

})