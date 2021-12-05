$(document).ready(function(){
    $('#bookingDate').datepicker({
        'startDate' : new Date()
    });
    $('#bookBoatButton').click(function(e){
        $('#bookingModal').modal('show');
    })
    $('#bookingForm').submit(function(e){
        let startTime = e.target.bookingStartTime.value;
        let date = e.target.bookingDate.value;
        $.post( "http://localhost:3000/boats/book", { boat : $('#meta').text(), start_time : startTime, date : date})
            .done(function( data ) {
                window.location.href = 'http://localhost:3000/';
            })
            .catch(function(e){
                console.log("Error occured while booking boat.\n", err);
            })
        e.preventDefault();
    })
})