$(document).ready(function () {
    $(".alert-warning").hide();
});

$("#searching-film-form").submit(function (event) {
    $(".alert-warning").hide();
    $.get(`http://localhost:3000/omdbs/${$("#search-input-text").val()}`,
        function (data, status) {
            if (status === "success") {
                if (data.Response === 'True') {
                    listFilm(data.Search)
                } else {
                    $('#result').empty();
                    $("#message-content").text(data.Error);
                    $(".alert-warning").show();
                }
            }
        });
    event.preventDefault();
});

function listFilm(films) {
    $('#result').empty();
    let imdbRating = 0;

    for (let i = 0; i < films.length; i++) {
        $.get(`http://localhost:3000/omdbs/details/${films[i].Title}`,
            function (data, status) {
                if (status === "success") {
                    if (data.Response === 'True') {
                        imdbRating = data.imdbRating

                        $('#result').append(
                            "<div class='card card-film' style='width: 18rem;'> " +
                            "<img class='card-img-top film-img' src=" + films[i].Poster + " alt='Card image cap'> " +
                            "<div class='card-body'> " +
                            "<p class='card-title film-title'>" + films[i].Title + "</p> " +
                            "<p class='card-text'> <i class='fas fa-star'></i> " +
                            imdbRating + " / " + films[i].Year + "</p> " +
                            "</div>"
                        );
                    }
                }
            });
    }
}
