class TileRight extends HTMLElement {
  constructor() {
    super();
    this.quantity = 1;
    this.bg = this.attributes.bg.value;
    this.description = this.attributes.description.value;
    this.img = this.attributes.img.value;
    this.inputId = "input_" + this.title;
  }
  connectedCallback() {
    var title = this.attributes.title.value;
    var price = this.attributes.price.value;
    this.innerHTML = `<div
    class="card flex justify-around snap-center shadow-xl"
  >
    <div class="shadow-2xl p-12 w-7/12 ${this.bg}">
      <h1 class="font-poppins text-6xl bg-white text-right">
        ${this.title}
      </h1>

      <div class="font-poppins pt-10 pb-5">
        ${this.description}
      </div>
      <div class="text-xl font-semibold pt-10 pb-5" id="${
        "cardUnitPrice_" + title
      }">
        Unit Price: ${price}
      </div>
      <div class="pt-10">
        <div class="flex justify-center">
          <button
            class="w-10 h-10 mr-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
            id="${"minus_" + this.title}"
            onclick = updateQuantity(id)
          >
            -
          </button>
          <input type="text"  value="${
            this.quantity
          }" class="w-10 text-center p-0" id="${this.inputId}"/>
          <button
            class="w-10 h-10 ml-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
            id="${"plus_" + this.title}"  
            onclick = updateQuantity(id)
          >
            +
          </button>
        </div>
        <div class="flex justify-center mt-3">
          <button
            class="rounded-full py-2 px-3  uppercase text-xs font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
            id="${"Add_" + this.title}"
            onclick = addToCart(id)
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
    <div class="w-5/12">
      <div class="flex justify-end">
        <button
          type="button"
          class="btn-close box-content w-4 h-4 p-5 fixed text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline z-10"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div id="carouselExampleCaptions" class="carousel slide carousel-fade relative" data-bs-ride="carousel">
  <div
    class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
  >
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>
  <div class="carousel-inner relative h-full overflow-hidden">
    <div class="carousel-item active relative h-full float-left">
      <video class="w-full" autoplay loop muted>
        <source src="https://mdbcdn.b-cdn.net/img/video/Tropical.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="carousel-item relative h-full float-left">
      <video class="w-full" autoplay loop muted>
        <source src="https://mdbcdn.b-cdn.net/img/video/forest.mp4" type="video/mp4" />
      </video>
    </div>
    <div class="carousel-item relative h-full float-left">
      <video class="w-full" autoplay loop muted>
        <source src="https://mdbcdn.b-cdn.net/img/video/Agua-natural.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
  <button
    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span
      class="carousel-control-prev-icon inline-block bg-no-repeat"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span
      class="carousel-control-next-icon inline-block bg-no-repeat"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  </div>`;
  }
}
window.customElements.define("product-tile-right", TileRight);

class TileLeft extends HTMLElement {
  constructor() {
    super();
    this.quantity = 1;
  }

  connectedCallback() {
    var bg = this.attributes.bg.value;
    var description = this.attributes.description.value;
    var img = this.attributes.img.value;
    var title = this.attributes.title.value;
    this.inputId = "input_" + this.title;
    var price = this.attributes.price.value;

    this.innerHTML = `<div class="card flex justify-around snap-center shadow-xl">
    <div class="w-5/12">
      <img src="${img}" alt="" />
    </div>
    <div class="shadow-2xl w-7/12 ${bg}">
    <div class="flex justify-end">
        <button
          type="button"
          class="btn-close box-content w-4 h-4 p-5 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="pb-12 pl-12 pr-12">
      <h1 class="font-poppins text-6xl bg-white text-left">${title}</h1>
      <div class="font-poppins pt-10 pb-5">
        ${description}
      </div>
      <div class="text-xl font-semibold pt-10 pb-5" id="${
        "cardUnitPrice_" + title
      }">
        Unit Price: ${price}
      </div>
      <div class="pt-10">
        <div class="flex justify-center">
          <button
          class="w-10 h-10 mr-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
          id="${"minus_" + title}"
          onclick = updateQuantity(id)
        >
          -
        </button>
        <input type="text" value="${
          this.quantity
        }" class="w-10 text-center p-0"  id="${this.inputId}">
        <button
          class="w-10 h-10 ml-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
          id="${"plus_" + title}"
          onclick = updateQuantity(id)
        >
          +
        </button>
        </div>
      <div class=" flex justify-center mt-3">
        <button class="rounded-full py-2 px-3  uppercase text-xs font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
          id="${"Add_" + title}"
          onclick = addToCart(id)
        >
          Add to cart
        </button>
      </div>
      </div>
    </div></div>
  </div>`;
  }
}
window.customElements.define("product-tile-left", TileLeft);
