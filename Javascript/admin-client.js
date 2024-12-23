document.querySelector("#load-products").addEventListener("click", loadProducts);

function loadProducts() {
    console.log("Loading products!");

    fetch('/admin/api/products')
        .then(response => response.json())
        .then(products => {
            if (products.length === 0) {
                console.log("No products found!");
                return;
            }
            console.log("Fetched products:", products);
            updateProductTable(products);
        })
        .catch(error => {
            console.error("An error occured while fetching products :(", error);
        });
}

function updateProductTable(products) {
    const tbody = document.querySelector('#product-table-body');
    tbody.innerHTML = '';         // Clear the table

    products.forEach(product => {
        const tr = document.createElement('tr');

        const nameCell = createTableCell(product.name);
        const skuCell = createTableCell(product.sku);
        const priceCell = createTableCell(product.price + ' SEK');

        tr.appendChild(nameCell);
        tr.appendChild(skuCell);
        tr.appendChild(priceCell);

        tbody.appendChild(tr);
    });
}

function createTableCell(value) {
    const td = document.createElement('td');
    td.textContent = value;
    return td;
}
