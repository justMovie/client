$(document).ready(function() {
  if (localStorage.getItem('token')) {
    $('#gsignin').fadeOut()
    $('main').fadeIn()
  }
  let pickedDate = ''

  $('#month-picker').on('change', function() {
    const month = Number($(this).val())
    populateHolidays(month)
  })

  $(document).on('click', '.holiday-item', function() {
    $('.picked').empty()

    pickedDate = $(this).find('.holiday-day').html()
    pickedName = $(this).find('.holiday-name').html()
    pickedDesc = $(this).find('.holiday-description').html()

    $('.holiday-picker').fadeOut('slow', function() {
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

  $(document).on('click', '#change-date', function() { 
    $('.picked').fadeOut('slow', function() {
      $('.holiday-picker').fadeIn('slow', function() {
        $('.picked').hide()
      })
    })
  })
})
