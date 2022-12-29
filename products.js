const getJSONData = (key, value) => {
	localStorage.setItem(key, value);
};
let productsLS = "";
let productsData = "";
let currentProductsArray = [];
let minCost = undefined;
let maxCost = undefined;

fetch("./json-products.json")
	.then((respuesta) => respuesta.json())
	.then((productos) => {
		for (const product of productos) {
			getJSONData("listaProductos", JSON.stringify(productos));
			productsLS = localStorage.getItem("listaProductos");
			productsData = JSON.parse(productsLS);
			currentProductsArray = productsData;
			showProductsList();
		}

		function showProductsList() {
			let htmlContentToAppend = "";
			for (let i = 0; i < currentProductsArray.length; i++) {
				let product = currentProductsArray[i];

				if (
					(minCost == undefined ||
						(minCost != undefined && parseInt(product.cost) >= minCost)) &&
					(maxCost == undefined ||
						(maxCost != undefined && parseInt(product.cost) <= maxCost))
				) {
					htmlContentToAppend +=
						`<div class="col">
            <div class="card">
                <div class="comic-image text-center">
                    <img src="` +
						product.imgSrc +
						`" alt="` +
						product.description +
						`" class = "img-thumbnail">
                </div>
                <div class="card-details">
                    <h4><a href="#">` +
						product.productName +
						`</a></h4>
                    <p>` +
						product.description +
						`</p>
                    <div class="card-bottom-details d-flex justify-content-end">
                        <div class="card-cost">$` +
						product.cost +
						`</div>
                    </div>
                </div>
            </div>
        </div>`;
				}

				document.getElementById("prod-list-container").innerHTML =
					htmlContentToAppend;
			}
		}

		document.getElementById("sortAsc").addEventListener("click", function () {
			productsData.sort((a, b) => {
				if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
					return -1;
				}
				if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
					return 1;
				}
				return 0;
			});
			currentProductsArray = productsData;
			showProductsList();
		});

		document.getElementById("sortDesc").addEventListener("click", function () {
			document.getElementById("prod-list-container").innerHTML = "";
			let productsSortedDesc = productsData.sort((a, b) => {
				if (a.productName.toLowerCase() < b.productName.toLowerCase()) {
					return 1;
				}
				if (a.productName.toLowerCase() > b.productName.toLowerCase()) {
					return -1;
				}
				return 0;
			});
			currentProductsArray = productsSortedDesc;
			showProductsList();
		});

		document
			.getElementById("rangeFilterCost")
			.addEventListener("click", function () {
				minCost = document.getElementById("rangeFilterCostMin").value;
				maxCost = document.getElementById("rangeFilterCostMax").value;

				if (minCost != undefined && minCost != "" && parseInt(minCost) >= 0) {
					minCost = parseInt(minCost);
				} else {
					minCost = undefined;
				}

				if (maxCost != undefined && maxCost != "" && parseInt(maxCost) >= 0) {
					maxCost = parseInt(maxCost);
				} else {
					maxCost = undefined;
				}

				showProductsList();
			});

		document
			.getElementById("clearRangeFilter")
			.addEventListener("click", function () {
				document.getElementById("rangeFilterCostMin").value = "";
				document.getElementById("rangeFilterCostMax").value = "";

				minCost = undefined;
				maxCost = undefined;

				showProductsList();
			});
	});

// Notificaciones Toastify JS
const sortButtons = document.getElementsByClassName("btn-sort");

for (let i = 0; i < sortButtons.length; i++) {
	sortButtons[i].addEventListener("click", function () {
		Toastify({
			text: "¡Productos ordenados!",
			duration: 1500,
			grativy: "top",
			positionRight: true,
			backgroundColor: "#4caf50",
		}).showToast();
	});
}

document
	.getElementById("rangeFilterCost")
	.addEventListener("click", function () {
		if (minCost == undefined || maxCost == undefined) {
			Toastify({
				text: "Debes ingresar los valores en los campos para avanzar",
				duration: 1500,
				grativy: "top",
				positionRight: true,
				backgroundColor: "#FF1922",
			}).showToast();
		} else {
			Toastify({
				text:
					"Productos filtrados entre precios $" + minCost + " y $" + maxCost,
				duration: 1500,
				grativy: "top",
				positionRight: true,
				backgroundColor: "#4caf50",
			}).showToast();
		}
	});

document
	.getElementById("clearRangeFilter")
	.addEventListener("click", function () {
		Toastify({
			text: "Filtro limpiado",
			duration: 1500,
			grativy: "top",
			positionRight: true,
			backgroundColor: "#D3643B",
		}).showToast();
	});
