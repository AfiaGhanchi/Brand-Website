var brandz = {
    First_Step: {
        Pakistan: [
            { img: "firstsh.webp", productName: "Shoes", price: "$10", shade: "Black", shadeImg: "fsh.webp" },
            { img: "firstbag.webp", productName: "Bag", price: "$20", shade: "Blue", shadeImg: "fbag.jpg" },
            { img: "firstwatch.jpg", productName: "Watch", price: "$20", shade: "Gold", shadeImg: "fw.jpg" }
        ]
    },
    Service: {
        Pakistan: [
            { img: "s1shoe.jpg", productName: "Shoes", price: "$15" },
            { img: "serbag.jpg", productName: "Bag", price: "$20" },
            { img: "serwatch.jpg", productName: "Watch", price: "$20" }
        ]
    },
    Stylo: {
        Pakistan: [
            { img: "stshoe.webp", productName: "Shoes", price: "$12" },
            { img: "stbag.webp", productName: "Lipglow", price: "$8" },
            { img: "stwatch.webp", productName: "Watch", price: "$20" }
        ]
    },
    English_Boot_House: {
        Pakistan: [
            { img: "engshoe.jpg", productName: "Shoes", price: "$20" },
            { img: "engbag.jpg", productName: "Bag", price: "$20" },
            { img: "engwatch.jpg", productName: "Watch", price: "$20" }
        ]
    },
    Urban_Soul: {
        Pakistan: [
            { img: "ursh.jpg", productName: "Shoes", price: "$18" },
            { img: "urbag.jpg", productName: "Bag", price: "$20" },
            { img: "urwa.jpg", productName: "Watch", price: "$20" }
        ]
    },
    Bata: {
        Pakistan: [
            { img: "bash.webp", productName: "Shoes", price: "$18" },
            { img: "babag.webp", productName: "Bag", price: "$20" },
            { img: "bawa.webp", productName: "Watch", price: "$20" }
        ]
    },
    AeroSoft: {
        Pakistan: [
            { img: "aesh.webp", productName: "Shoes", price: "$18" },
            { img: "aebag..jpg", productName: "Bag", price: "$20" },
            { img: "aewa.jpg", productName: "Watch", price: "$20" }
        ]
    },
    Borjan: {
        Pakistan: [
            { img: "borsh.jpg", productName: "Shoes", price: "$18" },
            { img: "borbag.webp", productName: "Bag", price: "$20" },
            { img: "borwa.webp", productName: "Watch", price: "$20" }
        ]
    },
    J_Shoes: {
        Pakistan: [
            { img: "jsh.jpeg", productName: "Shoes", price: "$18" },
            { img: "jbag.jpeg", productName: "Bag", price: "$20" },
            { img: "jwa.jpeg", productName: "Watch", price: "$20" }
        ]
    },
    Shoes_Planet: {
        Pakistan: [
            { img: "splash.jpg", productName: "Shoes", price: "$18" },
            { img: "splabag.webp", productName: "Bag", price: "$20" },
            { img: "splawa.webp", productName: "Watch", price: "$20" }
        ]
    }
};


var main = document.querySelector("#main");
var brand = document.querySelector("#brand");
var shade = document.querySelector("#shade");

brand.innerHTML = `<option value="">Select brand</option>`;

for (var key in brandz) {
    brand.innerHTML += `<option value="${key}">${key}</option>`;
}

function displayProducts() {
    main.innerHTML = "";
    shade.innerHTML = `<option value="">Select shade</option>`;
    shade.style.display = 'none';

    var selectedBrand = brandz[brand.value];

    for (var country in selectedBrand) {
        var products = selectedBrand[country];

        var carouselIndicators = products.map((_, index) => `
            <button type="button" data-bs-target="#carousel${country}" data-bs-slide-to="${index}" ${index === 0 ? 'class="active"' : ''} aria-current="true" aria-label="Slide ${index + 1}"></button>
        `).join('');

        var carouselItems = products.map((product, index) => `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img src="${product.img}" class="d-block w-100" alt="${product.productName}">
                <div class="carousel-caption d-none d-md-block ms-auto">
                    <h5>${product.productName}</h5>
                    <p>${product.price}</p>
                </div>
            </div>
        `).join('');

        main.innerHTML += `
            <div class="card text-center">
                <div id="carousel${country}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        ${carouselIndicators}
                    </div>
                    <div class="carousel-inner">
                        ${carouselItems}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${country}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel${country}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        `;

        if (brand.value === "First_Step") {
            shade.style.display = 'block';
            var shades = [...new Set(products.map(product => product.shade))];
            shade.innerHTML += shades.map(shadeColor => `
                <option value="${shadeColor}">${shadeColor}</option>
            `).join('');
        }
    }
}

function filterByShade() {
    var selectedShade = shade.value;
    var selectedBrand = brandz[brand.value];

    if (selectedShade) {
        var products = selectedBrand.Pakistan.filter(product => product.shade === selectedShade);

        main.innerHTML = "";

        products.forEach(product => {
            main.innerHTML += `
                <div class="card text-center">
                    <img src="${product.img}" class="card-img-top" alt="${product.productName}">
                    <div class="card-body">
                        <h5 class="card-title">${product.productName}</h5>
                        <p class="card-text">${product.price}</p>
                    </div>
                </div>
            `;
        });


        var shadeImage = products.length > 0 ? products[0].shadeImg : "";
        if (shadeImage) {
            main.innerHTML += `
                <div class="text-center mt-4">
                    <img src="${shadeImage}" class="img-fluid" alt="Selected Shade Image">
                </div>
            `;
        }
    }
}

function clearProducts() {
    main.innerHTML = "";
    brand.value = "";
    shade.innerHTML = `<option value="">Select shade</option>`;
    shade.style.display = 'none';
}

document.getElementById("searchBtn").addEventListener('click', displayProducts);
document.getElementById("clearBtn").addEventListener('click', clearProducts);
shade.addEventListener('change', filterByShade);

