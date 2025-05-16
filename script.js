document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const quotesList = document.getElementById('quotesList');
    const errorMessage = document.getElementById('errorMessage');
    
    let allQuotes = [];

    fetch('https://dummyjson.com/quotes ')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allQuotes = data.quotes;
            displayQuotes(allQuotes);
        })
        .catch(error => {
            errorMessage.textContent = 'Failed to load quotes. Please try again later.';
            console.error('Error fetching quotes:', error);
        });

    function displayQuotes(quotes) {
        quotesList.innerHTML = '';
        quotes.forEach(quote => {
            const li = document.createElement('li');
            li.textContent = quote.quote;
            quotesList.appendChild(li);
        });
    }

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredQuotes = allQuotes.filter(quote => 
            quote.quote.toLowerCase().includes(searchTerm)
        );
        displayQuotes(filteredQuotes);
    });
});