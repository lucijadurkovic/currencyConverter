fetch("exchangerates.json")
  .then((response) => response.json())
  .then((json) => {
    for (let i = 0; i < json.length; i++) {
      // dodaje tablici redove i svakom redu ćelije
      let table = document.getElementsByTagName("table")[0];
      let newRow = document.createElement("tr");
      table.appendChild(newRow);

      //dodaje ćelije redu
      let object = json[i];

      for (const property in object) {
        let newData = document.createElement("td");
        newRow.appendChild(newData);
        newData.innerHTML = object[property];
      }
      let konvertiranaVrijednost = document.createElement("td");
      konvertiranaVrijednost.classList.add("converted");
      newRow.appendChild(konvertiranaVrijednost);

      // listi dodaje list iteme/valute
      let list = document.getElementsByTagName("ul")[0];
      let newItem = document.createElement("li");
      list.appendChild(newItem);
      newItem.innerHTML = json[i].valuta;

      let button = document.getElementsByClassName("dropbtn")[0];

      let handleClick = () => {
        button.innerHTML = json[i].valuta;
        let numToConvert = Number(
          document.getElementById("numToConvert").value
        );
        let initialRate = parseFloat(json[i].srednji_tecaj.replace(",", "."));
        let rateInHrk = numToConvert * initialRate;
        for (let j = 0; j < json.length; j++) {
          let conversionRate = parseFloat(
            json[j].srednji_tecaj.replace(",", ".")
          );
          let convertedValue = (rateInHrk / conversionRate).toFixed(2);
          let convertedValues = document.getElementsByClassName("converted");
          convertedValues[j].innerHTML = convertedValue + " " + json[j].valuta;
        }
      };

      let handleSubmit = (event) => {
        if (button.innerHTML !== "Odaberi") {
          event.preventDefault();
          let numToConvert = Number(
            document.getElementById("numToConvert").value
          );
          let initialRate = json.filter(
            (currency) => currency.valuta === button.innerHTML
          );
          let initialRateFormatted = parseFloat(
            initialRate[0].srednji_tecaj.replace(",", ".")
          );
          let rateInHrk = numToConvert * initialRateFormatted;
          for (let j = 0; j < json.length; j++) {
            let conversionRate = parseFloat(
              json[j].srednji_tecaj.replace(",", ".")
            );
            let convertedValue = (rateInHrk / conversionRate).toFixed(2);
            let convertedValues = document.getElementsByClassName("converted");
            convertedValues[j].innerHTML =
              convertedValue + " " + json[j].valuta;
          }
        }
      };

      newItem.addEventListener("click", handleClick);
      let form = document.getElementsByTagName("form")[0];
      form.addEventListener("submit", handleSubmit);
    }
  });
