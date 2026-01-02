const emailLink = document.querySelector('.contact-item[href^="mailto:"]');

emailLink.addEventListener("click", (e) => {
    e.preventDefault();

    let modal = document.getElementById("emailModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "emailModal";
        modal.className = "modal-container";

        const formWrapper = document.createElement("div");
        formWrapper.className = "email-modal";

        formWrapper.innerHTML = `
            <h2>Send me a message! 🐢</h2>
            <form id="contactForm" action="https://formsubmit.co/d48f74fa46b6a08789394d79e5f6555d" method="POST">
                <input type="hidden" name="_subject" value="New message from ur personal website!">

                <input type="hidden" name="_template" value="table">
                <div class="input-group">
                    <input type="text" name="name" required>
                    <label>Name</label>
                </div>
                <div class="input-group">
                    <input type="email" name="email" required>
                    <label>Email</label>
                </div>
                <div class="input-group">
                    <input type="text" name="subject" required>
                    <label>Subject</label>
                </div>
                <div class="input-group">
                    <textarea name="message" rows="5" required></textarea>
                    <label>Message</label>
                </div>
                <button type="submit">Send</button>

                <input type="hidden" name="_next" value="https://imsauce.github.io/thanks.html">


                

                
            </form>
        `;

        modal.appendChild(formWrapper);
        document.body.appendChild(modal);

        // Click outside closes modal
        modal.addEventListener("click", ev => {
            if (ev.target === modal) modal.classList.remove("active");
        });

        // Floating label logic
        const inputs = formWrapper.querySelectorAll("input, textarea");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                input.classList.toggle("has-value", !!input.value);
            });
        });

        // Form submission - let it submit naturally to formsubmit.co
        formWrapper.querySelector("form").addEventListener("submit", ev => {
            // Remove the preventDefault to allow actual form submission
            // The form will now POST to formsubmit.co
        });
    }

    modal.classList.add("active");
});