document.addEventListener("DOMContentLoaded", function()
{
    const listItems = document.querySelectorAll(".list");
    const plusItem = document.querySelector(".list:nth-child(3)");
    const smallMenu = document.querySelector(".small_menu");
    const indicator = document.querySelector(".indicator");
    const searchInput = document.querySelector(".input-search");
    let isSmallMenuVisible = false;

    function toggleSmallMenu(event) {
        if (plusItem.contains(event.target)) {
            event.stopPropagation();
            if (isSmallMenuVisible) {
                smallMenu.classList.remove("hienra");
                plusItem.querySelector("i.fa-solid.fa-plus").style.transform = "rotate(0deg)";
                isSmallMenuVisible = false;
            } else {
                smallMenu.classList.add("hienra");
                plusItem.querySelector("i.fa-solid.fa-plus").style.transform = "rotate(45deg)";
                isSmallMenuVisible = true;
            }
            updateIndicator(plusItem);
        } else if (!smallMenu.contains(event.target)) {
            smallMenu.classList.remove("hienra");
            plusItem.querySelector("i.fa-solid.fa-plus").style.transform = "rotate(0deg)";
            isSmallMenuVisible = false;
            const clickedItem = event.target.closest(".list");
            if (clickedItem) {
                updateIndicator(clickedItem);
            }
        }
    }

    function updateIndicator(activeItem) {
        const index = Array.from(listItems).indexOf(activeItem);
        indicator.style.transform = `translateX(calc(70px * ${index}))`;
        listItems.forEach(item => item.classList.remove("active"));
        activeItem.classList.add("active");
    }

    document.addEventListener("click", toggleSmallMenu);

    searchInput.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    smallMenu.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    listItems.forEach(item => {
        item.addEventListener("click", (event) => {
            if (!plusItem.contains(event.target)) {
                smallMenu.classList.remove("hienra");
                plusItem.querySelector("i.fa-solid.fa-plus").style.transform = "rotate(0deg)";
                isSmallMenuVisible = false;
                updateIndicator(item);
            }
        });
    });

    // Bắt sự kiện click cho mỗi phần tử trong listItems
    listItems.forEach(item => item.addEventListener("click", toggleSmallMenu));

    const icons_left = document.querySelector('.left');
    const icons_right = document.querySelector('.right');
    const card = document.querySelector('.card');
    const cardDom = document.querySelector("#width-card").getBoundingClientRect().width;

    icons_left.addEventListener('click', function() {
        sliderPrev(card);
    });

    icons_right.addEventListener('click', function() {
        sliderNext(card);
    });

    function sliderPrev(target) {
        target.scrollBy({
            left: -cardDom,
            behavior: "smooth",
        });

        // Kiểm tra nếu scroll đến hình cuối cùng bên trái
        if (target.scrollLeft === 0) {
            // Di chuyển về hình đầu tiên
            target.scrollTo({
                left: target.scrollWidth,
                behavior: "smooth",
            });
        }
    }

    function sliderNext(target) {
        target.scrollBy({
            left: cardDom,
            behavior: "smooth",
        });

        // Kiểm tra nếu scroll đến hình cuối cùng bên phải
        if (target.scrollLeft + target.clientWidth >= target.scrollWidth) {
            // Di chuyển về hình đầu tiên
            target.scrollTo({
                left: 0,
                behavior: "smooth",
            });
        }
    }

    let icon_search = document.querySelector(".fa-magnifying-glass");
    let clear = document.querySelector(".clear");
    icon_search.onclick = function()
    {
        document.querySelector(".khung_search").classList.toggle("active");
    }
    clear.onclick = function()
    {
        document.getElementById("search").value = "";
    }
}, false);