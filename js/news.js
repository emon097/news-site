const loadCatagory = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => desplaycatagory(data.data.news_category));
};

const desplaycatagory = (news) => {
  const catagoryoption = document.getElementById("catagory");
  for (const portal of news) {
    // console.log(portal);

    const creatediv = document.createElement("ul");
    creatediv.classList.add("jusitify");

    creatediv.innerHTML = `
    
  <a onclick="loadfullnews('${portal.category_id}')" class="nav-link " href="#"> ${portal.category_name}  </a>

    `;

    // toggleSpinner(true);
    catagoryoption.appendChild(creatediv);
  }
};

const loadfullnews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => desplayfullnews(data.data));
};

const desplayfullnews = (news) => {
  const CatagoryInfo = document.getElementById("catagory-info");
  CatagoryInfo.innerText = "";
  // desplay-notfound

  for (const allNews of news) {
    const creatediv = document.createElement("div");
    creatediv.classList.add("col");
    creatediv.innerHTML = `
    <div class="card">
      <img src="${allNews.thumbnail_url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${allNews.title.slice(0, 30) + "..."}</h5>
        <p class="card-text">${allNews.details.slice(0, 70) + "..."}</p>
        <div class= "d-flex" >
        <img class="w-25 h-25 p-1 rounded-circle " src="${
          allNews.author.img
        }" alt="">
        <p class="p-1 " >${
          allNews.author.name ? allNews.author.name : "no-name"
        }</p>
        <p>${allNews.author.published_date}</p>
        </div>
        <div class="d-flex" >
        <i class="fa-solid fa-users-viewfinder m-1 "></i>
        ${allNews.total_view}
        <div class="ms-3"  >
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        
        </div>
        </div>
      </div>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loaddetails('${
        allNews._id
      }')" class="btn btn-dark">Details<i class=" m-1 fa-solid fa-circle-right"></i></button>
    </div>
    `;
    // toggleSpinner(false);
    CatagoryInfo.appendChild(creatediv);
  }
};

// details-section
const loaddetails = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => desplaydetails(data.data[0]));
};

const desplaydetails = (details) => {
  const postdetails = document.getElementById("modaltitle");

  const detailsSection = document.getElementById("details-section");
  detailsSection.innerHTML = `
  <img class="w-full" src="${details.thumbnail_url}" alt="">
  <h5>${details.title}</h5>
  <p>${details.details}</p>
  <div class="d-flex align-items-start" >
  <img class="w-25 h-25 p-4  rounded-circle " src="${
    details.author.img
  }" alt="">
  <p class="p-1 mt-4 p-1" >${
    details.author.name ? details.author.name : "no-name"
  }
  
  </p>
  <p class="mt-4 ms-2 p-1 " > <span class="text-success    ">Date:</span> ${
    details.author.published_date
  }</p>
  

  </div>
  <div class=" mt-4  " >
  <i class="fa-solid fa-users-viewfinder m-1 "></i>
  ${details.total_view}
  <div class="ms-3"  >
  
  </div>
  </div>
  

  
  `;
};

// details-section
// spninner section
const toggleSpinner = (isloading) => {
  const loading = document.getElementById("spinner");
  if (isloading) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
};
// spninner section

// not-fund-section

// not-fund-section

loadCatagory();
loadfullnews("01");
