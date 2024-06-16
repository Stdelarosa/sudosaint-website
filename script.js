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

    async function loadProjectContent(project) {
        const projectContent = document.getElementById('project-content');
        if (project === 'passgen') {
            const response = await fetch('https://your-app-name.herokuapp.com/');
            const html = await response.text();
            projectContent.innerHTML = html;

            // Reinitialize the script tags from the loaded content
            const scripts = projectContent.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                newScript.innerHTML = script.innerHTML;
                document.body.appendChild(newScript);
            }
        } else if (project === 'project2') {
            projectContent.innerHTML = '<h2>Project2</h2><p>Details about Project2...</p>';
        }
    }
});
