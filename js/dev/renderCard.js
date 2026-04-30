function renderCard(item) {
  const isAvailable = item.availability === "In stock";
  const hasPrice = item.price !== null && item.price !== void 0;
  const isOnSale = item.sale && item.oldPrice;
  const notAvailableClass = !isAvailable ? " product-item-not-available" : "";
  const saleClass = isOnSale ? " product-item__link--sale" : "";
  return `
    <div class="product-item swiper-slide${notAvailableClass}"
      data-product-id="${item.id}"
      data-product-title="${item.title}"
      data-product-price="${item.price ?? ""}"
      data-product-image="${item.image}"
      data-price="${item.price ?? ""}"
      data-rating="${item.rating}"
      data-popularity="${item.popularity}"
      data-brand="${item.brand}"
      data-category="${item.category}"
      data-subcategory="${item.subcategory ?? ""}"
      data-collections="${Array.isArray(item.collections) ? item.collections.join(",") : ""}"
    >
      <button
        class="product-item__fav add-to-favorit"
        type="button"
        aria-label="Add to favorites"
        data-wishlist-btn
      ></button>

      ${isAvailable && hasPrice ? `
        <button
          class="product-item__cart --icon-cart"
          type="button"
          aria-label="Add to cart"
          data-addtocart
        ></button>
      ` : ""}

      ${!isAvailable ? `
        <a href="#" class="product-item__notify-link">
          <span>Notify when available</span>
        </a>
      ` : ""}

      <a class="product-item__link${saleClass}" href="${item.link}">
        <p class="product-item__hover-text">view product</p>

        <img
          class="product-item__image"
          src="${item.image}"
          width="200"
          height="200"
          loading="eager"
          alt="${item.title}"
        />

        <h3 class="product-item__title">${item.title}</h3>

        ${isAvailable && hasPrice ? `
          <div class="product-item__prices">
            <p class="product-item__price">$${formatPrice(item.price)}</p>
            ${isOnSale ? `
              <p class="product-item__price-old">$${formatPrice(item.oldPrice)}</p>
            ` : ""}
            <meta itemprop="priceCurrency" content="USD" />
            <link itemprop="availability" href="https://schema.org/InStock" />
          </div>
        ` : ""}

        ${isAvailable && !hasPrice ? `
          <p class="product-item__price-on-request">Price on request</p>
        ` : ""}

        ${!isAvailable ? `
          <p class="product-item__notify-text">Currently unavailable</p>
        ` : ""}

      </a>
    </div>
  `;
}
function formatPrice(price) {
  const num = Number(price);
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
function renderCards(container, items) {
  if (!container || !(items == null ? void 0 : items.length)) return;
  container.innerHTML = items.map(renderCard).join("");
}
function filterByCollection(products, collection) {
  return products.filter(
    (item) => Array.isArray(item.collections) && item.collections.includes(collection)
  );
}
function filterByCategory(products, category) {
  return products.filter((item) => item.category === category);
}
export {
  filterByCollection as a,
  renderCard as b,
  filterByCategory as f,
  renderCards as r
};
