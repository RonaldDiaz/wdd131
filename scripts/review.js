
const reviewsDisplay = document.querySelector(".total-reviews");
let numReviews = Number(window.localStorage.getItem("numReviews")) || 0;

numReviews++;
localStorage.setItem("numReviews", numReviews)

if (numReviews == 1) {
    reviewsDisplay.textContent = "Your first product review has been posted! Congratulations!";
} else {
	reviewsDisplay.innerHTML = `Your product review <strong>N° ${numReviews}</strong> has been posted.`;
}

