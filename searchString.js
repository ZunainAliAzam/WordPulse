function loadBook(book, displayName) {
    let currentBook = "";
    let url = "books/" + book;
  
    // reset our UI
    document.getElementById("book").innerHTML = displayName;
    document.getElementById("searchstat").innerHTML = "";
    document.getElementById("keywords").value = "";
  
    // create a server request to load our book
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
  
    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        currentBook = request.responseText;
  
        // how to remove line breaks and carriage returns and replace them with a br
        currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');
  
        document.getElementById("fileContent").innerHTML = currentBook;
  
        var newBook = document.getElementById("fileContent");
        newBook.scrollTop = 0;
  
        getBookStats(currentBook);
      }
    };
  }
  
  function getBookStats(fileContent) {
    var bookLength = document.getElementById("bookLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");
  
    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDict = {};
  
    // count every word in the word array
    for (let word of wordArray) {
      if (wordDict[word] > 0) {
        wordDict[word] += 1;
      } else {
        wordDict[word] = 1;
      }
    }
  
    // sort the array
    let wordList = sortProperties(wordDict);
  
    // return the top 5 words
    let top5words = wordList.slice(0, 6);
  
    // return the least 5 words
    let least5words = wordList.slice(-6, wordList.length);
  
    ulTemplate(top5words, document.getElementById('mostUsed'));
    ulTemplate(least5words, document.getElementById('leastUsed'));
  }
  
  function sortProperties(wordDict) {
    // convert the dictionary into an array
    let rtnArray = Object.entries(wordDict);
  
    // sort the array
    rtnArray.sort(function (first, second) {
      return second[1] - first[1];
    });
  
    return rtnArray;
  }
  
  function ulTemplate(items, element) {
    let rowTemplate = document.getElementById("template-ul-items");
    let templateHTML = rowTemplate.innerHTML;
    let resultsHTML = "";
  
    for (let i = 0; i < items.length; i++) {
      resultsHTML += templateHTML.replace("{{val}}", items[i][0] + " : " + items[i][1] + " times");
    }
    element.innerHTML = resultsHTML;
  }
  