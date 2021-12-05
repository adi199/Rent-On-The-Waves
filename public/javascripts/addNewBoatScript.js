let allowedOnBoat = ''

let getFeatures = () => {
    return ['Anchor', 'Bluetooth audio', 'Depth finder', 'Fish finder',
        'Fishing gear', 'Inflatable toys', 'Livewell / Baitwell', 'Rod holders'];
}
let getAllowedOnBoat = () => {
    return ['Alcohol', 'Fishing', 'Glass bottles', 'Kids under 12',
        'Liveaboard', 'Pets', 'Red wine', 'Shoes', 'Smoking', 'Swimming'];
}
let getCancellationPolicy = () => {
    return ['Free cancellations until 24 hours before the booking start date.',
        'Cancellations within 24 hours of the booking start date are non-refundable.'];
}

let getInputField = (id, placeholder, type) => {
    return `<div class="mb-3">
                <label class="form-label" for="${id}">${placeholder}</label>
                <input type="${type}" class="form-control" id="${id}" placeholder="${placeholder}">
            </div>`
}

let getButton = (id, name) => {
    return `<div class="row">
                <div class="col text-center">
                    <button type="submit" id="${id}" class="btn btn-primary btn-block mb-4">${name}</button>
                </div>
            </div>`
}

let getSelectField = (id, items) => {
    let options = [];
    items = items;
    for(var i=0;i<items.length;i++){
        options.push(`<option value="${items[i]}">${items[i]}</option>`)
    }
    return `<div class="row mb-3 ">
                <div class="col-4 align-self-center">
                    <label class="form-label" for="${id}">${id.split('_').join(" ")}</label>
                </div>
                <div class="col">
                    <select class="selectpicker" id="${id}" multiple="multiple">
                        ${options.join('\n')}
                    </select>
                </div>
            </div>`
}

let getTextAreaField = (id, placeholder) => {
    return `<div class="mb-3">
                <label class="form-label" for="${id}">${placeholder}</label>
                <textarea class="form-control" id="${id}" rows="5"></textarea>
            </div>`
}

let getFileInputField = (id) => {
    return `<div class="mb-3"
                <label class="form-label" for="${id}">Upload Boat Image</label>
                <input type="file" class="form-control" id="${id}" />
            </div>`
}

let form = {
    Title : 'string',
    Detail : 'longString',
    Location : 'string',
    No_of_passengers : 'number',
    Base_rate : 'string',
    Max_hours_available : 'number',
    Captain_available : ['Yes', 'No'],
    Year : 'string',
    Make : 'string',
    Capacity : 'number',
    Boat_type : 'string',
    Model : 'string',
    Length : 'number',
    Features : getFeatures(),
    Allowed_on_boat : getAllowedOnBoat(),
    Cancellation_policy : getCancellationPolicy(),
    Security_deposit : 'longString',
    Captain_info : 'longString',
    Image : 'file'
}

$(document).ready(function(){
    for(const [key, value] of Object.entries(form)){
        if(value === 'string'){
            $('#addNewBoatForm').append(getInputField(key, key.split('_').join(" "), 'string'));
            continue;
        }
        if(value === 'longString'){
            $('#addNewBoatForm').append(getTextAreaField(key, key.split('_').join(" "), 'string'));
            continue;
        }
        if(value === 'number'){
            $('#addNewBoatForm').append(getInputField(key, key.split('_').join(" "), 'number'));
            continue;
        }
        if(Array.isArray(value)){
            $('#addNewBoatForm').append(getSelectField(key, value));
            continue;
        }
        if(value === 'file'){
            $('#addNewBoatForm').append(getFileInputField(key));
        }
    }
    $('#addNewBoatForm').append(getButton('addNewBoatButton', 'Add'));

    $('#addNewBoatForm').submit(function(e){
        let keys = Object.keys(form);
        let data = new FormData();
        let specification = {};
        for(var key of keys){
            // if(key in ['Year', 'Make', 'Capacity', 'Boat_type', 'Model', 'Length']){
            //     specification[key.toLowerCase()] = $(`#${key}`).val();
            //     continue;
            // }
            if(key === 'Image'){
                data.append(key.toLowerCase(), $(`#${key}`)[0].files[0]);
                continue;
            }
            data.append(key.toLowerCase(), $(`#${key}`).val());
        }
        data.append('specification', specification);
        try{
            $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/boats/add",
            processData : false,
            contentType : false,
            data: data,
            success: function (data) {
                window.location.href = "http://localhost:3000/boats/";
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
