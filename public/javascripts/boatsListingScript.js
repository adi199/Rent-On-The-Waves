let getCard = (data) => {
    return `<div class="col">
                <div id="${data._id}" class="card h-100">
                    <img
                        src="/images/${data.image}"
                        class="card-img-top"
                        style="height : 12rem;"
                        alt="..."
                    />
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">
                            ${data.captain_available ? 'Captained' : 'No Captain'} <br>
                            Up to ${data.no_of_passengers} passengers <br>
                            ${data.location}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-primary viewBoatButton"> View </button>
                    </div>
                </div>
            </div>`
}
let getData = (filter, callback) => {
    $.ajax({
        url: "http://localhost:3000/boats/",
        type: "POST",
        data: filter,
        success: function(response) {
            callback(response);
        },
        error: function(xhr) {
            console.log(xhr);
        }});
}
let refreshListingPanel = (boats) => {
    $('#listingPanel').empty();
    boats.forEach(function(boat){
        $('#listingPanel').append(getCard(boat));
    });
}
$(document).ready(function(){

    //Search form on Submit event
    $('#searchForm').submit(function(e){
        let filter = {
            location : {$regex : $("input[id='searchInput']").val()},
            deleted : false
        }
        getData(filter, function(boats){
            refreshListingPanel(boats);
        });
        e.preventDefault();
    });

    //Filter Form on submit event
    $('#filterForm').submit(function(e){
        try{
            let filter = {
                captain_available : $("input[name='captainAvailableFilter']:checked").val(),
                no_of_passengers : { $lt : $('#numberOfPassengersFilter').val()},
                deleted : false
            }
            getData(filter, function(boats){
                refreshListingPanel(boats);
            });
        }catch(err){console.log(err)}
        e.preventDefault();
    });

    //View button click button
    $('.viewBoatButton').click(function(e){
        window.location.href = `http://localhost:3000/boats/${e.target.parentNode.parentNode.id}/detail`;
    });
});