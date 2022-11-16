class Card extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    var title = this.attributes.title.value;
    var src = this.attributes.image.value;
    var alt = this.attributes.alt.value;
    var image_class = this.attributes.image_style.value;
    var author = this.attributes.author.value;
    var time = this.attributes.time.value;
    var price = this.attributes.price.value;

    this.innerHTML = `<div class="card hover:shadow-xl transform hover:scale-105 transition ease-linear duration-200">
    <img
      src="${src}"
      alt="${alt}"
      class="${image_class}"
    />
    <div class="m-4">
      <div class="flex justify-between">
        <div>
          <span class="font-bold text-xl">${title}</span>
        </div>
        <div>
          <span
            class="pt-1 block text-grey-500 text-xs text-green-500 text-right"
            id="${"discountText_" + title}"
          ></span>
        </div>
      </div>
      <div class="flex justify-between">
        <div>
          <span class="pt-1 block text-grey-500 text-sm">${author}</span>
        </div>
        <div class="flex">
          <span
            class="block text-grey-500 text-lg text-right pr-3"
            id="${"unitPrice_" + title + " Stream"}"
          ></span>
          <hr size="8" width="90%" color="red" />
          <span
            class="block text-grey-500 text-lg text-right"
            id="${"unitPriceBase_" + title + " Stream"}"
          >
            ${price}
          </span>
        </div>
      </div>
    </div>
    <div class="bg-blue-200 text-gray-700 text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2">
      <svg
        class="w-5 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>${time}</span>
    </div>
  </div>`;
  }
}
window.customElements.define("product-card", Card);
