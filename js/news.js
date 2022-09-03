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
  <a onclick="loadfullnews('${portal.category_id}')" class="nav-link " href="#"> ${portal.category_name}</a>
</nav>
    `;
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
        <img class="w-25 h-25 rounded-circle " src="${
          allNews.author.img
        }" alt="">
        <p>${allNews.author.name ? allNews.author.name : "noname"}</p>
        <p>${allNews.author.published_date}</p>
        </div>

      </div>
      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loaddetails('${
        allNews._id
      }')" class="btn btn-dark">Details<i class=" m-1 fa-solid fa-circle-right"></i></button>
    </div>
    `;
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
  postdetails.innerText = details.title;
  const detailsSection = document.getElementById("details-section");
  detailsSection.innerHTML = `
  <img src="${details.thumbnail_url}" alt="">
  <p>${details.details}</p>
  <img class="w-25 h-25  " src="${details.author.img}" alt="">
  `;
};

// details-section

loadCatagory();
loadfullnews("01");