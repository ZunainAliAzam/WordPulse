// load a book from the database
function loadBook(book,displayName) {
    let currentBook = "";
    let url="books/"+ book;

    // reser our UI
    document.getElementById("book").innerHTML=displayName;
    document.getElementById("searchstat").innerHTML="";
    document.getElementById("keywords").value="";

    // create a server request to load our book
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();

    request.onreadystatechange = function(){
        if(request.readyState==4 && request.status==200){
            currentBook = request.responseText;

            document.getElementById("fileContent").innerHTML=currentBook;
            
            var newBook = document.getElementById("fileContent");
            newBook.scrollTop = 0;
        }
    }
}