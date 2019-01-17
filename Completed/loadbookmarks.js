
var myBooks = [];

function CreateTableFromJSON() {
    $.getJSON("bookmarks.json", function(data) {
        var table = $("#Table").empty();
        $.each(data, function (i, member) {
            table.append('<tr><td class="mdl-data-table__cell--non-numeric"><img src="' + member.icon +'"/><a href="' + member.url + '"> ' + member.title +'</a></td></tr>');
        });
    });
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        CreateTableFromJSON();
    }
});