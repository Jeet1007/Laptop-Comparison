const puppeteer = require('puppeteer');
const fs = require('fs');

// Function to handle cookies window
async function handleCookiesPopup(page) {
    const cookiesButton = await page.$('#sp-cc-accept');
    if (cookiesButton) {
        await cookiesButton.click();
    }
}

// Function to get technical details from product page
async function getProductDetails(url) {
    console.log(`Getting technical details for ${url}`);

    // Launch a new browser for product details
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: {
            width: 390,
            height: 844,
            isMobile: true
        }
    });

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');

    try {
        // Navigate to the URL
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
        await handleCookiesPopup(page);

        // Perform the scraping
        const technicalDetails = await page.evaluate(() => {
            const details = {};

            // Get technical specifications
            const techSpecRows = document.querySelectorAll('#productDetails_techSpec_section_1 tr');
            if (techSpecRows && techSpecRows.length > 0) {
                techSpecRows.forEach(row => {
                    const key = row.querySelector('th')?.innerText.trim();
                    let value = row.querySelector('td')?.innerText.trim();
                    if (key && value) {
                        value = value.replace(/\u200E/g, ''); // Remove special characters
                        details[key] = value;
                    }
                });
            }

            return details;
        });

        // Get product images
        const imageLinks = await page.evaluate(() => {
            const elements = document.querySelectorAll('.a-carousel-viewport.a-gesture.a-gesture-horizontal li[data-csa-c-media-type="IMAGE"]');
            return Array.from(elements).map(element => {
                const id = element.getAttribute('data-csa-c-element-id');
                return id ? `https://m.media-amazon.com/images/I/${id}._SL1500_.jpg` : null;
            }).filter(link => link !== null);
        });

        // Add image links to the technical details
        technicalDetails.imageLinks = imageLinks;

        // Close the browser
        await browser.close();

        return technicalDetails;
    } catch (error) {
        console.error(`Error getting details for ${url}: ${error.message}`);
        await browser.close();
        return { error: error.message };
    }
}

async function scrapeAmazon() {
    // Main scraping browser
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    const cardData = [];

    try {
        // Initial Amazon search URL for laptops
        const url = "https://www.amazon.in/s?i=computers&rh=n%3A1375424031%2Cp_123%3A110955%257C219979%257C240067%257C241862%257C247341%257C308445%257C378555%257C391242&dc&qid=1746464279&rnid=91049095031&xpid=8-y8VezqgPhL7&ref=sr_pg_1";

        // Recursive function to scrape multiple pages
        async function scrapePage(url, currentPage = 1, scrapeToPage = null) {
            console.log(`Scraping page ${currentPage}...`);

            if (scrapeToPage !== null && currentPage > scrapeToPage) {
                return;
            }

            // Navigate to the URL
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            await handleCookiesPopup(page);
            await page.waitForSelector('.s-widget-container');

            // Extract basic product information
            const pageCardData = await page.evaluate(() => {
                const cards = Array.from(document.querySelectorAll('.s-widget-container'));

                return cards.map(card => {
                    // Product name
                    const productName = card.querySelector('h2')?.textContent.trim();

                    // Skip if no product name
                    if (!productName) return null;

                    // Product link
                    const productLinkElement = card.querySelector('h2 a') || card.querySelector('a.a-link-normal');
                    let productLink = "N/A";
                    let productId = "unknown";
                    let cleanProductLink = "N/A";

                    if (productLinkElement) {
                        productLink = productLinkElement.href;
                        const asinMatch = productLink.match(/\/dp\/([A-Z0-9]+)/);
                        productId = asinMatch ? asinMatch[1] : "unknown";

                        if (productId !== "unknown") {
                            cleanProductLink = `https://www.amazon.in/dp/${productId}/`;
                        }
                    }

                    // Other product details
                    const sponsoredTag = card.querySelector('.puis-sponsored-label-text');
                    const sponsored = sponsoredTag ? "yes" : "no";

                    const badgeElement = card.querySelector('span.a-badge-label-inner');
                    const badge = badgeElement ? badgeElement.textContent : "N/A";

                    const priceElement = card.querySelector('.a-price .a-offscreen');
                    const price = priceElement ? priceElement.textContent : "N/A";

                    const basePriceElement = card.querySelector('span.a-price.a-text-price > span.a-offscreen');
                    const basePrice = basePriceElement ? basePriceElement.textContent : "N/A";

                    const ratingElement = card.querySelector('span.a-icon-alt');
                    const decimalRegex = /^\d+([,.]\d+)?$/;
                    const ariaLabel = ratingElement ? ratingElement.textContent.trim() : "N/A";
                    const firstThreeCharacters = typeof ariaLabel === 'string' ? ariaLabel.substring(0, 3) : '';
                    const rating = decimalRegex.test(firstThreeCharacters) ? firstThreeCharacters.replace(',', '.') : "N/A";

                    const ratingsNumberElement = card.querySelector('span.a-size-base.s-underline-text');
                    const ratingsNumber = ratingsNumberElement ? ratingsNumberElement.textContent.trim() : "N/A";

                    const boughtPastMonthElement = card.querySelector('.a-size-base .a-color-secondary');
                    const textContent = boughtPastMonthElement ? boughtPastMonthElement.textContent : "N/A";
                    const plusSignRegex = /\b.*?\+/;
                    const plusSignText = textContent.match(plusSignRegex);
                    const boughtPastMonth = plusSignRegex.test(plusSignText) ? plusSignText[0] : "N/A";

                    return {
                        productName,
                        productLink,
                        cleanProductLink,
                        productId,
                        sponsored,
                        badge,
                        price,
                        basePrice,
                        rating,
                        ratingsNumber,
                        boughtPastMonth
                    };
                }).filter(card => card !== null);
            });

            // Add to main data array
            cardData.push(...pageCardData);

            // Check for next page
            if (scrapeToPage === null || currentPage < scrapeToPage) {
                const nextPageButton = await page.$('.s-pagination-next');
                if (nextPageButton) {
                    const isDisabled = await page.evaluate(btn => btn.getAttribute('aria-disabled') === 'true', nextPageButton);
                    if (!isDisabled) {
                        const nextPageUrl = await page.evaluate(nextBtn => nextBtn.href, nextPageButton);
                        console.log('Next Page URL:', nextPageUrl);
                        await scrapePage(nextPageUrl, currentPage + 1, scrapeToPage);
                    } else {
                        console.log(`All available pages scraped: ${currentPage}`);
                    }
                } else {
                    console.log(`All available pages scraped: ${currentPage}`);
                }
            }
        }

        // Start scraping from first page
        await scrapePage(url, 1, 2); // Limiting to 2 pages for testing, change to null for all pages

        console.log('Basic scraping finished. Found', cardData.length, 'products');

        // Filter products with valid cleanProductLink
        const validProducts = cardData.filter(product => product.cleanProductLink !== "N/A");
        console.log(`${validProducts.length} products have valid clean product links`);

        // Get technical details for each valid product
        const enhancedData = [];

        for (let i = 0; i < validProducts.length; i++) {
            const product = validProducts[i];
            console.log(`Processing product ${i + 1}/${validProducts.length}: ${product.productName}`);

            try {
                // Get technical details
                const technicalDetails = await getProductDetails(product.cleanProductLink);

                // Merge data
                const enhancedProduct = {
                    ...product,
                    technicalDetails
                };

                enhancedData.push(enhancedProduct);

                // Save progress after each product
                fs.writeFileSync('scrapedData.json', JSON.stringify(enhancedData, null, 2), 'utf8');
                console.log(`Progress saved: ${i + 1}/${validProducts.length}`);

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error(`Error processing product ${product.productName}: ${error.message}`);
            }
        }

        console.log('All processing complete. Saved to scrapedData.json');
    } catch (error) {
        console.error('Scraping error:', error);
    } finally {
        await browser.close();
    }
}

// Run the scraper
scrapeAmazon();