document.addEventListener("DOMContentLoaded", function() {
    const clickButton = document.getElementById("clicker-button");
    const clickCountDisplay = document.getElementById("click-count");
    const shopButton = document.getElementById("shop-button");
    const shopContainer = document.getElementById("shop-container");
    const shopOverlay = document.getElementById("shop-overlay");

    const tg = window.Telegram.WebApp

    let clickCount = localStorage.getItem("clickCount") ? parseInt(localStorage.getItem("clickCount")) : 0;
    let clickValue = 1;

    clickCountDisplay.textContent = clickCount

    clickButton.addEventListener("click", function() {
        const plusOne = document.createElement("div");

        plusOne.textContent = `+${clickValue}`;
        plusOne.classList.add("plus-one");
        document.body.appendChild(plusOne);

        const buttonRect = clickButton.getBoundingClientRect();

        plusOne.style.left = `${buttonRect.left + buttonRect.width / 2 - plusOne.offsetWidth / 2}px`;
        plusOne.style.top = `${buttonRect.top - 24}px`;

        setTimeout(() => {
            plusOne.remove();
        }, 500);

        clickCount += clickValue;
        clickCountDisplay.textContent = clickCount;

        localStorage.setItem("clickCount", clickCount);
    });

    shopButton.addEventListener("click", function() {
        shopOverlay.style.display = 'block';
        shopContainer.style.display = 'block';

        shopOverlay.offsetHeight;
        shopContainer.offsetHeight;

        shopOverlay.style.opacity = '1';
        shopContainer.style.opacity = '1';
        shopContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    shopOverlay.addEventListener("click", function() {
        shopOverlay.style.opacity = '0';
        shopContainer.style.opacity = '0';
        shopContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';

        setTimeout(() => {
            shopOverlay.style.display = 'none';
            shopContainer.style.display = 'none';
        }, 300);
    });

    document.querySelectorAll('.shop-item button').forEach(button => {
        button.addEventListener('click', function() {
            const shopItem = this.parentElement;
            const upgradeValue = parseInt(shopItem.getAttribute('data-upgrade'));
            const upgradeCost = parseInt(shopItem.getAttribute('data-cost'));

            if (clickCount >= upgradeCost) {
                clickCount -= upgradeCost;
                clickValue += upgradeValue;
                clickCountDisplay.textContent = clickCount;
                shopItem.querySelector('div').textContent += ' (Куплено!)';
                this.disabled = true;
                this.style.backgroundColor = 'red'
            } else {
                alert('Недостаточно кликов для покупки этого улучшения.');
            }
        });
    });

    // tg.onEvent('mainButtonClicked', function() {
    //     tg.sendData(JSON.stringify({ clickCount: clickCount }));
    //     tg.close();
    // });

    // tg.MainButton.setText("Сохранить результат");
    // tg.MainButton.show();
});

document.getElementById("end-session-button").addEventListener("click", function() {
    const clickCount = document.getElementById("click-count").textContent;
    
    if(window.Telegram.WebApp) {
        window.Telegram.WebApp.sendData(JSON.stringify({ clicks: clickCount }));
        window.Telegram.WebApp.close();
    }
});
