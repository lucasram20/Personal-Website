        // Function to scroll to the next section
        function scrollToNextSection() {
            var currentSection = document.querySelector('.active-section');
            var nextSection = currentSection.nextElementSibling;

            if (nextSection) {
                currentSection.classList.remove('active-section');
                nextSection.classList.add('active-section');
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }