// ==UserScript==
// @name           Ebay Alerts
// @author         T. Knight
// @description    Highlights ebay listings matching certain criteria
// @version        2
// @include        /https?://www\.ebay\.com.*/
// ==/UserScript==

// Function that checks the auction listings
function getListings() {
    
    // Match keywords will go into the below variable
    // First column is the max price of the listing in dollars, so in this first match set, only matched listings equal to or under $200 will be highlighted
    // Second column is the color of the highlight. Written colors like "blue" are valid. Optionally, hexadecimal color codes can be used, like #ab3ab3, which is a dark purple. Hex color codes can be found at: http://www.color-hex.com/
    // Third columns and beyond are all the match keywords. There is no limit to the max number of keywords, or the max number of match sets.
    // Copy and paste one of the middle match sets and change the values to add more matches
    // The match set should have the following syntax: [max price, color, keyword1, keyword2, keyword3, ...],
    var matchText = [[200, "lightgreen", "roll", "rolls", "quarter", "quarters", "silver"],
                     [800, "cyan", "roll", "rolls", "dime", "dimes", "silver"],
                     [550, "teal", "roll", "rolls", "eagle", "troy", "american", "silver"],
                     [3000, "orange", "roll", "rolls", "australia", "australian", "kookaburra"],
                     [920, "#8cceff", "roll", "rolls", "troy", "canadian", "canada", "maple", "leaf"],
                     [1000, "#3df3df", "roll", "washington", "silver"]];
    
    var matchCount = 0;                                                     // This will count how many of the above keywords the post matches; if it's above 3, the post will be highlighted as having met the threshold for an alert
    var numListings = $('.lvtitle');                                        // Gets all the auction listings displayed on the page
    var numListPrice = $('.lvprice');                                       // Gets the price of each listing
    var threshold = 3;                                                      // This is the number of keywords that the listing should match before triggering an alert
    
    for(var i=0; i<numListings.length; i++) {                               // This loop runs through all the auction listings
        var thisPrice = parseFloat(numListPrice[i].innerText.substring(1, numListPrice[i].innerText.length).replace(/,/g, ''));
        for(var j=0; j < matchText.length; j++) {                           // This loops through all the match sets listed in matchText
            for(var k=2; k < matchText[j].length; k++) {                    // This loops through all the match keywords in each match set
                var matchRegex = new RegExp('(' + matchText[j][k] + ')', 'gi');    // Set up a regular expression with each keyword
                if(numListings[i].innerText.match(matchRegex)) {                // This compares each word in the listing's title to the keywords in the match set to see if any are a match
                    matchCount++;                                               // Increases the match count required to trigger an alert
                }
            }
            
            if(matchCount >= threshold && thisPrice < matchText[j][0]) {           // This checks if the threshold has been met to trigger an alert
            numListings[i].parentNode.style.backgroundColor = matchText[j][1];     // This highlights the auction listing
            }
        
            matchCount = 0;                                                     // Reset the matchCount to test the next auction listing
        }
    }
}

getListings();                                                              // Runs the function that checks the auction listings

function debugListings() { 
    var numListings = $('.lvtitle');
    var numListPrice = $('.lvprice');
    var thisPrice = parseFloat(numListPrice[i].innerText.substring(1, numListPrice[i].innerText.length).replace(/,/g, ''));
    
    for(var i=0; i<numListings.length; i++) {
        console.log(i + ": " + numListings[i].innerText +  " ==== " + thisPrice);   
    }
}

//debugListings();