document.addEventListener("DOMContentLoaded", function () {
    const campgrounds = document.querySelectorAll(".campground-card");
    const loadMoreBtn = document.getElementById("loadMore");
    const showLessBtn = document.getElementById("showLess");
    // Only initialize if buttons exist
    if (loadMoreBtn && showLessBtn) {
        let visibleCount = 9;

        // Initial check for campground count
        if (campgrounds.length <= 9) {
            loadMoreBtn.style.display = "none";
        }

        loadMoreBtn.addEventListener("click", function () {
            let nextCount = visibleCount + 9;
            for (let i = visibleCount; i < nextCount && i < campgrounds.length; i++) {
                campgrounds[i].style.display = "block";
            }
            visibleCount = nextCount;

            if (visibleCount >= campgrounds.length) {
                loadMoreBtn.style.display = "none";
            }
            showLessBtn.style.display = "inline-block";
        });

        showLessBtn.addEventListener("click", function () {
            for (let i = 9; i < campgrounds.length; i++) {
                campgrounds[i].style.display = "none";
            }
            visibleCount = 9;
            loadMoreBtn.style.display = "inline-block";
            showLessBtn.style.display = "none";
        });
    }
});