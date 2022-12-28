// var url = "https://vpathre.github.io/resolute_catalogue/";
var url = "http://127.0.0.1:5000/estimate";
// var total_order = [
//   ["Package: Premium", "1", "109250", "package"],
//   ["Apprentice Stream", "10", "2173.5", "stream"],
//   ["Master Stream", "10", "3105", "stream"],
//   ["Facilitator's Guide: Apprentice Level 1", "1", "300", "facilitator"],
//   ["Facilitator's Guide: Advanced Level 2", "1", "300", "facilitator"],
//   ["Student's Guide: Novice Level 1", "1", "120", "student"],
//   ["Student's Guide: Apprentice Level 2", "1", "120", "student"],
//   ["Apprentice Training", "1", "6900", "3", "person training"],
//   ["Master Training", "1", "6900", "3", "person training"],
// ];
var total_order = [];
// [title, quantity, price, identifier]
var package_selected = false;
var teacher_online = 6900;
var teacher_person = 13800;
var today = new Date();

var cont = false;

// [Novice, Apprentice, Adept, Beginner, Advanced, Master, Facilitators, Student]
var product_array = [2300, 2415, 2530, 2645, 2875, 3450, 300, 120];

// keeps track of streams selected, saves inefficiency of iterating through entire cart
var stream_tracker = [];
var teacher_training = []; // keeps track of the teacher training modules selected
var delete_item = ""; // item id being deleted
var total_cost; // total cost of the cart

function updateQuantity(button_id) {
  /**
   * Updates the quantity of the streams selected in the modal pop-up.
   * @param button_id: refers to the element id recieved as a parameter
   */
  var inputIdString;
  console.log(button_id);
  // get input element
  if (button_id.slice(0, 5) == "plus_") {
    inputIdString = "input_" + button_id.slice(5, button_id.length);
  } else if (button_id.slice(0, 6) == "minus_") {
    inputIdString = "input_" + button_id.slice(6, button_id.length);
  }
  var input = document.getElementById(inputIdString);

  // update input element
  if (button_id.slice(0, 5) == "plus_") {
    input.value = (parseInt(input.value) + 1).toString();
  } else if (button_id.slice(0, 6) == "minus_") {
    if (parseInt(input.value) == 1) {
      return;
    } else {
      input.value = (parseInt(input.value) - 1).toString();
    }
  }
}

function addPackages(id) {
  /**
   * Adds a selected package to the cart based on ID passed in. Ensures only one package is selected.
   * @param id: refers to the element ID; the cost is derived thereof.
   */
  var price;
  var title;
  switch (id) {
    case "lite":
      title = "Package: Lite";
      price = 34500;
      teacher_online = 6900;
      teacher_person = 13800;
      packageBenefits("lite", package_selected);
      break;
    case "standard":
      title = "Package: Standard";
      price = 69000;
      teacher_online = 3450;
      teacher_person = 11730;
      packageBenefits("standard", package_selected);
      break;
    case "premium":
      title = "Package: Premium";
      price = 109250;
      teacher_online = 0;
      teacher_person = 6900;
      packageBenefits("premium", package_selected);
      break;
  }

  // if first package selected
  if (!package_selected) {
    var temp = [title, "1", price.toString(), "package"];
    total_order.push(temp);
    document.getElementById("cart_counter_small").innerHTML = getCartCount();
    document.getElementById("total_price_small").innerHTML =
      "R " + getCartTotal(total_order);
    document.getElementById("cart_counter_large").innerHTML = getCartCount();
    document.getElementById("total_price_large").innerHTML =
      "R " + getCartTotal(total_order);
  }
  // only can select one package (revised package condition)
  else {
    var temp = [title, "1", price.toString(), "package"];
    let index;
    for (let i = 0; i < total_order.length; i++) {
      if (total_order[i][3] == "package") {
        total_order.splice(i, 1);
        total_order.splice(i, 0, temp);
      }
    }
    document.getElementById("cart_counter_small").innerHTML = getCartCount();
    document.getElementById("total_price_small").innerHTML =
      "R " + getCartTotal(total_order);
    document.getElementById("cart_counter_large").innerHTML = getCartCount();
    document.getElementById("total_price_large").innerHTML =
      "R " + getCartTotal(total_order);
  }
  package_selected = true;
  teacherPricing();
}

function addToCart(button_id) {
  /**
   * Adds a certain stream to the cart based on the id passed in
   * @param button_id: passes in ID of the element relating to the stream; can be used to retrieve the type of stream
   */
  var inputIdString = "input_" + button_id.slice(4, button_id.length);
  var title = button_id.slice(4, button_id.length);
  var input = document.getElementById(inputIdString);
  var price;
  var identifier;

  switch (title) {
    case "Novice Stream":
      price = product_array[0];
      identifier = "stream";
      break;
    case "Apprentice Stream":
      price = product_array[1];
      identifier = "stream";
      break;
    case "Adept Stream":
      price = product_array[2];
      identifier = "stream";
      break;
    case "Beginner Stream":
      price = product_array[3];
      identifier = "stream";
      break;
    case "Advanced Stream":
      price = product_array[4];
      identifier = "stream";
      break;
    case "Master Stream":
      price = product_array[5];
      identifier = "stream";
      break;
  }
  if (button_id.slice(4, 17) == "Facilitator's") {
    price = 300;
    identifier = "facilitator";
  } else if (button_id.slice(4, 13) == "Student's") {
    price = 120;
    identifier = "student";
  }

  displayModal("success", input, title);
  var temp = [title, input.value, price.toString(), identifier];
  // if same stream is added more than once, just increase quantity of pre-existing stream
  if (total_order.length > 0) {
    let flag = false;
    let index = 0;
    for (let i = 0; i < total_order.length; i++) {
      if (total_order[i][0] == title) {
        flag = true;
        index = i;
        break;
      }
    }
    if (flag) {
      let temp_val = parseInt(total_order[index][1]) + parseInt(input.value);
      total_order[index][1] = temp_val.toString();
    } else {
      total_order.push(temp);
    }
  } else {
    total_order.push(temp);
  }
  console.log(title.slice(0, title.indexOf(" ")));
  if (
    title.slice(0, title.indexOf(" ")) != "Facilitator's" &&
    title.slice(0, title.indexOf(" ")) != "Student's"
  ) {
    if (stream_tracker.indexOf(title.slice(0, title.indexOf(" "))) === -1) {
      stream_tracker.push(title.slice(0, title.indexOf(" ")));
    }
  }
  document.getElementById("cart_counter_small").innerHTML = getCartCount();
  document.getElementById("total_price_small").innerHTML =
    "R " + getCartTotal(total_order);
  document.getElementById("cart_counter_large").innerHTML = getCartCount();
  document.getElementById("total_price_large").innerHTML =
    "R " + getCartTotal(total_order);
  console.log("Stream tracker", stream_tracker);
  trainingCounter(true);
}

function getCartCount() {
  /**
   * Calculates the number of items in the cart
   */
  var counter = 0;
  for (let i = 0; i < total_order.length; i++) {
    counter += parseInt(total_order[i][1]);
  }

  return counter.toString();
}

function getCartTotal(param) {
  /**
   * Calculates the total cost of the cart and also formats the number according to convention
   * @param param: array passed in that has to be totaled
   */
  var counter = 0;
  if (param[0].constructor === Array) {
    for (let i = 0; i < param.length; i++) {
      // subtotal of cart alongside the quantity
      counter += parseInt(param[i][1]) * parseInt(param[i][2]);
    }
  } else {
    // price of item being added (used for discount calculation)
    counter = param;
  }

  // handle decimal points
  total_cost = counter;
  var index = counter.toString().indexOf(".");
  var return_string;

  if (index != -1) {
    return_string = counter.toString().substring(0, index);
  } else {
    return_string = counter.toString();
  }
  switch (return_string.length) {
    case 4:
      return_string = return_string.split("");
      return_string.splice(1, 0, ",");
      return_string = return_string.join("");
      break;
    case 5:
      return_string = return_string.split("");
      return_string.splice(2, 0, ",");
      return_string = return_string.join("");
      break;
    case 6:
      return_string = return_string.split("");
      return_string.splice(3, 0, ",");
      return_string = return_string.join("");
      break;
    case 7:
      return_string = return_string.split("");
      return_string.splice(1, 0, ",");
      return_string.splice(5, 0, ",");
      return_string = return_string.join("");
      break;
    case 8:
      return_string = return_string.split("");
      return_string.splice(2, 0, ",");
      return_string.splice(6, 0, ",");
      return_string = return_string.join("");
      break;
  }

  if (index != -1) {
    return (
      return_string +
      counter.toString().substring(index, counter.toString().length)
    );
  } else {
    return return_string;
  }
}

function cartChecker() {
  /**
   * Double checks the content of the cart against the selected package and compiles total.
   * Targeted to fix an issue of
   */
  let toggle = document.getElementById("toogleA");
  let temp;
  for (let i = 0; i < total_order.length; i++) {
    if (toggle.checked) {
      temp = teacher_person;
    } else {
      temp = teacher_online;
    }
    if (total_order[i][0] == "Novice Stream") {
      total_order[i][2] = product_array[0].toString();
    } else if (total_order[i][0] == "Apprentice Stream") {
      total_order[i][2] = product_array[1].toString();
    } else if (total_order[i][0] == "Adept Stream") {
      total_order[i][2] = product_array[2].toString();
    } else if (total_order[i][0] == "Beginner Stream") {
      total_order[i][2] = product_array[3].toString();
    } else if (total_order[i][0] == "Advanced Stream") {
      total_order[i][2] = product_array[4].toString();
    } else if (total_order[i][0] == "Master Stream") {
      total_order[i][2] = product_array[5].toString();
    } else if (total_order[i][0] == "Novice Training") {
      total_order[i][2] = temp;
    } else if (total_order[i][0] == "Apprentice Training") {
      total_order[i][2] = temp;
    } else if (total_order[i][0] == "Adept Training") {
      total_order[i][2] = temp;
    } else if (total_order[i][0] == "Beginner Training") {
      total_order[i][2] = temp;
    } else if (total_order[i][0] == "Advanced Training") {
      total_order[i][2] = temp;
    } else if (total_order[i][0] == "Master Training") {
      total_order[i][2] = temp;
    }
  }
}

function packageBenefits(package, package_selected) {
  /**
   * Apply discount on all visible costs on the page based on the package that's selected
   * @param package: recieves the package selected in step 1 of the form
   * @param package_selected: boolean which signals if package has been selected already or has been "reselected" to another option.
   * Calculates and updates costs accordingly
   */
  var factor = 0;
  var novice, apprentice, adept, beginner, advanced, master, inperson, online;
  if (package == "lite") {
    factor = 1;
    document.getElementById("discountText_Novice").innerHTML = "";
    document.getElementById("discountText_Apprentice").innerHTML = "";
    document.getElementById("discountText_Adept").innerHTML = "";
    document.getElementById("discountText_Beginner").innerHTML = "";
    document.getElementById("discountText_Advanced").innerHTML = "";
    document.getElementById("discountText_Master").innerHTML = "";
    document.getElementById("unitPrice_Novice Stream").innerHTML = "";
    document.getElementById("unitPrice_Apprentice Stream").innerHTML = "";
    document.getElementById("unitPrice_Adept Stream").innerHTML = "";
    document.getElementById("unitPrice_Beginner Stream").innerHTML = "";
    document.getElementById("unitPrice_Advanced Stream").innerHTML = "";
    document.getElementById("unitPrice_Master Stream").innerHTML = "";
  } else if (package == "standard") {
    // 5% discount
    factor = 0.95;
    document.getElementById("discountText_Novice").innerHTML =
      "Standard Discount Applied";
    document.getElementById("discountText_Apprentice").innerHTML =
      "Standard Discount Applied";
    document.getElementById("discountText_Adept").innerHTML =
      "Standard Discount Applied";
    document.getElementById("discountText_Beginner").innerHTML =
      "Standard Discount Applied";
    document.getElementById("discountText_Advanced").innerHTML =
      "Standard Discount Applied";
    document.getElementById("discountText_Master").innerHTML =
      "Standard Discount Applied";
  } else if (package == "premium") {
    // 10% discount
    factor = 0.9;
    document.getElementById("discountText_Novice").innerHTML =
      "Premium Discount Applied";
    document.getElementById("discountText_Apprentice").innerHTML =
      "Premium Discount Applied";
    document.getElementById("discountText_Adept").innerHTML =
      "Premium Discount Applied";
    document.getElementById("discountText_Beginner").innerHTML =
      "Premium Discount Applied";
    document.getElementById("discountText_Advanced").innerHTML =
      "Premium Discount Applied";
    document.getElementById("discountText_Master").innerHTML =
      "Premium Discount Applied";
  }

  if (!package_selected) {
    novice = parseInt(
      document
        .getElementById("unitPriceBase_Novice Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Novice Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
    apprentice = parseInt(
      document
        .getElementById("unitPriceBase_Apprentice Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Apprentice Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
    adept = parseInt(
      document
        .getElementById("unitPriceBase_Adept Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Adept Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
    beginner = parseInt(
      document
        .getElementById("unitPriceBase_Beginner Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Beginner Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
    advanced = parseInt(
      document
        .getElementById("unitPriceBase_Advanced Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Advanced Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
    master = parseInt(
      document
        .getElementById("unitPriceBase_Master Stream")
        .innerHTML.substring(
          document
            .getElementById("unitPriceBase_Master Stream")
            .innerHTML.indexOf("R") + 1
        )
        .replace(",", "")
    );
  } else {
    novice = 2300;
    apprentice = 2415;
    adept = 2530;
    beginner = 2645;
    advanced = 2875;
    master = 3450;
  }

  novice *= factor;
  apprentice *= factor;
  adept *= factor;
  beginner *= factor;
  advanced *= factor;
  master *= factor;

  document.getElementById("unitPrice_Novice Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(novice).toString());
  document.getElementById("unitPrice_Apprentice Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(apprentice).toString());
  document.getElementById("unitPrice_Adept Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(adept).toString());
  document.getElementById("unitPrice_Beginner Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(beginner).toString());
  document.getElementById("unitPrice_Advanced Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(advanced).toString());
  document.getElementById("unitPrice_Master Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(master).toString());

  // Adjust the prices reflected on individual product modals
  document.getElementById("cardUnitPrice_Novice Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(novice).toString());
  document.getElementById("cardUnitPrice_Apprentice Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(apprentice).toString());
  document.getElementById("cardUnitPrice_Adept Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(adept).toString());
  document.getElementById("cardUnitPrice_Beginner Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(beginner).toString());
  document.getElementById("cardUnitPrice_Advanced Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(advanced).toString());
  document.getElementById("cardUnitPrice_Master Stream").innerHTML =
    "R" + getCartTotal(Math.ceil(master).toString());

  if (factor < 1) {
    // if standard or premium is selected
    document.getElementById(
      "unitPriceBase_Novice Stream"
    ).innerHTML = `<strike class="text-gray-500">R2,300</strike>`;
    document.getElementById(
      "unitPriceBase_Apprentice Stream"
    ).innerHTML = `<strike class="text-gray-500">R2,415</strike>`;
    document.getElementById(
      "unitPriceBase_Adept Stream"
    ).innerHTML = `<strike class="text-gray-500">R2,530</strike>`;
    document.getElementById(
      "unitPriceBase_Beginner Stream"
    ).innerHTML = `<strike class="text-gray-500">R2,645</strike>`;
    document.getElementById(
      "unitPriceBase_Advanced Stream"
    ).innerHTML = `<strike class="text-gray-500">R2,875</strike>`;
    document.getElementById(
      "unitPriceBase_Master Stream"
    ).innerHTML = `<strike class="text-gray-500">R3,450</strike>`;
  } else {
    // if lite package is selected
    document.getElementById("unitPrice_Novice Stream").innerHTML = "";
    document.getElementById("unitPrice_Apprentice Stream").innerHTML = "";
    document.getElementById("unitPrice_Adept Stream").innerHTML = "";
    document.getElementById("unitPrice_Beginner Stream").innerHTML = "";
    document.getElementById("unitPrice_Advanced Stream").innerHTML = "";
    document.getElementById("unitPrice_Master Stream").innerHTML = "";
    document.getElementById("unitPriceBase_Novice Stream").innerHTML = `R2,300`;
    document.getElementById(
      "unitPriceBase_Apprentice Stream"
    ).innerHTML = `R2,415`;
    document.getElementById("unitPriceBase_Adept Stream").innerHTML = `R2,530`;
    document.getElementById(
      "unitPriceBase_Beginner Stream"
    ).innerHTML = `R2,645`;
    document.getElementById(
      "unitPriceBase_Advanced Stream"
    ).innerHTML = `R2,875`;
    document.getElementById("unitPriceBase_Master Stream").innerHTML = `R3,450`;
  }

  // update costs of the product array
  product_array = [novice, apprentice, adept, beginner, advanced, master];

  // double check the contents of the cart to account for prior discounts (if applicable)
  cartChecker();
}

function trainingCounter(param) {
  /**
   * Displays the selected streams in the span present on the teacher training card
   */
  var return_string = "";
  for (let i = 0; i < stream_tracker.length; i++) {
    if (i != stream_tracker.length - 1) {
      return_string += stream_tracker[i] + ", ";
    } else {
      return_string += stream_tracker[i];
    }
  }
  if (stream_tracker.length == 0) {
    document.getElementById("teacher_stream_identifier").innerHTML =
      "No Streams Selected";
  } else {
    document.getElementById("teacher_stream_identifier").innerHTML =
      "Streams Selected:";
  }
  document.getElementById("teacher_training_streams").innerHTML = return_string;
  tableFieldEditor();
}

function tableFieldEditor() {
  /**
   * Modifies the teacher training modal to only show selected streams
   */
  document.getElementById("teacher_novice").style.display = "none";
  document.getElementById("teacher_apprentice").style.display = "none";
  document.getElementById("teacher_adept").style.display = "none";
  document.getElementById("teacher_beginner").style.display = "none";
  document.getElementById("teacher_advanced").style.display = "none";
  document.getElementById("teacher_master").style.display = "none";
  document.getElementById("novice_small_div").style.display = "none";
  document.getElementById("apprentice_small_div").style.display = "none";
  document.getElementById("adept_small_div").style.display = "none";
  document.getElementById("beginner_small_div").style.display = "none";
  document.getElementById("advanced_small_div").style.display = "none";
  document.getElementById("master_small_div").style.display = "none";

  // if no streams are selected
  console.log("table field editor", stream_tracker.length);
  if (stream_tracker.length == 0 && window.innerWidth < 1000) {
    document.getElementById("teacher_training_table").classList.add("hidden");
    var div = document.getElementById("teacher_training_container");
    div.innerHTML = "No streams selected (ㆆ_ㆆ)";
    div.style.display = "flex";
    document.getElementById("teacher_info").style.display = "none";
    document.getElementById("AddTeacher").innerHTML = "Continue";
    document
      .getElementById("AddTeacher")
      .setAttribute("data-bs-dismiss", "modal");
  } else if (stream_tracker.length > 0 && window.innerWidth > 1000) {
    // if item is in the stream tracker array, table row, else none
    // if viewport is on a larger screen
    for (let i = 0; i < stream_tracker.length; i++) {
      let temp = "teacher_" + stream_tracker[i].toLowerCase();
      document.getElementById(temp).style.display = "table-row";
    }
    document
      .getElementById("teacher_training_table")
      .classList.remove("hidden");
    document.getElementById("teacher_training_table").classList.add("flex-row");
    document.getElementById("teacher_training_container").style.display =
      "none";
    document.getElementById("teacher_info").style.display = "flex";
    document.getElementById("AddTeacher").innerHTML = "Add To Cart";
    document.getElementById("AddTeacher").removeAttribute("data-bs-modal");
  } else if (stream_tracker.length > 0 && window.innerWidth < 1000) {
    // if item is in the stream tracker array, table row, else none
    // if viewport is on a smaller screen
    for (let i = 0; i < stream_tracker.length; i++) {
      let temp = stream_tracker[i].toLowerCase() + "_small_div";
      document.getElementById(temp).style.display = "grid";
    }
    document.getElementById("teacher_training_table").classList.add("hidden");
    document.getElementById("teacher_training_container").style.display =
      "none";
    document.getElementById("teacher_info").style.display = "flex";
    document.getElementById("AddTeacher").innerHTML = "Add To Cart";
    document.getElementById("AddTeacher").removeAttribute("data-bs-modal");
  }
}

function toggleSwitch() {
  teacherPricing();
  addTeacherTraining(false);
}

function teacherPricing() {
  var toggle = document.getElementById("toogleA");

  if (!toggle.checked) {
    document.getElementById("teacher_price_novice").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
    document.getElementById("teacher_price_apprentice").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
    document.getElementById("teacher_price_adept").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
    document.getElementById("teacher_price_beginner").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
    document.getElementById("teacher_price_advanced").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
    document.getElementById("teacher_price_master").innerHTML =
      "R " + getCartTotal(teacher_online.toString());
  } else {
    document.getElementById("teacher_price_novice").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
    document.getElementById("teacher_price_apprentice").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
    document.getElementById("teacher_price_adept").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
    document.getElementById("teacher_price_beginner").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
    document.getElementById("teacher_price_advanced").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
    document.getElementById("teacher_price_master").innerHTML =
      "R " + getCartTotal(teacher_person.toString());
  }
  tableFieldEditor();
  addTeacherTraining(false);
}

function addTeacherTraining(param) {
  var toggle = document.getElementById("toogleA");
  var total = 0;
  let cart = [];
  let stream_name_input;
  let check_training;
  let sessions;
  for (let i = 0; i < stream_tracker.length; i++) {
    let stream_name = stream_tracker[i].toLowerCase();
    if (window.innerWidth < 1000) {
      stream_name_input = "input_teacher_" + stream_name + "_small";
      check_training = document.getElementById(
        "select_" + stream_name + "_small"
      );
      sessions = document.getElementById("session_" + stream_name + "_small");
    } else {
      stream_name_input = "input_teacher_" + stream_name;
      check_training = document.getElementById("select_" + stream_name);
      sessions = document.getElementById("session_" + stream_name);
    }
    if (check_training.checked) {
      if (!toggle.checked) {
        total +=
          parseInt(document.getElementById(stream_name_input).value) *
          teacher_online;
        cart.push([
          stream_tracker[i] + " Training",
          document.getElementById(stream_name_input).value,
          teacher_online.toString(),
          sessions.value,
          "online training",
        ]);
      } else {
        total +=
          parseInt(document.getElementById(stream_name_input).value) *
          teacher_person;
        cart.push([
          stream_tracker[i] + " Training",
          document.getElementById(stream_name_input).value,
          teacher_person.toString(),
          sessions.value,
          "person training",
        ]);
      }
    }
  }

  console.log(total_order);
  // if we just need to add up total
  if (!param) {
    let total_price = document.getElementById("TeacherUnitPrice");
    total_price.innerHTML = "Total price: R " + getCartTotal(total.toString());
  }
  //add the total to the cart
  else {
    for (let i = 0; i < cart.length; i++) {
      total_order.push(cart[i].flat(2));
    }
    document.getElementById("cart_counter_small").innerHTML = getCartCount();
    document.getElementById("total_price_small").innerHTML =
      "R " + getCartTotal(total_order);
    document.getElementById("cart_counter_large").innerHTML = getCartCount();
    document.getElementById("total_price_large").innerHTML =
      "R " + getCartTotal(total_order);
  }
}

function updateQuantityTraining(button_id, identifier = false) {
  /**
   * Updates the quantity of the streams selected in the modal pop-up.
   * @param button_id: refers to the element id recieved as a parameter
   */
  var inputIdString;
  var input;
  // get input element
  if (button_id.slice(0, 5) == "plus_") {
    inputIdString = "input_" + button_id.slice(5, button_id.length);
  } else if (button_id.slice(0, 6) == "minus_") {
    inputIdString = "input_" + button_id.slice(6, button_id.length);
  }

  input = document.getElementById(inputIdString);

  // update input element
  if (button_id.slice(0, 5) == "plus_") {
    input.value = (parseInt(input.value) + 1).toString();
  } else if (button_id.slice(0, 6) == "minus_") {
    if (parseInt(input.value) == 1 && !identifier) {
      return;
    } else if (parseInt(input.value) == 1 && identifier) {
      return;
    } else {
      input.value = (parseInt(input.value) - 1).toString();
    }
  }
  addTeacherTraining(false);
}

function cart_view(flag) {
  /**
   * Is called whenever the user wishes to view the cart
   * @param flag: If TRUE => refers to mobile. If FALSE => refers to normal screens
   */
  document.getElementById("update_cart_card").innerHTML = "continue";
  // if cart is empty
  if (total_order.length == 0) {
    document.getElementById("summary_table").style.display = "none";
    var div = document.getElementById("table_container");
    div.innerHTML = "No items in cart (ㆆ_ㆆ)";
    div.style.display = "flex";
    document.getElementById("CartUnitPrice").style.display = "none";
  } else {
    var div = document.getElementById("table_container");
    div.style.display = "none";
    document.getElementById("summary_table").style.display = "table-row";
    var table_body = document.getElementById("update_cart_body");
    table_body.innerHTML = ``;
    let mobile_body = document.getElementById("update_cart_body");
    mobile_body.innerHTML = ``;
    document.getElementById("CartUnitPrice").style.display = "block";

    for (let i = 0; i < total_order.length; i++) {
      table_body.innerHTML += `<tr
    class="bg-white bg-opacity-20 border-b transition duration-300 ease-in-out"
  >
    <td class="px-6 py-4 flex-col text-sm lg:text-lg font-light text-grey-900">
      <div>${total_order[i][0]}</div>
      <div class="text-sm lg:text-lg pt-4 whitespace-nowrap"><b>Unit Price</b>: ${
        "R " + getCartTotal(total_order[i][2].toString())
      }
      </div>
    </td>

    <td
      class="text-sm lg:text-lg flex-col text-grey-900 font-light px-6 py-4 whitespace-nowrap"
    >
      <div class="flex justify-center">
        <button
          class="mr-3 text-lg uppercase font-bold cursor-pointer tracking-wide text-gray-700 hover:text-green-600 transition ease-out duration-150"
          id="${"minus_" + total_order[i][0] + "cart"}"
          onclick="updateQuantityCart(id)"
        >
          -
        </button>
        <input
          type="text"
          value="${total_order[i][1]}"
          class="w-10 p-0 text-center"
          id="${"input_" + total_order[i][0] + "cart"}"
        />
        <button
          class="ml-3 text-lg uppercase font-bold cursor-pointer tracking-wide text-gray-700 hover:text-green-600 transition ease-out duration-150"
          id="${"plus_" + total_order[i][0] + "cart"}"
          onclick="updateQuantityCart(id)"
        >
          +
        </button>
      </div>
      <div class="flex justify-center pt-4">
      <button id="${"remove_" + total_order[i][0]}"
      class="cursor-pointer tracking-wide hover:text-red-600 transition ease-out duration-150"
      data-bs-toggle="modal"
      data-bs-target="#delete_modal"
      onclick="delete_item = id; confirmCartDelete(false)"
      >
        Remove

        <svg
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
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
        <button>
      </div>
    </td>
    
    <td class="flex-col>
    
    </td>
  </tr>`;
    }

    document.getElementById("CartUnitPrice").innerHTML =
      "Cart Total: R " + getCartTotal(total_order);
  }
  document.getElementById("cart_counter_small").innerHTML = getCartCount();
  document.getElementById("cart_counter_large").innerHTML = getCartCount();
  if (total_order.length == 0) {
    document.getElementById("total_price_small").innerHTML = "R 0";
    document.getElementById("total_price_large").innerHTML = "R 0";
  } else {
    document.getElementById("total_price_small").innerHTML =
      "R " + getCartTotal(total_order);
    document.getElementById("total_price_large").innerHTML =
      "R " + getCartTotal(total_order);
  }
}

function updateCart() {
  /**
   * Updates the cart if any of the item quantities in the cart modal are modified
   */
  console.log(total_order);
  for (let i = 0; i < total_order.length; i++) {
    let current_input = document.getElementById(
      "input_" + total_order[i][0] + "cart"
    ).value;
    total_order[i][1] = current_input;
  }
  document.getElementById("cart_counter_small").innerHTML = getCartCount();
  document.getElementById("total_price_small").innerHTML =
    "R " + getCartTotal(total_order);
  document.getElementById("cart_counter_large").innerHTML = getCartCount();
  document.getElementById("total_price_large").innerHTML =
    "R " + getCartTotal(total_order);
}

function updateQuantityCart(button_id) {
  /**
   * Updates the quantity of the products present in the cart and calculates total value.
   * @param button_id: refers to the element id recieved as a parameter
   */
  var inputIdString;
  // get input element
  if (button_id.slice(0, 5) == "plus_") {
    if (button_id.slice(5, 12) != "Package") {
      inputIdString = "input_" + button_id.slice(5, button_id.length);
    }
  } else if (button_id.slice(0, 6) == "minus_") {
    inputIdString = "input_" + button_id.slice(6, button_id.length);
  }
  var input = document.getElementById(inputIdString);

  // update input element
  if (button_id.slice(0, 5) == "plus_") {
    input.value = (parseInt(input.value) + 1).toString();
  } else if (button_id.slice(0, 6) == "minus_") {
    if (parseInt(input.value) == 1) {
      return;
    } else {
      input.value = (parseInt(input.value) - 1).toString();
    }
  }

  document.getElementById("update_cart_card").innerHTML = "update";
}

function confirmCartDelete(param) {
  /**
   * Pop-up modal to delete an item from the cart
   * @param param: used to confirm deletion of item in cart*/
  if (param) {
    deleteCartItem(delete_item);
  } else {
    return;
  }
}

function deleteCartItem(bin_id) {
  /**
   * Removes a particular product from the cart.
   * @param bin_id: refers to the element id recieved as a parameter
   */

  var inputIdString;
  // get input element
  if (bin_id.slice(0, 7) == "remove_") {
    inputIdString = bin_id.slice(7, bin_id.length);
  }

  if (inputIdString.slice(0, 7) == "Package") {
    // if package deleted, revert price benefits
    package_selected = false;
    packageBenefits("lite", package_selected);
  }
  // if stream is being deleted, delete the stream and corresponding training
  else if (inputIdString == "Novice Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Novice"), 1);
  } else if (inputIdString == "Apprentice Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Apprentice"), 1);
  } else if (inputIdString == "Adept Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Adept"), 1);
  } else if (inputIdString == "Beginner Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Beginner"), 1);
  } else if (inputIdString == "Advanced Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Advanced"), 1);
  } else if (inputIdString == "Master Stream") {
    stream_tracker.splice(stream_tracker.indexOf("Master"), 1);
  }

  var stream_string = inputIdString;
  var training_string =
    stream_string.slice(0, stream_string.indexOf(" ")) + " Training";
  for (let i = 0; i < total_order.length; i++) {
    if (total_order[i][0] == stream_string) {
      total_order.splice(i, 1);
      if (total_order.length == 0) {
        cart_view();
        break;
      }
    }
    if (total_order[i][0] == training_string) {
      total_order.splice(i, 1);
      break;
    }
    cart_view();
  }
  document.getElementById("cart_counter_small").innerHTML = getCartCount();
  document.getElementById("cart_counter_large").innerHTML = getCartCount();
  if (total_order.length > 0) {
    document.getElementById("total_price_small").innerHTML =
      "R " + getCartTotal(total_order);
    document.getElementById("total_price_large").innerHTML =
      "R " + getCartTotal(total_order);
  } else {
    document.getElementById("total_price_small").innerHTML = "R 0";
    document.getElementById("total_price_large").innerHTML = "R 0";
  }
  trainingCounter(false);
}

function displayModal(type, input, id) {
  if (type == "success") {
    var append;
    if (parseInt(input.value) > 1) {
      append = "Kits.";
    } else {
      append = "Kit.";
    }

    document.getElementById("span-success-modal").innerHTML =
      "Successfully added: " + input.value + " " + id + " " + append;
    document.getElementById("success-modal").classList.remove("hidden");
    document.getElementById("success-modal").classList.add("inline-flex");
    var tl = gsap.timeline();
    tl.from(".success-modal", {
      duration: 0.5,
      translateY: 250,
      opacity: 100,
      transformOrigin: "bottom left",
      delay: 0.2,
    });
    tl.to(".success-modal", {
      duration: 0.5,
      translateY: -100,
      opacity: 0,
      transformOrigin: "bottom left",
      delay: 2,
    });

    setTimeout(() => {
      document.getElementById("success-modal").classList.remove("inline-flex");
      document.getElementById("success-modal").classList.add("hidden");
      tl.kill();
      tl = null;
    }, 4500);
  }
}

function submitForm(id) {
  var first = document.getElementById("first_name").value;
  var last = document.getElementById("last_name").value;
  var school = document.getElementById("school").value;
  var province = document.getElementById("location").value;
  var email = document.getElementById("email").value;
  var training = false;

  localStorage.setItem("name", first + " " + last);
  localStorage.setItem("school", school);
  localStorage.setItem("province", province);
  localStorage.setItem("email", email);
  localStorage.setItem("total_order", JSON.stringify(total_order));

  // check if total order contains training
  for (let i = 0; i < total_order.length; i++) {
    if (
      total_order[i][0].slice(
        total_order[i][0].length - 8,
        total_order[i][0].length
      ) == "Training"
    ) {
      training = true;
    }
  }
  if ((!training || !package_selected) && !cont) {
    console.log("package not chosen");
    var str;
    if (!training && !package_selected) {
      str =
        "It looks like you haven't selected a package or a teacher training option. Are you sure you want to continue?";
    } else if (!training) {
      str =
        "It looks like you haven't selected a teacher training program. Are you sure you want to continue?";
    } else if (!package_selected) {
      str =
        "It looks like you haven't selected a package option. Are you sure you want to continue?";
    }
    document.getElementById(id).setAttribute("data-bs-toggle", "modal");
    document.getElementById(id).setAttribute("data-bs-target", "#error_modal");
    document.getElementById(id).removeAttribute("form");
    document.getElementById(id).removeAttribute("type");
    document.getElementById("error-modal-message").innerHTML = str;
    // force the first modal pop-up
    document.getElementById(id).click();
  } else if (
    first != "" &&
    last != "" &&
    school != "" &&
    province != "" &&
    email != "" &&
    training == true &&
    package_selected == true &&
    cont == true
  ) {
    console.log("training chosen");
    document.getElementById(id).removeAttribute("data-bs-toggle");
    document.getElementById(id).removeAttribute("data-bs-target");
    document.getElementById(id).setAttribute("form", "contact_form");
    document.getElementById(id).setAttribute("type", "submit");
    document.getElementById(id).setAttribute("onclick", "process('loading')");
    // TODO: ADD stuff here to cater for the pop-up modal regarding the addition of packages (custom for training and package)
  } else {
    console.log("training and package chosen");
    document.getElementById(id).removeAttribute("data-bs-toggle");
    document.getElementById(id).removeAttribute("data-bs-target");
    document.getElementById(id).setAttribute("form", "contact_form");
    document.getElementById(id).setAttribute("type", "submit");
    document.getElementById(id).setAttribute("onclick", "process('loading')");
    document.getElementById(id).click();
    generatePDF("Send");
    console.log("send pdf to api");
  }
}

function setContinue() {
  cont = true;
  if (document.documentElement.clientWidth < 1024) {
    setTimeout(submitForm("submit-button"), 500);
  } else {
    setTimeout(submitForm("submit-button-large"), 500);
  }
}

function updateBooks(button_id, identifier = false) {
  /**
   * Updates the quantity of the streams selected in the modal pop-up.
   * @param button_id: refers to the element id recieved as a parameter
   */
  var inputIdString;
  // get input element
  if (button_id.slice(0, 5) == "plus_") {
    inputIdString = "input_" + button_id.slice(5, button_id.length);
  } else if (button_id.slice(0, 6) == "minus_") {
    inputIdString = "input_" + button_id.slice(6, button_id.length);
  }
  var input = document.getElementById(inputIdString);

  // update input element
  if (button_id.slice(0, 5) == "plus_") {
    input.value = (parseInt(input.value) + 1).toString();
  } else if (button_id.slice(0, 6) == "minus_") {
    if (parseInt(input.value) == 1 && !identifier) {
      return;
    } else if (parseInt(input.value) == 1 && identifier) {
      input.value = (parseInt(input.value) - 1).toString();
    } else if (parseInt(input.value) == 0 && identifier) {
      return;
    } else {
      input.value = (parseInt(input.value) - 1).toString();
    }
  }
  addTeacherTraining(false);
}

function generatePDF(param) {
  /**
   * @param param: used to differentiate between the action of sharing/ saving the pdf
   */
  if (param == "Save") {
    let pdfObject = jsPDFInvoiceTemplate.default(saveProps); //returns number of pages created
  } else if (param == "Send") {
    var base64 = jsPDFInvoiceTemplate.default(props); //returns number of pages created
    localStorage.setItem("pdfString", base64.dataUriString);
    window.location.replace("summary.html");
  }
}

function pdfTableGenerator() {
  return_table = [];
  temp = JSON.parse(localStorage.getItem("total_order"));
  for (let i = 0; i < temp.length; i++) {
    return_table.push([
      temp[i][0],
      temp[i][2],
      temp[i][1],
      temp[i][2] * temp[i][1],
    ]);
  }
  return return_table;
}

// jspdf generation
var saveProps = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: "Resolute Education Estimate for " + localStorage.getItem("name"),
  orientationLandscape: false,
  compress: true,
  logo: {
    src: "./public/img/res_logo_black.png",
    type: "PNG", //optional, when src= data:uri (nodejs case)
    width: 75, //aspect ratio = width/height
    height: 18,
    margin: {
      top: 5, //negative or positive num, from the current position
      left: 0, //negative or positive num, from the current position
    },
  },
  stamp: {
    inAllPages: true, //by default = false, just in the last page
    src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    type: "JPG", //optional, when src= data:uri (nodejs case)
    width: 20, //aspect ratio = width/height
    height: 20,
    margin: {
      top: 0, //negative or positive num, from the current position
      left: 0, //negative or positive num, from the current position
    },
  },
  business: {
    name: "Resolute Education",
    address: "2 The Aviary, 60 Glenwood Road, Lynnwood Glen",
    phone: "(+27) 067 609 0699",
    email: "info@resolute.education",
    email1: "xxyyzz@resolute.education",
    website: "www.resoluteeducation.com",
  },
  contact: {
    label: "Estimate issued for:",
    name: localStorage.getItem("name") + ", " + localStorage.getItem("school"),
    email: localStorage.getItem("email"),
  },
  invoice: {
    label: "Estimate #: ",
    num: "1",
    invGenDate: "Invoice Date: " + today.toString().slice(0, 15),
    headerBorder: false,
    tableBodyBorder: false,
    header: [
      {
        title: "Description",
        style: {
          width: 80,
        },
      },
      { title: "Price" },
      { title: "Quantity" },
      { title: "Total" },
    ],
    table: pdfTableGenerator(),
    additionalRows: [
      {
        col1: "Total:",
        col2: "145,250.50",
        col3: "ALL",
        style: {
          fontSize: 14, //optional, default 12
        },
      },
      {
        col1: "VAT:",
        col2: "20",
        col3: "%",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
      {
        col1: "SubTotal:",
        col2: "116,199.90",
        col3: "ALL",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
    ],
    invDescLabel: "",
    invDesc:
      "Our team will get in touch with you and your school shortly.\nThank you for choosing Resolute.",
  },
  footer: {
    text: "The invoice is created on a computer and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};

// jspdf localstorage
var props = {
  outputType: jsPDFInvoiceTemplate.OutputType.DataUriString,
  returnJsPDFDocObject: true,
  fileName: "Resolute Education Estimate for " + localStorage.getItem("name"),
  orientationLandscape: false,
  compress: true,
  logo: {
    src: "./public/img/res_logo_black.png",
    type: "PNG", //optional, when src= data:uri (nodejs case)
    width: 75, //aspect ratio = width/height
    height: 18,
    margin: {
      top: 5, //negative or positive num, from the current position
      left: 0, //negative or positive num, from the current position
    },
  },
  stamp: {
    inAllPages: true, //by default = false, just in the last page
    src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    type: "JPG", //optional, when src= data:uri (nodejs case)
    width: 20, //aspect ratio = width/height
    height: 20,
    margin: {
      top: 0, //negative or positive num, from the current position
      left: 0, //negative or positive num, from the current position
    },
  },
  business: {
    name: "Resolute Education",
    address: "2 The Aviary, 60 Glenwood Road, Lynnwood Glen",
    phone: "(+27) 067 609 0699",
    email: "info@resolute.education",
    email1: "xxyyzz@resolute.education",
    website: "www.resoluteeducation.com",
  },
  contact: {
    label: "Estimate issued for:",
    name: localStorage.getItem("name") + ", " + localStorage.getItem("school"),
    email: localStorage.getItem("email"),
  },
  invoice: {
    label: "Estimate #: ",
    num: "1",
    invGenDate: "Invoice Date: " + today.toString().slice(0, 15),
    headerBorder: false,
    tableBodyBorder: false,
    header: [
      {
        title: "Description",
        style: {
          width: 80,
        },
      },
      { title: "Price" },
      { title: "Quantity" },
      { title: "Total" },
    ],
    table: pdfTableGenerator(),
    additionalRows: [
      {
        col1: "Total:",
        col2: "145,250.50",
        col3: "ALL",
        style: {
          fontSize: 14, //optional, default 12
        },
      },
      {
        col1: "VAT:",
        col2: "20",
        col3: "%",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
      {
        col1: "SubTotal:",
        col2: "116,199.90",
        col3: "ALL",
        style: {
          fontSize: 10, //optional, default 12
        },
      },
    ],
    invDescLabel: "",
    invDesc:
      "Our team will get in touch with you and your school shortly.\nThank you for choosing Resolute.",
  },
  footer: {
    text: "The invoice is created on a computer and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};

// API Functionality

async function process(field) {
  /**
   * Used as a redirection function to make API calls
   * @param field: denotes the type of function to carry out
   */

  if (field == "loading") {
    // make API call
    makeApiCall();
  } else if (field == "done") {
    // take to summary page
  } else {
    // if errors, alert user? Probably no errors
    return;
  }
}

async function apiDataHandler(method) {
  /**
   * fetches data from url and sends it to FLASK
   * @param method: specifies the method of the API call
   */
  let newsletter_value = "";
  let package;
  // subscription to newsletter
  if (document.getElementById("newsletter_tick").checked) {
    newsletter_value = "Yes";
  } else {
    newsletter_value = "No";
  }

  console.log(total_order);
  // package selected??
  if (total_order.flat(2).findIndex((e) => e.includes("Package:")) != -1) {
    package = total_order
      .flat(2)
      [total_order.flat(2).findIndex((e) => e.includes("Package:"))].slice(
        9,
        total_order.flat(2)[
          total_order.flat(2).findIndex((e) => e.includes("Package:"))
        ].length
      )
      .toString();
  } else {
    package = "Not Selected";
  }

  // process phone number
  let phone_number = document.getElementById("phone").value;
  phone_number = phone_number.slice(
    phone_number.length - 9,
    phone_number.length
  );
  phone_number_processed = "+27" + phone_number;

  if (method == "GET") {
    return fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      _body: JSON.stringify({
        name:
          document.getElementById("first_name").value +
          " " +
          document.getElementById("last_name").value,
        designation: document.getElementById("position_school").value,
        school_name: document.getElementById("school").value,
        email: document.getElementById("email").value,
        phone: phone_number_processed,
        location: document.getElementById("location").value,
        newsletter: newsletter_value,
        package: package,
        total_order: total_order,
        cost: total_cost,
        pdf: localStorage.getItem("pdfString"),
      }),
      get body() {
        return this._body;
      },
      set body(value) {
        this._body = value;
      },
    });
  }
}

async function makeApiCall() {
  const api_data = await (await apiDataHandler("POST")).json();
  console.log(api_data);
  try {
    if (api_data.data == "received") {
      console.log('done \n process "DONE"');
    } else {
      console.log("error has occured");
    }
  } catch (e) {
    console.log("Error caught");
  }
}
