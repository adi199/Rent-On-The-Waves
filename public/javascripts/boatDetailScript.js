$(document).ready(function(){
    console.log("HERE")
    console.log($('#disabledDates').text())
    let array = $('#disabledDates').text().split(',');
    $('#bookingDate').datepicker({
        'startDate' : new Date(),
        beforeShowDay: function(date){
            var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            return [ array.indexOf(string) == -1 ]
        }
    });
    $('#bookBoatButton').click(function(e){
        $('#bookingModal').modal('show');
    })
    $('#bookingForm').submit(function(e){
        let startTime = e.target.bookingStartTime.value;
        let date = e.target.bookingDate.value;
        let hours = e.target.bookingHours.value;
        console.log(startTime, date, hours);
        $.post( "http://localhost:3000/bookings/book", { boat : $('#meta').text(), start_time : startTime, date : date, hours : hours})
            .done(function( data ) {
                window.location.href = 'http://localhost:3000/bookings/';
            })
            .catch(function(err){
                console.log("Error occured while booking boat.\n", err);
            })
        e.preventDefault();
    })
})