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
let itemCount = localStorage.length
let itemArray
if (localStorage.getItem("itemArray") == null) {
    itemArray = []
}
else {
    let array = JSON.parse(localStorage.getItem("itemArray"))
    itemArray = array
}
$("#sellForm").submit(function (event) {
    event.preventDefault();
    let name = $("#name").val()
    let price = $("#price").val()
    let imageUrl = $("#image").val()
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
});
for (let i = 0; i < itemArray.length; i++) {
    let name = itemArray[i].name
    let price = itemArray[i].price
    let imageUrl = itemArray[i].url
    $("#content").append(`<div class='item'><img src='${imageUrl}' alt="Wrong source"><p>${name}</p><br>  <p class='price'>${price}$</p>`)    
}

