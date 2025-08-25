document.addEventListener("DOMContentLoaded", function() {
    const container = document.createElement("div");
    container.classList.add("floating-bubbles");
    document.body.appendChild(container);

    const bubbleCount = 25; // number of bubbles
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.classList.add("bubble-particle");

        // random size
        const size = Math.random() * 60 + 20; // 20px - 80px
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        // random start position
        bubble.style.left = Math.random() * 100 + "%";

        // random animation duration & delay
        bubble.style.animationDuration = (10 + Math.random() * 15) + "s";
        bubble.style.animationDelay = (Math.random() * 15) + "s";

        container.appendChild(bubble);
    }
});
