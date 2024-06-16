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
            projectContent.innerHTML = `
                <h2>Passgen</h2>
                <div class="container">
                    <div class="box" id="password-box">
                        <p id="password"></p>
                    </div>
                    <div class="input-box">
                        <textarea id="keywords" name="keywords" placeholder="Enter keywords separated by commas"></textarea>
                        <div class="buttons">
                            <button onclick="generatePassword()">Generate</button>
                            <button onclick="generatePasswordWithKeywords()">Generate w/ Keywords</button>
                        </div>
                    </div>
                </div>
                <script>
                    function generatePassword() {
                        fetch('https://sudosaint-passgen-b07861d020a3.herokuapp.com/generate', {method: 'POST'})
                        .then(response => response.json())
                        .then(data => document.getElementById('password').innerText = data.password);
                    }
                    function generatePasswordWithKeywords() {
                        const keywords = document.getElementById('keywords').value;
                        fetch('https://sudosaint-passgen-b07861d020a3.herokuapp.com/generate_with_keywords', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({keywords: keywords})
                        })
                        .then(response => response.json())
                        .then(data => document.getElementById('password').innerText = data.password);
                    }
                </script>`;
        } else if (project === 'project2') {
            projectContent.innerHTML = '<h2>Project2</h2><p>Details about Project2...</p>';
        }
    }
});
