const loadPhone = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  // console.log(phones);
  //   step 1:
  const phonesContainer = document.getElementById("phone-container");
  // clear phone container cards before adding cards
  phonesContainer.textContent = "";

  // display show all button if there are more then 12 phones
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  // console.log("is show all", isShowAll);
  // Display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // console.log(phones.length);

  phones.forEach((phone) => {
    // console.log(phone);
    // step 2: create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-zinc-50 shadow-xl`;
    // step 3: set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    // step 4: appendChild
    phonesContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
};

//
const handleShowDetail = async (id) => {
  // console.log("clicked show details", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <p></p>
    <p><span>storage: </span>${phone?.mainFeatures?.storage}</p>
    <ul>
    <h2></h2>
    <p><span>GPS: </span>${phone?.others?.GPS}</p>
    <p><span>Bluetooth: </span>${phone?.others?.Bluetooth}</p>
    <p><span>NFC: </span>${phone?.others?.NFC}</p>
    <p><span>Radio: </span>${phone?.others?.Radio}</p>
    <p><span>USB: </span>${phone?.others?.USB}</p>
    <p><span>WLAN: </span>${phone?.others?.WLAN}</p>
    </ul>
  `;

  // show the modal
  show_details_modal.showModal();
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// handle search button recap
const searchHandle = () => {
  toggleLoadingSpinner(true);
  const fieldSearch = document.getElementById("field-search");
  const searchText = fieldSearch.value;
  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
// handle show all
const handleShowAll = () => {
  handleSearch(true);
};
loadPhone();
