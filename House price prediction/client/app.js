function estimatePrice(){


    var total_sqft=document.getElementById('total_sqft').value
    var bhk=document.getElementById('bhk').value
    var bath=document.getElementById('bath').value
    var location=document.getElementById('location-dropdown').value
    var estprice=document.getElementById('price')



    var url='http://127.0.0.1:5000/predict_home_price'
    // var url="/api/predict_home_price";
    $.post(url, {
        total_sqft: parseFloat(total_sqft),
        bhk:bhk,
        bath:bath,
        location: location

    },function(data,status){
        console.log(data.estimated_price)
        estprice.innerHTML="<b>House Price: " + data.estimated_price.toString() + "Lakh<b>"
        document.getElementById('area').innerHTML='Total Area: '+total_sqft+""
        document.getElementById('location').innerHTML='Location: '+location+""
        document.getElementById('bathrooms').innerHTML='Bathrooms: '+bath+""
        document.getElementById('bedHK').innerHTML='BHK '+bhk+""
        
        console.log(status)
    });


}



function onPageLoad(){


    console.log('Loaded')

    var url='http://127.0.0.1:5000/get_location_names'
    // var url ="/api/get_location_names"

    $.get(url,function(data, status){

        if(data){

            var locations=data.locations
            console.log(locations)
            var location_dropdown=document.getElementById('dropdown')

            for(var i in locations){
                var opt=new Option(locations[i])
                $('#location-dropdown').append(opt)
            }   
            
        }

    })

}



window.onload=onPageLoad