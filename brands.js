document.addEventListener('DOMContentLoaded', function() {
    const CLIENT_ID = "YOUR_CLIENT_ID_HERE";
    
    const searchInput = document.getElementById('brand-search');
    const resultsContainer = document.getElementById('search-results');
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');
    const selectedContainer = document.getElementById('brands-grid');
    const completeView = document.getElementById('complete-view');
    const selectedCount = document.getElementById('selected-count');
    
    let selectedBrands = [];
    let searchTimeout;
    
    function debounce(func, delay) {
        return function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(func, delay);
        };
    }
    
    loadingIndicator.style.display = 'none';
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        debounce(function() {
            if (query.length > 1) {
                searchBrands(query);
            } else {
                resultsContainer.innerHTML = '';
                resultsContainer.style.display = 'none';
            }
        }, 500)();
    });
    
    async function searchBrands(query) {
        if (!query) return;
        
        loadingIndicator.style.display = 'flex';
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';
        
        try {
            const response = await fetch(`https://api.brandfetch.io/v2/search/${encodeURIComponent(query)}?c=${CLIENT_ID}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            const data = await response.json();
            displayResults(data);
        } catch (err) {
            console.error("Error fetching brand data:", err);
            errorMessage.textContent = 'Error searching for brands. Please try again later.';
            errorMessage.style.display = 'block';
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    
    function displayResults(results) {
        resultsContainer.innerHTML = '';
        
        if (!results || results.length === 0) {
            resultsContainer.innerHTML = '<div class="brands__no-results">No brands found</div>';
            resultsContainer.style.display = 'block';
            return;
        }
        
        results.forEach(brand => {
            const resultItem = document.createElement('div');
            resultItem.className = 'brands__result-item';
            
            resultItem.innerHTML = `
                ${brand.icon ? `<img src="${brand.icon}" alt="${brand.name} logo" class="brands__result-logo">` : ''}
                <div class="brands__result-info">
                    <div class="brands__result-name">${brand.name}</div>
                    <div class="brands__result-domain">${brand.domain}</div>
                </div>
            `;
            
            resultItem.addEventListener('click', () => {
                selectBrand(brand);
            });
            
            resultsContainer.appendChild(resultItem);
        });
        
        resultsContainer.style.display = 'block';
    }
    
    function selectBrand(brand) {
        if (selectedBrands.length >= 3) return;
        
        if (!selectedBrands.some(b => b.domain === brand.domain)) {
            selectedBrands.push(brand);
            updateSelectedBrands();
        }
        
        searchInput.value = '';
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        
        if (selectedBrands.length === 3) {
            showCompleteView();
        }
    }
    
    function updateSelectedBrands() {
        selectedContainer.innerHTML = '';
        selectedCount.textContent = selectedBrands.length;
        
        selectedBrands.forEach(brand => {
            const brandCard = document.createElement('div');
            brandCard.className = 'brands__card';
            
            brandCard.innerHTML = `
                ${brand.icon ? `<img src="${brand.icon}" alt="${brand.name} logo" class="brands__card-logo">` : ''}
                <h4 class="brands__card-name">${brand.name}</h4>
                <p class="brands__card-domain">${brand.domain}</p>
                <a href="https://${brand.domain}" target="_blank" rel="noopener noreferrer" class="brands__card-link">Visit Website</a>
            `;
            
            if (selectedBrands.length < 3) {
                const removeButton = document.createElement('button');
                removeButton.className = 'brands__card-remove';
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    removeBrand(brand.domain);
                });
                
                brandCard.appendChild(removeButton);
            }
            
            selectedContainer.appendChild(brandCard);
        });
    }
    
    function removeBrand(domain) {
        selectedBrands = selectedBrands.filter(brand => brand.domain !== domain);
        updateSelectedBrands();
        
        if (selectedBrands.length < 3) {
            completeView.classList.add('hidden');
        }
    }
    
    function showCompleteView() {
        completeView.classList.remove('hidden');
        searchInput.disabled = true;
    }
});