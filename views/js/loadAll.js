var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/loadAll", true);
xhttp.send();

function loadXML(b = 0) {
  if (this.readyState === 4 && this.status === 200) {
    let html = "";
    let producers = [];
    let categories = [];
    // Typical action to be performed when the document is ready:
    const container = document.getElementById("container");
    const selectProducers = document.getElementById("producer");
    const selectCategories = document.getElementById("category");
    let xmlData = this.responseXML;
    console.log(xmlData);
    if (b === 1) {
      xmlData = xmlData.reverse();
      console.log("KEACS");
    }
    let cars = xmlData.getElementsByTagName("car");
    for (let i = 0; i < cars.length; i++) {
      html += `
                            <a href="${i}" class="group">
                            <div
                            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="${
                              cars[i].getElementsByTagName("zdjecie")[0]
                                .childNodes[0].nodeValue
                            }"
                             alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                             class="w-full h-full object-center object-cover group-hover:opacity-75">
                            </div>
                            <h3 class="mt-4 text-sm text-gray-700">${
                              cars[i].getElementsByTagName("producent")[0]
                                .childNodes[0].nodeValue
                            }</h3>
                            <h2 class="mt-4 text-sm text-gray-700">${
                              cars[i].getElementsByTagName("nazwa")[0]
                                .childNodes[0].nodeValue
                            }</h2>
                            <p class="mt-1 text-lg font-medium text-gray-900">$ ${
                              cars[i].getElementsByTagName("cena")[0]
                                .childNodes[0].nodeValue
                            }</p>
                                `;
      producers.push(
        cars[i].getElementsByTagName("producent")[0].childNodes[0].nodeValue
      );
      categories.push(
        cars[i].getElementsByTagName("kategoria")[0].childNodes[0].nodeValue
      );
    }
    producers = [...new Set(producers)];
    categories = [...new Set(categories)];
    categories.forEach((val) => {
      selectCategories.innerHTML += `<option value='${val}'>${val}</option>`;
    });
    producers.forEach((val) => {
      selectProducers.innerHTML += `<option value='${val}'>${val}</option>`;
    });
    container.innerHTML = html;
  }
}

xhttp.onreadystatechange = loadXML;

window.onload = () => {
  let button = document.getElementById("priceSort");
  let container = document.getElementById("container");
  button.addEventListener("click", () => {
    for (let i = 0; i < container.childNodes.length; i++) {
      container.insertBefore(container.childNodes[i], container.firstChild);
    }
  });
};

function sortByPrice(data) {
  return data.reverse();
}
