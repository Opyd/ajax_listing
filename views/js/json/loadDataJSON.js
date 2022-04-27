function loadFilter() {
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

        jsonData.forEach((val, index) => {
            html += `
                            <a href="${index}" class="group">
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
        });
        container.innerHTML = html;
    }
}

window.addEventListener("load", () => {
    let filtr = document.getElementById("producerFiltr");
    let categoryFiltr = document.getElementById("categoryFiltr");
    filtr.addEventListener("click", () => {
        let producer = document.getElementById("producer").value;
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `/loadProducerJSON/${producer}`, true);
        xhttp.send();
        xhttp.onreadystatechange = loadFilter;
    });
    categoryFiltr.addEventListener("click", () => {
        let category = document.getElementById("category").value;
        let xhttp = new XMLHttpRequest();
        xhttp.open("GET", `/loadCategoryJSON/${category}`, true);
        xhttp.send();
        xhttp.onreadystatechange = loadFilter;
    });
});
