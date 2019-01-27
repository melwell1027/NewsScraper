$("#scrapeButton").click(function () {
    $.ajax("/scrape", {
        type: "GET"
    }).then(
        function () {
            console.log("Scrape complete.")
            location.reload();
        }
    );
});

let addCommentModal = document.getElementById('addCommentModal');

let commentsModal = document.getElementById('commentsModal');

$(".addCommentButton").click(function () {
    const id = $(this).data("id");
    console.log(id);
    addCommentModal.style.display = "block";


    $(".close").click(function () {
        addCommentModal.style.display = "none";
    });

    $(".submitButton").click(function () {
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: {
                title: $(".commentTitle").val(),
                body: $(".commentBody").val(),
                article: id
            }
        }).then(function (data) {
            addCommentModal.style.display = "none";
            $(".commentTitle").val("");
            $(".commentBody").val("");
            location.reload();
        });
    });
});

$(".commentsButton").click(function () {
    const id = $(this).data("id2");
    console.log(this);
    $(".commentsDiv").empty();
    $.getJSON("/comments/" + id, function (data) {
        const commentsArr = data.comments
        for (let i = 0; i < commentsArr.length; i++) {
            $(".commentsDiv").append("<h5>" + commentsArr[i].title + "<h5>");
            $(".commentsDiv").append("<p>" + commentsArr[i].body + "</p>")
        }
    })
    commentsModal.style.display = "block";
    $(".close").click(function () {
        commentsModal.style.display = "none";
    });
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == addCommentModal) {
        addCommentModal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == commentsModal) {
        commentsModal.style.display = "none";
    }
}