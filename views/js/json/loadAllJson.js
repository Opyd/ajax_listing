var xhttp = new XMLHttpRequest();
xhttp.open("GET", "/loadAllJson", true);
xhttp.send();

let json = null;
let cache = "";

function loadXML(b = 0) {
  if (this.readyState === 4 && this.status === 200) {
    let html = "";
    let producers = [];
    let categories = [];
    // Typical action to be performed when the document is ready:
    const container = document.getElementById("container");
    const selectProducers = document.getElementById("producer");
    const selectCategories = document.getElementById("category");
    let jsonData = JSON.parse(this.responseText);
    console.log(jsonData);
    json = jsonData;
    jsonData.forEach((val, index) => {
      html += `
                            <a id="${index}" onclick="test(${index})" class="group">
                            <div
                            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="${val.zdjecie}"
                             alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                             class="w-full h-full object-center object-cover group-hover:opacity-75">
                            </div>
                            <h1 class="mt-4 text-sm text-red-700 font-extrabold">${val.kategoria}</h1>
                            <h3 class="mt-4 text-sm text-gray-700">${val.producent}</h3>
                            <h2 class="mt-4 text-sm text-gray-700">${val.nazwa}</h2>
                            <p class="mt-1 text-lg font-medium text-gray-900">$ ${val.cena}</p>
                                `;
      producers.push(val.producent);
      categories.push(val.kategoria);
    });
    producers = [...new Set(producers)];
    categories = [...new Set(categories)];
    categories.forEach((val) => {
      selectCategories.innerHTML += `<option value='${val}'>${val}</option>`;
    });
    producers.forEach((val) => {
      selectProducers.innerHTML += `<option value='${val}'>${val}</option>`;
    });
    container.innerHTML = html;
    cache = html;
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
