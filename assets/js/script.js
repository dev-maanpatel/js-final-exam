
let products = JSON.parse(localStorage.getItem("products")) || [];
let editId = null;

function addProduct(){
    let title = document.getElementById("title").value.trim();
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let category = document.getElementById("category").value;

    if(title === "" || price === ""){
        alert("Title and price are required");
        return;
    }

    if(editId){
        let product = products.find(p => p.id === editId);
        product.title = title;
        product.price = price;
        product.image = image;
        product.category = category;
        editId = null;
    }else{
        let product = {
            id: Date.now(),
            title,
            price,
            image,
            category
        };
        products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));
    clearInputs();
    renderProducts();
}

function renderProducts(){
    let list = document.getElementById("productList");
    list.innerHTML = "";

    let search = document.getElementById("search").value.toLowerCase();
    let sort = document.getElementById("sort").value;
    let filter = document.getElementById("filter").value;

    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(search)
    );

    if(filter){
        filtered = filtered.filter(p => p.category === filter);
    }

    if(sort === "low"){
        filtered.sort((a,b)=>a.price-b.price);
    }
    if(sort === "high"){
        filtered.sort((a,b)=>b.price-a.price);
    }

    filtered.forEach(p=>{
        let div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
            <img src="${p.image || 'https://via.placeholder.com/300'}">
            <div class="card-body">
                <h3>${p.title}</h3>
                <p>${p.category || 'No Category'}</p>
                <p class="price">₹${p.price}</p>
                <div class="card-actions">
                    <button class="edit" onclick="editProduct(${p.id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${p.id})">Delete</button>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function editProduct(id){
    let p = products.find(x=>x.id===id);
    document.getElementById("title").value = p.title;
    document.getElementById("price").value = p.price;
    document.getElementById("image").value = p.image;
    document.getElementById("category").value = p.category;
    editId = id;
}

function deleteProduct(id){
    products = products.filter(p=>p.id!==id);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
}

function clearInputs(){
    document.getElementById("title").value="";
    document.getElementById("price").value="";
    document.getElementById("image").value="";
    document.getElementById("category").value="";
}

renderProducts();

