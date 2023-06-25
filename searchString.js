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
        
        getBookStats(currentBook);

        // how to remove line breaks and carriage returns and replace them with a br
        currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');
  
        document.getElementById("fileContent").innerHTML = currentBook;
  
        var newBook = document.getElementById("fileContent");
        newBook.scrollTop = 0;
  
      }
    };
  }
//   get the stats of the book
  function getBookStats(fileContent) {
    var bookLength = document.getElementById("bookLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");
  
    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDict = {};
    
    var unCommonWords = [];
    //filter out common words
    unCommonWords=filterStopWords(wordArray);

    // count every word in the word array
    for (let word in unCommonWords) {
        let wordValue=unCommonWords[word];
        if (wordDict[wordValue] > 0) {
            wordDict[wordValue] += 1;
         } else {
            wordDict[wordValue] = 1;
      }
    }
  
    // sort the array
    let wordList = sortProperties(wordDict);
  
    // return the top 5 words
    let top5words = wordList.slice(0, 6);
  
    // return the least 5 words
    let least5words = wordList.slice(-6, wordList.length);

    // Write the values to the page
    ulTemplate(top5words, document.getElementById('mostUsed'));
    ulTemplate(least5words, document.getElementById('leastUsed'));

    bookLength.innerText = "Book Length: " + text.length;
    wordCount.innerText = "Word Count: " + wordArray.length;

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

function getStopWords() {
    // Define your stop words list
    return ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];

  
    // Filter out stop words from the array
    // const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
  
    // return filteredWords;
  }

function filterStopWords(wordArray) {
    let commonWords = getStopWords();
    let commonObj = {};
    let unCommonArr = [];

    for(i=0; i<commonWords.length;i++){
        commonObj[commonWords[i].trim()]=true;
    }

    for(i=0; i<wordArray.length;i++){
        word= wordArray[i].trim().toLowerCase();
        if(!commonObj[word]){
            unCommonArr.push(word);
        }
    }
    return unCommonArr;
}

//highlight the words in search
function performMark() {

    //read the keyword
    var keyword = document.getElementById("keywords").value;
    var display = document.getElementById("fileContent");

    var newContent = "";

    //find all the currently marked items
    let spans = document.querySelectorAll('mark');

    //<mark>Alice</mark>

    for (var i = 0; i < spans.length; i++) {
        spans[i].outerHTML = spans[i].innerHTML;
    }

    var re = new RegExp(keywords, "gi");
    var replaceText = "<mark id='markme'>$&</mark>";
    var bookContent = display.innerHTML;

    //add the mark to the book content
    newContent = bookContent.replace(re, replaceText);

    display.innerHTML = newContent;
    var count = document.querySelectorAll('mark').length;
    document.getElementById("searchstat").innerHTML = "found " + count + " matches";

    if (count > 0) {
        var element = document.getElementById("markme");
        element.scrollIntoView();
    };
}

