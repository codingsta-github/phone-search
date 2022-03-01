// event listener 
document.getElementById('search-button').addEventListener('click',function(){
   searchPhone()
});


// event listener for enter button 
document.getElementById('search-field').addEventListener('keydown',function(e){
   if (e.keyCode==13) {
      searchPhone()
   }
});


// error function : invalid data input
const toggleTypeError=displayStyle =>{
document.getElementById('type-error').style.display=displayStyle;
}

//error function : data not found
const toggleDataError=displayStyle =>{
document.getElementById('data-error').style.display=displayStyle;
}

//spinner fuction
const toggleSpinner=displayStyle =>{
   document.getElementById('spinner').style.display=displayStyle;
   }

// result function 
const toggleDisplay=displayStyle=>{
   document.getElementById('search-result').style.display=displayStyle;
}



// fetching phone data 
const searchPhone=()=>{

   const searchField = document.getElementById('search-field');
   const searchText = searchField.value;
   searchField.value ='';

   //error return for empty and number input 
   if (searchText==''||!isNaN(searchText)) {
      toggleTypeError('block')
      toggleDataError('none')
      toggleSpinner('none')   
      toggleDisplay('none')
   } else {
      toggleTypeError('none')
      toggleDataError('none') 
      toggleDisplay('none')   
      toggleSpinner('block')  

   fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res=>res.json())
        .then(phoneData=>displayPhone(phoneData.data))
   
}
}



//displaying loaded data
const displayPhone=data=>{
    const phones=data;
    const searchResult=document.getElementById('search-result');
    searchResult.textContent='';

    //empty data 
    if (phones.length == 0) {
      toggleTypeError('none')
      toggleDataError('block')
      toggleSpinner('none')   
      toggleDisplay('none')
   }
                                  
   for (const phone of phones) {
      const div=document.createElement('div');
      div.innerHTML=` 
      <div class="col">
         <div class="card align-items-center">

            <img src="${phone.image}" class="card-img-top px-5 pt-5 pb-2" alt="...">
            
            <div class="card-body text-center">
               <h5 class="card-title" id="title">${phone.phone_name}</h5>
               <h6 class="card-title" id="title">Brand: ${phone.brand}</h6>
               <p class="card-title" id="title">Model: ${phone.slug}</p>
               <button onclick="details('${phone.slug}')" type="button" style="border:0;padding: 5px 20px;color:white ;background-color: #db3860; border-radius: 20px;" data-bs-toggle="modal" data-bs-target="#exampleModal"> details </button>
            </div>
         </div>
      `
   searchResult.appendChild(div);
   toggleDisplay('grid') 
   toggleSpinner('none')  
   }
}


//fetching details data 
const details=slug=>{
   fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
   .then(res=>res.json())
   .then(details=>phoneDetails(details.data))
}

const phoneDetails=data=>{
   const thumb=document.getElementById('thumb');
   thumb.setAttribute('src',data.image)
   const title=document.getElementById('exampleModalLabel');
      title.innerText=data.name; //modal title
     
   const release=document.getElementById('release-date');
     if (data.releaseDate=="") {
      release.innerText=data.releaseDate;
     } else {
      release.innerText='Sorry! release date not available';
     }
   

   const modalDiv=document.getElementById('modal')
      modalDiv.textContent=''; //for removing previous details on modal

   const mainFeature=document.createElement('div');
      mainFeature.innerHTML=`

         <p> <span class="fw-bold">Storage: </span>${data.mainFeatures.storage}</p>
         <p> <span class="fw-bold">Display size: </span>${data.mainFeatures.displaySize}</p>
         <p> <span class="fw-bold">ChipSet: </span>${data.mainFeatures.chipSet}</p>
         <p> <span class="fw-bold">Memory: </span>${data.mainFeatures.memory}</p>
         
         <p> 
         <span class="fw-bold">Sensors: </span>
               <ul id="sensor-list">
               </ul>
         </p>
         
 `
   modalDiv.appendChild(mainFeature);


  
   
   //sensors
   const sensors = data.mainFeatures.sensors;
   const sensorsData=()=>{
      for (const sensor of sensors) {
         const li=document.createElement('li');
         li.innerText= `${sensor}`
         
      document.getElementById('sensor-list').appendChild(li);
      }
}
   sensorsData()  
   
   if (data.others!= undefined) {
      
   
   const other=document.createElement('div');
   other.innerHTML=`

      <p> <span class="fw-bold">WLAN: </span>${data.others.WLAN}</p>
      <p> <span class="fw-bold">Bluetooth: </span>${data.others.Bluetooth}</p>
      <p> <span class="fw-bold">GPS: </span>${data.others.GPS}</p>
      <p> <span class="fw-bold">NFC: </span>${data.others.NFC}</p>
      <p> <span class="fw-bold">Radio: </span>${data.others.Radio}</p>
      <p> <span class="fw-bold">USB: </span>${data.others.USB}</p>
         
 `
 modalDiv.appendChild(other);
   }
   
}


