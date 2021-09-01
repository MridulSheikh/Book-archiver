const searchBook = () =>{
    const input = document.getElementById('input');
    const inputValue = input.value;
    input.value = "";
    if(inputValue === ''){
      const searchResult = document.getElementById('productDisplay');
      searchResult.textContent="";
      const div = document.createElement('div');
      div.innerHTML=`
     <h5 class= "text-center text-danger mt-5"> please a Enter name  </h5>
      `
      searchResult.appendChild(div);
    }
    else{
        const url =`http://openlibrary.org/search.json?q=${inputValue}`;
         fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs));
    } 
}
//display search result function
const displayResult = books =>{
  console.log(books)
  const searchResult = document.getElementById('productDisplay');
  searchResult.textContent="";
       books.forEach(book => {
       const div = document.createElement('div');
       div.innerHTML=`
       <div class="cols-12">
       <div class="card mb-3 m-auto" style="max-width: 540px;">
           <div class="row g-0">
             <div class="col-md-4">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">${book.title}</h5>
                 <p class="card-text">by <span class="text-primary fw-bold ">${book.author_name[0]}</span> | publishe year: ${book.publish_year}</p>
                 <p class="card-text"><span class="text-danger">first publish year:</span> ${book.first_publish_year}</p>
               </div>
             </div>
           </div>
         </div>
   </div>
       `
       searchResult.appendChild(div);
   });
}