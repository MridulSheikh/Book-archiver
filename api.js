const searchBook = () =>{
    const dispaly = document.getElementById("numberDisplay"); //display search result number
    dispaly.textContent='';
    const input = document.getElementById('input');
    const inputValue = input.value;
    input.value = "";
    if(inputValue === ''){
      const searchResult = document.getElementById('productDisplay');
      searchResult.textContent="";
      const div = document.createElement('div');
      div.innerHTML=`
     <h5 class= "text-center text-danger mt-5"> Please  Enter a name  </h5>
      `
      searchResult.appendChild(div);
    }
    else{
        const url =`https://openlibrary.org/search.json?q=${inputValue}`;
         fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.docs));
    } 
}
//display search result function
const displayResult = books =>{
  const searchResult = document.getElementById('productDisplay');
  searchResult.textContent="";
  if (books.length === 0){
    const searchResult = document.getElementById('productDisplay');
    searchResult.textContent="";
    const div = document.createElement('div');
    div.innerHTML=`
   <h5 class= "text-center text-danger mt-5">This search result not found</h5>
    `
    searchResult.appendChild(div);
  }
  else{
    const dispaly = document.getElementById("numberDisplay"); //display search result number
    const div = document.createElement('div');
    div.innerHTML =`
    <div class=" w-50 m-auto px-1 text-light">
    <p>result of search Books <span class="text-danger">(${books.length})</span></p>
   </div>
    `
    dispaly.appendChild(div);
    books.forEach(book => {
      let authors= book.author_name;
      let author = authors;
      let subs = book.subject;
      let sub = subs;
      if(book.author_name === undefined){
         author = 'No Author for free';
      }
      if(book.subject === undefined){
           sub = 'Nothing to say';
      }
      const div = document.createElement('div');
      div.innerHTML=`
      <div class="cols-12">
      <div class="card mb-3 m-auto" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start" alt="..." width='100%'>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">by <span class="text-primary fw-bold ">${author}</span> | first publish on ${book.first_publish_year}.</p>
                <p class="card-text">Publisher: <span class="text-danger">${book.publisher}</span></p>
                <p class="card-text"> <span>${sub}</span></p>
              </div>
            </div>
          </div>
        </div>
  </div>
      `
      searchResult.appendChild(div);
  });
  }
}