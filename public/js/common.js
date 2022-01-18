// When the user scrolls down 50px from the top of the document, resize the header's font size
if (!window.matchMedia("screen and (max-width: 930px)").matches) {
    window.onscroll = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementsByTagName("header")[0].classList.add('scroll');
        } else {
            document.getElementsByTagName("header")[0].classList.remove('scroll');
        }
    };
} else {
    // show menu on click
    let menu = document.querySelector("header button#show-menu");
    menu.onclick = () => {
        menu.classList.toggle("change");

        let nav = document.querySelector("header nav");
        nav.classList.toggle("show");
    };
}

// Show contact form
let formButton = document.querySelector("button.contact");
let form = document.querySelector("form.contact");
formButton.addEventListener('click', function formClick() {
    form.classList.toggle("show");
    document.body.classList.toggle("stopScroll");

    if (document.body.classList.contains("stopScroll")) {
        setTimeout(() => {
            document.addEventListener("click", function fn(evt) {
                let targetElement = evt.target; // clicked element
                do {
                    if (targetElement === form) {
                        // click inside
                        return;
                    }
                    // Go up the DOM
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                // click outside.
                document.removeEventListener('click', fn)
                formClick()
            });
        }, 20);
    }
});
