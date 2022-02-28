document.getElementById('search-button').addEventListener('click',function(){
   searchPhone()
})
document.getElementById('search-field').addEventListener('keydown',function(e){
   if (e.keyCode==13) {
      searchPhone()
   }
})
const toggleSpinner=displayStyle =>{
document.getElementById('spinner').style.display=displayStyle;
}
const toggleTypeError=displayStyle =>{
document.getElementById('type-error').style.display=displayStyle;
}
const toggleDataError=displayStyle =>{
document.getElementById('data-error').style.display=displayStyle;
}
const toggleDisplay=displayStyle=>{
   document.getElementById('search-result').style.display=displayStyle;
}
const searchPhone=()=>{
   const searchField= document.getElementById('search-field');
   const searchText=searchField.value;
   searchField.value='';
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

const displayPhone=data=>{
    const phones=data;
    const searchResult=document.getElementById('search-result')
    searchResult.textContent='';
    if (phones == null) {
      toggleTypeError('none')
      toggleDataError('block')
      toggleSpinner('none')   
      toggleDisplay('none')
   }
                                  
for (const phone of phones) {
   const div=document.createElement('div')
   div.innerHTML=` <div class="col">
   <div class="card">
     <img src="${phone.image}" class="card-img-top px-5" alt="...">
     <div class="card-body">
       <h5 class="card-title" id="title">${phone.phone_name}</h5>
       <p class="card-title" id="title">Brand: ${phone.brand}</p>
       <p class="card-title" id="title">Model: ${phone.slug}</p>
       <button onclick="details('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
       Launch </button>
   </div>
 </div>`
 searchResult.appendChild(div)
 toggleDisplay('grid') 
 toggleSpinner('none')  
}
}
}

const details=slug=>{
   fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
   .then(res=>res.json())
   .then(details=>phoneDetails(details.data.mainFeatures))
}

const phoneDetails=data=>{
   console.log(data)
   const modalDiv=document.getElementById('modal')
   const detailsModal=document.createElement('div');
   detailsModal.innerHTML=`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
   <div class="modal-dialog">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         ...
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
         <button type="button" class="btn btn-primary">Save changes</button>
       </div>
     </div>
   </div>
 </div>
 `
   modalDiv.appendChild(detailsModal)
}