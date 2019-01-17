//Initializing the components
var ById = function (id) {
    return document.getElementById(id);
}

var path = require('path');
var uuid = require('uuid');
var jsonfile = require('jsonfile');
var bookmarks = path.join(__dirname, 'bookmarks.json');
var bookmarkspage = path.join(__dirname, 'bookmarks.html');
var tirexGame = path.join(__dirname, 'tirex.html');

var back = ById('back'),
    forward = ById('forward'),
    refresh = ById('refresh'),
    omni = ById('omnibox1'),
    dev = ById('console'),
    fave = ById('fave'),
    list = ById('list'),
    homes = ById('homes'),
    view = ById('view');


//Navigation Functions
function reloadView () {
    view.reload();
}

function backView () {
    view.goBack();
}

function forwardView () {
    view.goForward();
}

function homeView () {
    view.loadURL('https://www.google.com/');
}


//Load URL from the textbox
function updateURL (event) {
    if (event.keyCode === 13) {
        omni.blur();
        let val = omni.value;
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            view.loadURL(val);

        } else if (http === 'http://') {
            view.loadURL(val);
        } else {
            view.loadURL('http://'+ val);
        }
    }
}


//Loading Status
function loadstart (event) {
    omni.value = "  Loading...";
    omni.style.backgroundColor = "#fff";
}

//Show URL of the web page
function updateNav (event) {
    omni.value = "  " + view.src;
}

//Load DevTools
function handleDevtools () {

    if (view.isDevToolsOpened()) {
        view.closeDevTools();
    } else {
        view.openDevTools();
    }
}

//Add a bookmark
var Bookmark = function (id, url, faviconUrl, title) {
    this.id = id;
    this.url = url;
    this.icon = faviconUrl;
    this.title = title;
}

function addBookmark () {
    let url = view.src;
    let title = view.getTitle();
    let fav1 = "https://s2.googleusercontent.com/s2/favicons?domain_url=" + url
    let booktag = new Bookmark(uuid.v1(), url, fav1, title);
    jsonfile.readFile(bookmarks, function(err, books) {
        books.push(booktag);
        jsonfile.writeFile(bookmarks, books, function (err) {

        });
    });

}

//Go to Bookmarks page
function gotoBookmarks () {
    view.loadURL(bookmarkspage);
}

//Load Tirex game when failed to load
function gotoGame () {
    view.loadURL(tirexGame);
}

//Event Listeners
refresh.addEventListener('click', reloadView);
back.addEventListener('click', backView);
forward.addEventListener('click', forwardView);
omni.addEventListener('keydown', updateURL);
view.addEventListener('did-start-loading', loadstart)
view.addEventListener('did-finish-load', updateNav);
view.addEventListener('did-fail-load', gotoGame);
homes.addEventListener('click', homeView);
fave.addEventListener('click', addBookmark);
list.addEventListener('click', gotoBookmarks);
dev.addEventListener('click', handleDevtools);

