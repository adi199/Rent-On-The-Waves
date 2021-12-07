$(document).ready(function(){
    let form = {
        title : 'string',
        detail : 'longString',
        location : 'string',
        no_of_passengers : 'number',
        base_rate : 'string',
        max_hours_available : 'number',
        captain_available : ['Yes', 'No'],
        year : 'string',
        make : 'string',
        capacity : 'number',
        boat_type : 'string',
        model : 'string',
        length : 'number',
        features : 'array',
        allowed_on_boat : 'array',
        cancellation_policy : 'array',
        security_deposit : 'longString',
        captain_info : 'longString',
        image : 'file'
    }

    $('#updateBoatForm').submit(function(e){
        let keys = Object.keys(form);
        let data = new FormData();
        for(var key of keys){
            if(key === 'image'){
                data.append(key.toLowerCase(), $(`#${key}`)[0].files[0]);
                continue;
            }
            console.log(key.toLowerCase(), $(`#${key}`).val());
            data.append(key.toLowerCase(), $(`#${key}`).val());
        }
        try{
            $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: `/boats/${$('#metaPara').text()}/update`,
            processData : false,
            contentType : false,
            data: data,
            success: function (data) {
                window.location.href = "http://localhost:3000/boats/admin";
            },
            error: function (e) {
                console.log("Error occurred.\n", e);
            }
            });
        }catch(e){
            console.log(e);
        }
        e.preventDefault()
    })
});
