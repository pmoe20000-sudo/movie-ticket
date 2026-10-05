const movies = [
  { id: 1, title: "Avater:The Way of Water", poster: "avarter.jpg",
    showDate: "12 Oct 2026 -13 Oct 2026",
    time: "10:00 AM , 01:00 PM"
  },
  { id: 2, title: "Spider-Man: Across the Spider-Verse", poster: "spiderman.jpg",
    showDate: "14 Oct 2026- 15 Oct 2026",
    time: "01:00 AM , 04:00 PM",
  },
  { id: 3, title: "The Conjuring: Last Rites", poster: "conjuring.jpg",
    showDate: "17 Oct 2026- 18 Oct 2026",
    time: "10:00 AM , 01:00 PM",
   },
  { id: 4, title: "FriendZone", poster: "friendzone.jpg",
    showDate: "19 Oct 2026- 20 Oct 2026",
    time: "01:00 AM , 04:00 PM",
   }
];
// ထိုင်ခုံတန်းအလိုက် စျေးနှုန်းများ သတ်မှတ်ခြင်း
const seatCategories = [
  { rows: ["A"], name: "PREMIUM", price: 8000 },
  { rows: ["B", "C"], name: "EXECUTIVE", price: 7000 },
  { rows: ["D"], name: "NORMAL", price: 5000 }
];

const bookedSeatsData = {
  1: ["A2", "A3", "C4"],
  2: ["B1", "B2", "D5", "D6"],
  3: ["A1", "C2"]
};

let currentMovie = null;
let selectedSeats = [];

const homePage = document.getElementById("home-page");
const seatPage = document.getElementById("seat-page");
const paymentPage = document.getElementById("payment-page");
const confirmationPage = document.getElementById("confirmation-page");

const movieGrid = document.getElementById("movie-grid");
const seatContainer = document.getElementById("seat-container");
const selectedSeatsText = document.getElementById("selected-seats-text");
const totalPriceText = document.getElementById("total-price");
const btnPayment = document.getElementById("btn-payment");
const showDateInput = document.getElementById("show-date");

showDateInput.valueAsDate = new Date();

// ၂။ ရုပ်ရှင်ကားများ ပြသခြင်း (စျေးနှုန်း စာတန်း ဖြုတ်ထားပါသည်)
function renderMovies() {
  movieGrid.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = 
      `<img src="${movie.poster}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p class="movie-schedule">${movie.showDate}</p>
        <p class="movie-schedule">${movie.time}</p>
        <button class="btn-book" onclick="selectMovie(${movie.id})">Book Now</button>
      </div>`
   ;
    movieGrid.appendChild(card);
  });
}

function selectMovie(movieId) {
  currentMovie = movies.find(m => m.id === movieId);
  selectedSeats = [];
  
  document.getElementById("selected-movie-title").innerText = currentMovie.title;
  
  renderSeats();
  updateSummary();
  
  homePage.classList.add("hidden");
  seatPage.classList.remove("hidden");
}

function renderSeats() {
  seatContainer.innerHTML = "";
  const rows = ["A", "B", "C", "D"];
  const seatsPerRow = 8;
  const bookedList = bookedSeatsData[currentMovie.id] || [];
seatCategories.forEach(category => {
      const categoryHeader= document.createElement("div");
      categoryHeader.className="category-header";
      categoryHeader.innerText=`${category.name} : ${category.price.toLocaleString()}MMK`;
      seatContainer.appendChild(categoryHeader);
          // ထိုင်ခုံတန်းများအတွက် Wrapper Div ပြုလုပ်ခြင်း
    const categoryRowGroup = document.createElement("div");
    categoryRowGroup.className = "category-row-group";

    category.rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "seat-row";

      for (let i = 1; i <= seatsPerRow; i++) {
        const seatId = `${row}${i}`;
        const seat = document.createElement("div");
        seat.classList.add("seat");
        seat.innerText = seatId;

        if (bookedList.includes(seatId)) {
          seat.classList.add("booked");
        } else {
          seat.classList.add("available");
          if (selectedSeats.includes(seatId)) {
            seat.classList.add("selected");
          }
          seat.addEventListener("click", () => toggleSeatSelection(seat, seatId));
        }

        rowDiv.appendChild(seat);
      }
      categoryRowGroup.appendChild(rowDiv);
    });

    seatContainer.appendChild(categoryRowGroup);
  });
}
// ၃။ ထိုင်ခုံတန်းအလိုက် စုစုပေါင်း ကျသင့်ငွေ တွက်ချက်သည့် အဓိက Function
function calculateTotal() {
  return selectedSeats.reduce((sum, seatId) => {
    const rowLetter= seatId.charAt(0);
    const category = seatCategories.find(cat => cat.rows.includes( rowLetter)); // ထိုင်ခုံ၏ ပထမဆုံး အက္ခရာ (A, B, C, D) ကိုယူခြင်း
    return sum + (category ? category.price : 0);
  }, 0);
}
function toggleSeatSelection(seatElement, seatId) {
  if (seatElement.classList.contains("selected")) {
    seatElement.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s !== seatId);
  } else {
    seatElement.classList.add("selected");
    selectedSeats.push(seatId);
  }
  updateSummary(); // ငွေပမာဏ ပြန်တွက်ရန် ခေါ်ခြင်း
}

function updateSummary() {
  if (selectedSeats.length > 0) {
    selectedSeatsText.innerText = selectedSeats.join(", ");
    const total = calculateTotal();
    totalPriceText.innerText = total.toLocaleString()+" MMK";
    btnPayment.disabled = false;
  } else {
    selectedSeatsText.innerText = "None";
    totalPriceText.innerText = "0";
    btnPayment.disabled = true;
  }
}
function showHome() {
  seatPage.classList.add("hidden");
  paymentPage.classList.add("hidden");
  confirmationPage.classList.add("hidden");
  homePage.classList.remove("hidden");
}

function showSeatSelection() {
  paymentPage.classList.add("hidden");
  seatPage.classList.remove("hidden");
}


function goToPayment() {
  seatPage.classList.add("hidden");
  paymentPage.classList.remove("hidden");

  const date = document.getElementById("show-date").value;
  const time = document.getElementById("show-time").value;
  const total = calculateTotal();

  document.getElementById("payment-summary-box").innerHTML = 
    `<p><strong>Movie:</strong> ${currentMovie.title}</p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Time:</strong> ${time}</p>
    <p><strong>Seats:</strong> ${selectedSeats.join(", ")}</p>
    <p><strong>Total Amount:</strong> ${total.toLocaleString()} MMK</p>`
  ;
}

function processPayment(method) {
  if (!bookedSeatsData[currentMovie.id]) {
    bookedSeatsData[currentMovie.id] = [];
  }
  bookedSeatsData[currentMovie.id].push(...selectedSeats);

  const date = document.getElementById("show-date").value;
  const time = document.getElementById("show-time").value;
  const total = calculateTotal();

  document.getElementById("ticket-details-box").innerHTML = 
    `<p><strong>Booking ID:</strong> #${Math.floor(100000 + Math.random() * 900000)}</p>
    <p><strong>Movie:</strong> ${currentMovie.title}</p>
    <p><strong>Date & Time:</strong> ${date} (${time})</p>
    <p><strong>Seats:</strong> ${selectedSeats.join(", ")}</p>
    <p><strong>Payment Method:</strong> ${method}</p>
    <p><strong>Total Paid:</strong> ${total.toLocaleString()} MMK</p>`
  ;

  paymentPage.classList.add("hidden");
  confirmationPage.classList.remove("hidden");
}

renderMovies();