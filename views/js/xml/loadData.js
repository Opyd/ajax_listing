function loadFilter() {
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

    let cars = xmlData.getElementsByTagName("car");
    html +=`<button onclick='back()' class="bg-green-300 rounded-lg col-span-full">Reset</button>`;
    for (let i = 0; i < cars.length; i++) {
      html += `
                            <a id="${i}" class="group"  onclick="test(${i})">
                            <div
                            class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                            <img src="${cars[i].getElementsByTagName("zdjecie")[0].childNodes[0].nodeValue}"
                             alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
                             class="w-full h-full object-center object-cover group-hover:opacity-75">
                            </div>
                            <h1 class="mt-4 text-sm text-red-700 font-extrabold">${
                              cars[i].getElementsByTagName("kategoria")[0].childNodes[0].nodeValue}</h1>
                            <h3 class="mt-4 text-sm text-gray-700">${
                              cars[i].getElementsByTagName("producent")[0].childNodes[0].nodeValue}</h3>
                            <h2 class="mt-4 text-sm text-gray-700">${
                              cars[i].getElementsByTagName("nazwa")[0].childNodes[0].nodeValue}</h2>
                            <p class="mt-1 text-lg font-medium text-gray-900">$ ${
                              cars[i].getElementsByTagName("cena")[0].childNodes[0].nodeValue}</p>
                           `;
    }

    container.innerHTML = html;
  }
}

window.addEventListener("load", () => {
  let filtr = document.getElementById("producerFiltr");
  let categoryFiltr = document.getElementById("categoryFiltr");
  filtr.addEventListener("click", () => {
    let producer = document.getElementById("producer").value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/loadProducer/${producer}`, true);
    xhttp.send();
    xhttp.onreadystatechange = loadFilter;
  });
  categoryFiltr.addEventListener("click", () => {
    let category = document.getElementById("category").value;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/loadCategory/${category}`, true);
    xhttp.send();
    xhttp.onreadystatechange = loadFilter;
  });
});
