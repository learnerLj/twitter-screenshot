// ==UserScript==
// @name         Twitter Screenshot Button
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Add a screenshot button to Twitter/X post menus
// @author       You
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        GM_addStyle
// @require      https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Add only necessary button styles
    GM_addStyle(`
        .screenshot-button { 
            display: flex; 
            align-items: center;
            flex-direction: row;
            width: 100%;
            padding: 12px 16px;
            cursor: pointer;
            font-size: 15px;
            color: rgb(15, 20, 25);
            transition-property: background-color, box-shadow;
            transition-duration: 0.2s;
            outline-style: none;
            box-sizing: border-box;
            min-height: 0px;
            min-width: 0px;
            border: 0 solid black;
            background-color: rgba(0, 0, 0, 0);
            margin: 0px;
        }
        .screenshot-button:hover { 
            background-color: rgba(15, 20, 25, 0.1); 
        }
        .screenshot-icon { 
            margin-right: 0px; /* Keep margin 0, alignment handled by flex */
            width: 18.75px;
            height: 18.75px; 
            /* font-weight: bold; Removed as it doesn't apply well to SVG stroke */
            vertical-align: text-bottom; /* Align icon better with text */
        }
        .screenshot-notification { 
            position: fixed; 
            top: 20px; 
            left: 50%; 
            transform: translateX(-50%); 
            background-color: #1DA1F2; 
            color: white; 
            padding: 10px 20px; 
            border-radius: 20px; 
            z-index: 9999; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 1;
            transition: opacity 0.5s ease-out;
        }
        .screenshot-notification.fade-out {
            opacity: 0;
        }
    `);

    function findTweetMainContent(menuButton) {
        const article = menuButton.closest('article[role="article"]');
        if (!article) return null;
        return article;
    }

    function takeScreenshot(menuButton) {
        const notification = document.createElement('div');
        notification.className = 'screenshot-notification';
        notification.innerHTML = 'Taking screenshot...';
        document.body.appendChild(notification);

        try {
            const tweetContainer = findTweetMainContent(menuButton);
            if (!tweetContainer) {
                throw new Error('Could not find tweet content');
            }

            // Save original styles
            const originalStyles = {
                background: tweetContainer.style.background,
                backgroundColor: tweetContainer.style.backgroundColor,
                margin: tweetContainer.style.margin,
                border: tweetContainer.style.border,
                borderRadius: tweetContainer.style.borderRadius
            };

            // Optimize clarity settings
            const scale = window.devicePixelRatio * 2;
            const config = {
                height: tweetContainer.offsetHeight * scale,
                width: tweetContainer.offsetWidth * scale,
                style: {
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${tweetContainer.offsetWidth}px`,
                    height: `${tweetContainer.offsetHeight}px`
                },
                quality: 1.0
            };

            // Use dom-to-image for high-quality screenshot
            domtoimage.toBlob(tweetContainer, config)
                .then(function(blob) {
                    // Copy to clipboard
                    navigator.clipboard.write([
                        new ClipboardItem({
                            'image/png': blob
                        })
                    ]).then(() => {
                        notification.innerHTML = `
                            <div>Screenshot copied to clipboard!</div>
                            <button class="download-btn" style="
                                background: white;
                                color: #1DA1F2;
                                border: none;
                                padding: 5px 10px;
                                border-radius: 15px;
                                margin-top: 5px;
                                cursor: pointer;
                            ">Download</button>
                        `;
                        notification.style.backgroundColor = '#17BF63';

                        // Add download button functionality
                        const downloadBtn = notification.querySelector('.download-btn');
                        downloadBtn.addEventListener('click', () => {
                            const link = document.createElement('a');
                            link.download = `twitter-post-${Date.now()}.png`;
                            link.href = URL.createObjectURL(blob);
                            link.click();
                            URL.revokeObjectURL(link.href);
                            notification.remove();
                        });

                        // 设置3秒后渐隐消失
                        setTimeout(() => {
                            notification.classList.add('fade-out');
                            setTimeout(() => notification.remove(), 500);
                        }, 1500);
                    });
                })
                .catch(function(error) {
                    console.error('Screenshot failed:', error);
                    notification.textContent = 'Screenshot failed';
                    notification.style.backgroundColor = '#E0245E';
                    setTimeout(() => notification.remove(), 2000);
                });
        } catch (error) {
            console.error('Error during screenshot:', error);
            notification.textContent = 'Screenshot failed';
            notification.style.backgroundColor = '#E0245E';
            setTimeout(() => notification.remove(), 2000);
        }
    }

    function createScreenshotIcon() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "18.75");
        svg.setAttribute("height", "18.75");
        svg.setAttribute("fill", "none"); // Use fill=none for line icons
        svg.setAttribute("stroke", "currentColor"); // Inherit color via stroke
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.classList.add("screenshot-icon");

        // Feather Icons: camera
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z");
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "12");
        circle.setAttribute("cy", "13");
        circle.setAttribute("r", "4");

        svg.appendChild(path);
        svg.appendChild(circle);
        return svg;
    }

    function addScreenshotButtonToMenu(menuButton) {
        const menu = document.querySelector('[role="menu"]');
        if (!menu || menu.querySelector('.screenshot-button')) return;

        const screenshotButton = document.createElement('div');
        screenshotButton.className = 'screenshot-button';
        screenshotButton.setAttribute('role', 'menuitem');
        screenshotButton.setAttribute('tabindex', '0');
        
        screenshotButton.appendChild(createScreenshotIcon());
        
        const text = document.createElement('span');
        text.textContent = 'Screenshot';
        text.style.marginLeft = '12px';
        text.style.fontSize = '15px';
        text.style.fontWeight = 'bold';
        screenshotButton.appendChild(text);
        
        screenshotButton.addEventListener('click', () => {
            takeScreenshot(menuButton);
            const closeButton = menu.querySelector('[aria-label="Close"]');
            if (closeButton) closeButton.click();
        });
        
        menu.insertBefore(screenshotButton, menu.firstChild);
    }

    function addScreenshotButtons() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) {
                            const menu = node.matches('[role="menu"]') ? node : node.querySelector('[role="menu"]');
                            if (menu) {
                                const menuButton = document.querySelector('[aria-haspopup="menu"][aria-expanded="true"]');
                                if (menuButton) {
                                    addScreenshotButtonToMenu(menuButton);
                                }
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    addScreenshotButtons();
})();