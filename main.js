// var url = "https://resolute-invoice-form.herokuapp.com/salesrequest";

// function process(state) {
//   if (state == "loading") {
//     updateMonday();
//   } else if (state == "done") {
//     document.getElementById("loading_bar").style.display = "none";
//     document.getElementById("sucess").style.display = "block";
//   } else if (state == "error") {
//     document.getElementById("loading_bar").style.display = "none";
//     document.getElementById("error").style.display = "block";
//   }
// }
// function redirect(url) {
//   //window.location.href = url;
// }

// async function sendDataToApi(method, url) {
//   // HTTP Request handler
//   if (method == "GET") {
//     return fetch(url, {
//       method: method, // POST, PUT, GET, DELETE
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } else {
//     return fetch(url, {
//       method: method, // POST, PUT, GET, DELETE
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: document.getElementById("name_field").value,
//         designation: document.getElementById("designation_field").value,
//         school_name: document.getElementById("school_field").value,
//         email: document.getElementById("email_field").value,
//         phone: document.getElementById("phone_field").value,
//         package: document.getElementById("package_selection").value,
//         Novice: document.getElementById("Novice_kits_field").value,
//         Apprentice: document.getElementById("Apprentice_kits_field").value,
//         Adept: document.getElementById("Adept_kits_field").value,
//         Beginner: document.getElementById("Beginner_kits_field").value,
//         Advanced: document.getElementById("Advanced_kits_field").value,
//         Master: document.getElementById("Master_kits_field").value,
//       }),
//     });
//   }
// }

// async function updateMonday() {
//   if (/*validate_fields() == */ true) {
//     try {
//       document.getElementById("sub_button").style.display = "none";
//       document.getElementById("questions").style.display = "none";
//       document.getElementById("loading_bar").style.display = "block";
//       const res = await (await sendDataToApi("POST", url)).json();
//       console.log(res);
//       if (res.data == "recieved") {
//         process("done");
//       } else {
//         process("error");
//       }
//     } catch (e) {
//       process("error");
//     }
//   } else {
//     alert("Please check all your fields!");
//   }
// }

// function validate_fields() {
//   var Novice = document.getElementById("Novice_kits_field").value;
//   var Apprentice = document.getElementById("Apprentice_kits_field").value;
//   var Adept = document.getElementById("Adept_kits_field").value;
//   var Beginner = document.getElementById("Beginner_kits_field").value;
//   var Advanced = document.getElementById("Advanced_kits_field").value;
//   var Master = document.getElementById("Master_kits_field").value;

//   if (
//     Novice == "" &&
//     Apprentice == "" &&
//     Adept == "" &&
//     Beginner == "" &&
//     Advanced == "" &&
//     Master == ""
//   ) {
//     return false;
//   } else {
//     if (document.getElementById("Novice_kits_field").value == "") {
//       document.getElementById("Novice_kits_field").value = "0";
//     }
//     if (document.getElementById("Apprentice_kits_field").value == "") {
//       document.getElementById("Apprentice_kits_field").value = "0";
//     }
//     if (document.getElementById("Adept_kits_field").value == "") {
//       document.getElementById("Adept_kits_field").value = "0";
//     }
//     if (document.getElementById("Beginner_kits_field").value == "") {
//       document.getElementById("Beginner_kits_field").value = "0";
//     }
//     if (document.getElementById("Advanced_kits_field").value == "") {
//       document.getElementById("Advanced_kits_field").value = "0";
//     }
//     if (document.getElementById("Master_kits_field").value == "") {
//       document.getElementById("Master_kits_field").value = "0";
//     }
//   }
//   if (
//     document.getElementById("name_field").value == "" ||
//     document.getElementById("designation_field").value == "" ||
//     document.getElementById("school_field").value == "" ||
//     document.getElementById("email_field").value == "" ||
//     document.getElementById("phone_field").value == ""
//   ) {
//     return false;
//   } else {
//     return true;
//   }
// }

// var novice_plus;
// var novice_minus;
// var novice_cart;

// if (document.readyState === "complete") {
//   novice_plus = document.getElementById("plus_Novice Stream");
//   novice_minus = document.getElementById("minus_Novice Stream");
//   novice_cart = document.getElementById("Add_Novice Stream");
// }

// // document.addEventListener("DOMContentLoaded", function () {});

// novice_plus.addEventListener("click", () => {
//   console.log("plus");
// });
// novice_minus.addEventListener("click", () => {
//   console.log("minus");
// });
// novice_cart.addEventListener("click", () => {
//   console.log("cart");
// });

var total_order = [];
// [title, quantity, price, identifier]
var package_selected = false;
var teacher_online = 6900;
var teacher_person = 13800;
var today = new Date();

var cont = false;

// [Novice, Apprentice, Adept, Beginner, Advanced, Master]
var product_array = [2300, 2415, 2530, 2645, 2875, 3450];

// keeps track of streams selected, saves inefficiency of iterating through entire cart
var stream_tracker = [];
var teacher_training = [];
function updateQuantity(button_id) {
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
    document.getElementById("cart_counter").innerHTML = getCartCount();
    document.getElementById("total_price").innerHTML =
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
    document.getElementById("cart_counter").innerHTML = getCartCount();
    document.getElementById("total_price").innerHTML =
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

  switch (title) {
    case "Novice Stream":
      price = product_array[0];
      break;
    case "Apprentice Stream":
      price = product_array[1];
      break;
    case "Adept Stream":
      price = product_array[2];
      break;
    case "Beginner Stream":
      price = product_array[3];
      break;
    case "Advanced Stream":
      price = product_array[4];
      break;
    case "Master Stream":
      price = product_array[5];
      break;
  }
  displayModal("success", input, title);
  var temp = [title, input.value, price.toString(), "stream"];
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
  if (stream_tracker.indexOf(title.slice(0, title.indexOf(" "))) === -1) {
    stream_tracker.push(title.slice(0, title.indexOf(" ")));
  }
  console.log(total_order);
  document.getElementById("cart_counter").innerHTML = getCartCount();
  document.getElementById("total_price").innerHTML =
    "R " + getCartTotal(total_order);
  trainingCounter();
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

function trainingCounter() {
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
  document.getElementById("teacher_stream_identifier").innerHTML =
    "Streams Selected:";
  document.getElementById("teacher_training_streams").innerHTML = return_string;
  tableFieldEditor("stream");
}

function tableFieldEditor(identifier) {
  /**
   * Modifies the teacher training modal to only show selected streams
   */
  if (identifier == "stream") {
    for (let i = 0; i < stream_tracker.length; i++) {
      switch (stream_tracker[i]) {
        case "Novice":
          document.getElementById("teacher_novice").style.display = "table-row";
          break;
        case "Apprentice":
          document.getElementById("teacher_apprentice").style.display =
            "table-row";
          break;
        case "Adept":
          document.getElementById("teacher_adept").style.display = "table-row";
          break;
        case "Beginner":
          document.getElementById("teacher_beginner").style.display =
            "table-row";
          break;
        case "Advanced":
          document.getElementById("teacher_advanced").style.display =
            "table-row";
          break;
        case "Master":
          document.getElementById("teacher_master").style.display = "table-row";
          break;
      }
    }
  } else if (identifier == "cart") {
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
  addTeacherTraining(false);
}

function addTeacherTraining(param) {
  var toggle = document.getElementById("toogleA");
  var total = 0;
  let cart = [];

  for (let i = 0; i < stream_tracker.length; i++) {
    let stream_name = stream_tracker[i].toLowerCase();
    let stream_name_input = "input_teacher_" + stream_name;
    if (!toggle.checked) {
      total +=
        parseInt(document.getElementById(stream_name_input).value) *
        teacher_online;
      cart.push([
        stream_tracker[i] + " Training",
        document.getElementById(stream_name_input).value,
        teacher_online.toString(),
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
        "person training",
      ]);
    }
  }
  // if we just need to add up total
  if (!param) {
    let total_price = document.getElementById("CardUnitPrice");
    total_price.innerHTML = "Total price: R " + getCartTotal(total.toString());
  }
  //add the total to the cart
  else {
    total_order.push(cart.flat(2));
    document.getElementById("cart_counter").innerHTML = getCartCount();
    document.getElementById("total_price").innerHTML =
      "R " + getCartTotal(total_order);
  }
}

function updateQuantityTraining(button_id, identifier = false) {
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

function cart_view() {
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
    document.getElementById("CartUnitPrice").style.display = "block";

    for (let i = 0; i < total_order.length; i++) {
      table_body.innerHTML += `<tr
    class="bg-white bg-opacity-20 border-b transition duration-300 ease-in-out"
  >
    <td
      class="px-6 py-4 whitespace-nowrap text-sm font-light text-grey-900"
    >
      ${total_order[i][0]}
    </td>
    <td
      class="text-sm text-grey-900 font-light px-6 py-4 whitespace-nowrap"
    >
      <div class="flex justify-center">
        <button
          class="w-10 h-10 mr-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
          id="${"minus_" + total_order[i][0] + "cart"}"
          onclick="updateQuantityCart(id)"
        >
          -
        </button>
        <input
          type="text"
          value="${total_order[i][1]}"
          class="w-10 text-center"
          id="${"input_" + total_order[i][0] + "cart"}"
        />
        <button
          class="w-10 h-10 ml-3 rounded-full text-lg uppercase font-bold cursor-pointer tracking-wide border-2 border-gray-600 hover:bg-gray-700 hover:text-white hover:border-white transition ease-out duration-150"
          id="${"plus_" + total_order[i][0] + "cart"}"
          onclick="updateQuantityCart(id)"
        >
          +
        </button>
      </div>
    </td>
    <td
      class="text-sm text-grey-900 font-light px-6 py-4 whitespace-nowrap"
    >
      ${"R " + getCartTotal(total_order[i][2].toString())}
    </td>
    <td>
    <button id="${"remove_" + total_order[i][0]}"
    class="cursor-pointer tracking-wide hover:text-red-600 transition ease-out duration-150"
    onclick="deleteCartItem(id)"
    >
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
    </td>
  </tr>`;
    }

    document.getElementById("CartUnitPrice").innerHTML =
      "Cart Total: R " + getCartTotal(total_order);
  }
  document.getElementById("cart_counter").innerHTML = getCartCount();
  if (total_order.length == 0) {
    document.getElementById("total_price").innerHTML = "R 0";
  } else {
    document.getElementById("total_price").innerHTML =
      "R " + getCartTotal(total_order);
  }
}

function updateQuantityCart(button_id) {
  /**
   * Updates the quantity of the products present in the cart and calculates total value.
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
    if (parseInt(input.value) == 1) {
      return;
    } else {
      input.value = (parseInt(input.value) - 1).toString();
    }
  }

  /**
   * TODO:
   * Add up the items in the cart view to display potential total at the bottom of modal.
   * Update cart total at the bottom when the quantity buttons are clicked.
   * Call getCartTotal when the continue/update button is clicked.
   */

  document.getElementById("update_cart_card").innerHTML = "update";
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

  if (inputIdString.slice(0, 7)) {
    package_selected = false;
  }

  for (let i = 0; i < total_order.length; i++) {
    if (total_order[i][0] == inputIdString) {
      total_order.splice(i, 1);
      cart_view();
      break;
    }
  }
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

function submitForm() {
  var first = document.getElementById("first_name").value;
  var last = document.getElementById("last_name").value;
  var school = document.getElementById("school").value;
  var province = document.getElementById("province").value;
  var email = document.getElementById("email").value;
  var training = false;

  localStorage.setItem("name", toString(first + " " + last));
  localStorage.setItem("school", toString(school));
  localStorage.setItem("province", toString(province));
  localStorage.setItem("email", toString(email));

  console.log(
    localStorage.getItem("name"),
    localStorage.getItem("school"),
    localStorage.getItem("province")
  );

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
    document
      .getElementById("submit-button")
      .setAttribute("data-bs-toggle", "modal");
    document
      .getElementById("submit-button")
      .setAttribute("data-bs-target", "#error_modal");
    document.getElementById("submit-button").removeAttribute("form");
    document.getElementById("submit-button").removeAttribute("type");
    document.getElementById("error-modal-message").innerHTML = str;
    // force the first modal pop-up
    document.getElementById("submit-button").click();
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
    document.getElementById("submit-button").removeAttribute("data-bs-toggle");
    document.getElementById("submit-button").removeAttribute("data-bs-target");
    document
      .getElementById("submit-button")
      .setAttribute("form", "contact_form");
    document.getElementById("submit-button").setAttribute("type", "submit");
    window.location = "./summary.html";
  } else if (cont) {
    console.log("pppp");
    console.log("hhihih");
    document.getElementById("submit-button").removeAttribute("data-bs-toggle");
    document.getElementById("submit-button").removeAttribute("data-bs-target");
    document
      .getElementById("submit-button")
      .setAttribute("form", "contact_form");
    document.getElementById("submit-button").setAttribute("type", "submit");
  }
}

function setContinue() {
  cont = true;
  setTimeout(submitForm(), 500);
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

function generatePDF() {
  var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
  console.log(today.toString().slice(0, 15));
}

// jspdf generation
var props = {
  outputType: jsPDFInvoiceTemplate.OutputType.Save,
  returnJsPDFDocObject: true,
  fileName: "Test Invoice 2022",
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
    label: "Invoice issued for:",
    name: localStorage.getItem("name") + ", " + localStorage.getItem("school"),
    email: localStorage.getItem("email"),
  },
  invoice: {
    label: "Invoice #: ",
    num: "xx",
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
      { title: "Unit" },
      { title: "Total" },
    ],
    table: Array.from(Array(10), (item, index) => [
      "Streams, Packages, Trainings ",
      200.5,
      4.5,
      "m2",
      400.5,
    ]),
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
    invDescLabel: "Invoice Note",
    invDesc:
      "Our team will get in touch with you and your school shortly.\nThank you for choosing Resolute.",
  },
  footer: {
    text: "The invoice is created on a computer and is valid without the signature and stamp.",
  },
  pageEnable: true,
  pageLabel: "Page ",
};
