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
    var target = this.attributes.target.value;
    var identifier = this.attributes.identifier.value;

    this.innerHTML = `<div class="card ">
    <button
      class="h-32 w-full sm:h-48 object-cover"
      data-bs-toggle="modal"
      data-bs-target="${target}"
    >
      <img
        src="${src}"
        alt="${alt}"
        class="${
          image_class +
          " transform hover:scale-105 transition ease-linear duration-200"
        }"
      />
    </button>
    <div class="m-4">
      <div class="flex justify-between">
          <div>
            <button
            class="text-left"
            data-bs-toggle="modal"
            data-bs-target="${target}"
            >
              <span class="font-bold text-xl">${title}</span>
            </button>
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
      <div class="flex justify-end">
          <button 
            class="hover_button w-10 h-10 mt-1 mr-1 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 transition ease-out duration-150"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >
              +
          </button>
          
          <ul
          class="
            dropdown-menu
            quick_add_dropdown
            h-32 w-32
          "
        >
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"1_" + identifier}"
              onclick = "quickAdd(id)"
              >1</
            button>
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"2_" + identifier}"
              onclick = "quickAdd(id)"
              >2</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"3_" + identifier}"
              onclick = "quickAdd(id)"
              >3</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"4_" + identifier}"
              onclick = "quickAdd(id)"
              >4</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"5_" + identifier}"
              onclick = "quickAdd(id)"
              >5</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"6_" + identifier}"
              onclick = "quickAdd(id)"
              >6</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"7_" + identifier}"
              onclick = "quickAdd(id)"
              >7</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"8_" + identifier}"
              onclick = "quickAdd(id)"
              >8</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"9_" + identifier}"
              onclick = "quickAdd(id)"
              >9</button
            >
          </li>
          <li>
            <button
              class="
                dropdown-item
                quick_add_item
              "
              id = "${"10_" + identifier}"
              onclick = "quickAdd(id)"
              >10</button
            >
          </li>
          <li class="sticky -bottom-0 text-center bg-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 opacity-70">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <div class="bg-blue-200 flex text-gray-700 text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2">
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

class Tick extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `<svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="check"
    class="text-green-600 w-4 h-4 mr-2"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
    ></path></svg
  >`;
  }
}
window.customElements.define("tick-svg", Tick);
