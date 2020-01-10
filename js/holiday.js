function populateHolidays(month) {
  Swal.enableLoading()
  $.ajax({
    url: 'http://localhost:3000/holiday',
    methods: 'get'
  })
    .done(result => {
      const holidays = result.response.holidays
      const filteredHolidays = holidays.filter(item => {
        return item.date.datetime.month === month
      })
      $('.holiday-list').empty()
      filteredHolidays.forEach(holiday => {
        $('.holiday-list').append(`
          <div class="holiday-item">
              <div class="left-item">
                  <div class="holiday-day">${holiday.date.datetime.day}</div>
              </div>
              <div class="right-item">
                  <div class="holiday-name"><h4>${holiday.name}</h4></div>
                  <div class="holiday-description">
                  <em>${holiday.description || 'There is no description yet'}</em>
                  </div>
              </div>
          </div>
        `)
      });
    })
    .fail(err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    })
    .always(function() {
      Swal.disableLoading()
      Swal.fire({
        icon: 'success',
        title: 'Success...',
        text: 'Holidays Loaded'
      })
    })
}
