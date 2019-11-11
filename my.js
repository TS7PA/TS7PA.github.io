function updatePrice()
{
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let q;
  q = parseInt(document.calk.quantity.value);
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
}
  // Скрываем или показываем радиокнопки.
  let radioDiv = document.getElementById("radios");
  if(select.value=="1")
  {
    radioDiv.style.display ="none";
  }
  if(select.value=="2")
  {
    radioDiv.style.display ="block";
  }
  if(select.value=="3")
  {
    radioDiv.style.display ="none";
  }

  // Смотрим какая товарная опция выбрана.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    if (radio.checked) {
      let optionPrice = prices.prodOptions[radio.value];
      if (optionPrice !== undefined) {
        price += optionPrice;
      }
    }
  });

  // Скрываем или показываем чекбоксы.
  let checkDiv = document.getElementById("checkboxes");
  if(select.value=="1")
  {
    checkDiv.style.display ="none";
  }
  if(select.value=="2")
  {
    checkDiv.style.display ="none";
  }
  if(select.value=="3")
  {
    checkDiv.style.display ="block";
  }
  // Смотрим какие товарные свойства выбраны.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      let propPrice = prices.prodProperties[checkbox.name];
      if (propPrice !== undefined) {
        price += propPrice;
      }
    }
  });

  let prodPrice = document.getElementById("out");
  prodPrice.innerHTML =q*price + " рублей";
}
function getPrices()
{
  return {
    prodTypes: [777, 666, 888],
    prodOptions: {
      option1: 111,
      option2: 222,
    },
    prodProperties: {
      prop1: 333,
    }
  };
}
function rb(){
  var ele = document.getElementsByName("prodOptions");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
}
function rch(){
  var ele = document.getElementsByName("prop1");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
}
window.addEventListener("DOMContentLoaded", function (event)
{
  // Находим select по имени в DOM.
  let s = document.getElementsByName("prodType");
  let select = s[0];
  // Назначаем обработчик на изменение select.
  select.addEventListener("change", function(event) {
    rb();
    rch();
    updatePrice();
  });
  // обработчик ввода
  document.calk.quantity.addEventListener("input", updatePrice);
  // Назначаем обработчик радиокнопок.
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      updatePrice();
    });
  });

    // Назначаем обработчик чекбоксов.
  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      updatePrice();
    });
  });

  updatePrice();
});