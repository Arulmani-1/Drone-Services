window.initProducts = function() {
    const productsData = [
        {
            id: 1,
            tag: "CINEMATOGRAPHY",
            title: "Affiliate Woo Ninja",
            rating: 3,
            price: "$20.00",
            salePrice: null,
            img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        },
        {
            id: 2,
            tag: "EQUIPMENT • RENT",
            title: "Download Ninja",
            rating: 4,
            price: "$20.00",
            salePrice: null,
            img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        },
        {
            id: 3,
            tag: "SENSORS",
            title: "Flying Ninja",
            rating: 4,
            price: "$30.00",
            salePrice: "$28.00",
            img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "READ MORE"
        },
        {
            id: 4,
            tag: "TECHNOLOGY",
            title: "Grouped Ninja",
            rating: 3,
            price: "$12.00",
            salePrice: "$10.00",
            img: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        },
        {
            id: 5,
            tag: "TECHNOLOGY",
            title: "On Sale Woo Single",
            rating: 5,
            price: "$20.00",
            salePrice: "$18.00",
            img: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        },
        {
            id: 6,
            tag: "CAMERA",
            title: "Ship Your Idea",
            rating: 5,
            price: "$20.00",
            salePrice: null,
            img: "assets/images/pilots/drone.jpg",
            btnText: "ADD TO CART"
        },
        {
            id: 7,
            tag: "SENSORS",
            title: "Sidebar Ninja",
            rating: 4,
            price: "$35.00",
            salePrice: null,
            img: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "READ MORE"
        },
        {
            id: 8,
            tag: "TECHNOLOGY",
            title: "Standard Ninja",
            rating: 3,
            price: "$35.00",
            salePrice: null,
            img: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        },
        {
            id: 9,
            tag: "TECHNOLOGY",
            title: "Standard Quality",
            rating: 5,
            price: "$20.00",
            salePrice: null,
            img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            btnText: "ADD TO CART"
        }
    ];

    const generateStars = (rating) => {
        let starsHtml = '<div class="star-rating">';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += '<i class="fa-solid fa-star text-primary"></i>';
            } else {
                starsHtml += '<i class="fa-solid fa-star text-muted"></i>';
            }
        }
        starsHtml += '</div>';
        return starsHtml;
    };

    const generatePriceHTML = (price, salePrice) => {
        if (salePrice) {
            return `<del class="old-price">${price}</del> <ins class="new-price">${salePrice}</ins>`;
        }
        return `<span class="price-amount">${price}</span>`;
    };

    // Render Main Grid
    const grid = document.querySelector('.shop-grid');
    if (grid) {
        let html = '';
        productsData.forEach(p => {
            const saleBadge = p.salePrice ? `<span class="onsale">Sale!</span>` : '';
            html += `
                <div class="product-item">
                    <div class="product-image">
                        ${saleBadge}
                        <img src="${p.img}" alt="${p.title}" loading="lazy">
                    </div>
                    <div class="product-details">
                        <span class="product-category">${p.tag}</span>
                        <h2 class="product-title"><a href="#error404">${p.title}</a></h2>
                        ${generateStars(p.rating)}
                        <span class="price">
                            ${generatePriceHTML(p.price, p.salePrice)}
                        </span>
                        <div class="product-action">
                            <button class="btn-add-to-cart" onclick="window.location.hash='#error404'">${p.btnText}</button>
                        </div>
                    </div>
                </div>
            `;
        });
        grid.innerHTML = html;
    }

    // Render Sidebar Products (first 3)
    const sidebarProductsList = document.getElementById('sidebar-products');
    if (sidebarProductsList) {
        let sbHtml = '';
        productsData.slice(0, 3).forEach(p => {
            sbHtml += `
                <li>
                    <a href="#error404">
                        <img src="${p.img}" alt="${p.title}">
                        <span class="product-title">${p.title}</span>
                    </a>
                    ${generateStars(p.rating)}
                    <span class="price">${generatePriceHTML(p.price, p.salePrice)}</span>
                </li>
            `;
        });
        sidebarProductsList.innerHTML = sbHtml;
    }
};