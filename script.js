document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    const projectLinks = document.querySelectorAll('.project-link');

    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            const dropdownContainer = this.nextElementSibling;
            const verticalLine = dropdownContainer.querySelector('.vertical-line');

            if (this.classList.contains('active')) {
                dropdownContainer.style.display = 'block';
                verticalLine.style.height = `${dropdownContainer.scrollHeight}px`; // Adjust based on padding
            } else {
                verticalLine.style.height = '0';
                dropdownContainer.style.display = 'none';
            }
        });
    });

    projectLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const project = this.dataset.project;
            loadProjectContent(project);

            // Remove active class from all links and add to the clicked one
            projectLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function loadProjectContent(project) {
        const projectContent = document.getElementById('project-content');
        if (project === 'passgen') {
            projectContent.innerHTML = '<h2>Passgen</h2><p>Details about Passgen project...</p>';
        } else if (project === 'project2') {
            projectContent.innerHTML = '<h2>Project2</h2><p>Details about Project2...</p>';
        }
    }
});
