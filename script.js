let itemCount = localStorage.length
let itemArray
if (localStorage.getItem("itemArray") == null) {
    itemArray = []
}
else {
    let array = JSON.parse(localStorage.getItem("itemArray"))
    itemArray = array
}
function loadDefaults() {
    $("#content").append(`
    <div class="item">
        <img src="https://m.media-amazon.com/images/I/81k55rfk1iL._AC_UL320_.jpg" alt="Wrong source">
        <p>Corsair RMx Series (2021), RM850x, 850 Watt, GOLD, Fully Modular Power Supply (CP-9020200-NA)</p><br>
        <span class="pB">
            <p class="price">249.99$</p>
        </span>
    </div>
    <div class="item">
        <img src="https://m.media-amazon.com/images/I/61jfK8LN2GL._AC_SX679_.jpg" alt="Wrong source">
        <p>Corsair QL Series, Ql140 RGB, 140mm RGB LED Fan, Dual Pack with Lighting Node Core - Black</p><br>
        <span class="pB">
            <p class="price">29.99$</p>
        </span>
    </div>
    <div class="item">
        <img src="https://m.media-amazon.com/images/I/61gW+HwhSRL._AC_SX679_.jpg" alt="Wrong source">
        <p>PNY GeForce® GT 710 2GB Single Fan Graphics Card</p><br>
        <span class="pB">
            <p class="price">34.99$</p>
        </span>
    </div>`);
}
reload()
$("#sellDiv").click(function () {
    $("#background").css("display", "block");
    $("#sellFormDiv").css("display", "flex");
    $(document).keydown(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == '27') {
            $("#background").css("display", "none");
            $("#sellFormDiv").css("display", "none");
        }
    });
});
$("#background").click(function () {
    $("#background").css("display", "none");
    $("#sellFormDiv").css("display", "none");
});
$("#price").change(function () {
    let amount = $("#price").val()
    if (amount.length >= 8) {
        amount = "9999999"
        $("#price").val(amount)
    }
    if (amount < 0) {
        amount = Math.abs(amount)
        $("#price").val(amount);
    }
});

$("#sellForm").submit(function (event) {
    event.preventDefault();
    let imgurl;
    let inputFileTag = document.getElementById("image")
    if (inputFileTag.files && inputFileTag.files[0]) {
        console.log(inputFileTag.files[0]);
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(inputFileTag.files[0]);
    }
    function imageIsLoaded(e) {
        localStorage.setItem("img", e.target.result);
        imgurl = e.target.result

        let name = $("#name").val()
        let price = $("#price").val()
        let imageUrl = imgurl
        let item = {
            name: name,
            price: price,
            url: imageUrl
        }
        itemArray.push(item)
        localStorage.setItem("itemArray", JSON.stringify(itemArray))
        alert("Item posted!")
        $("#background").css("display", "none");
        $("#sellFormDiv").css("display", "none");
        $("#name").val(null);
        $("#price").val(null);
        $("#image").val(null);
        document.location.reload()
        reload()
    };
});
function reload() {
    $("#content").empty();
    loadDefaults()
    for (let i = 0; i < itemArray.length; i++) {
        let name = itemArray[i].name
        let price = itemArray[i].price
        let imageUrl = itemArray[i].url
        $("#content").append(`<div class='item'>
        <img src='${imageUrl}' alt="Wrong source">
        <p>${name}</p><br>
        <span class="pB">
            <p class='price'>${price}$</p>
            <button class="removeBtn" id="${i}">Remove item</button>
        </span>`)
    }
}
$(".removeBtn").click(function () {
    let preDelItemId = $(this).attr("id")
    console.log(preDelItemId)
    itemArray.splice(preDelItemId, 1)
    localStorage.setItem("itemArray", JSON.stringify(itemArray))
    document.location.reload()
    reload()
});