

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        try {
            const resp = JSON.parse(this.responseText);
            if (resp.id) {
                var element = document.querySelector("a[href='/login']")
                if (element) {
                    element.innerHTML = '<span class="elementor-button-content-wrapper"><span class="elementor-button-text">Atsijungti</span></span>';
                    element.setAttribute("href", "/logout");
                }

            }
        } catch (error) {

        }
    }
});

xhr.open("GET", "/api/userInfo");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send();