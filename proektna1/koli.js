
    // Automatic Slideshow - change image every 3 seconds
    var myIndex = 0;
    carousel();
    
    function carousel() {
        var i;
        var x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
           x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) { myIndex = 1; }
        x[myIndex - 1].style.display = "block";
        setTimeout(carousel, 3000);
    }
    
      // Податоци за нови и половни возила
    const postsData = {
        newCars: [
            { id: 1, imageUrl: 'https://vehicle-images.dealerinspire.com/a623-110007014/thumbnails/large/1G1FB3DS3R0118051/30220e78398d010453c76bbe6cb78b09.jpg', likes: 0, comments: [] },
            { id: 2, imageUrl: 'https://i.ytimg.com/vi/KAS3A3qzO8g/maxresdefault.jpg', likes: 0, comments: [] },
            { id: 3, imageUrl: 'https://vehicle-images.dealerinspire.com/bfe8-110008839/W1KAF8HB2RR229057/881049c543ebaf88799f9ea99707f9f0.jpg', likes: 0, comments: [] },
           
            
        ],
        usedCars: [
            { id: 1, imageUrl: 'https://dasweltauto.mk/?h=usedcarphoto&usedcarphotoId=31881&width=460&height=345?%3E.jpg', likes: 0, comments: [] },
            { id: 2, imageUrl: 'https://deluxe-auto.com.mk/_next/image?url=https%3A%2F%2Fdeluxeauto.s3.eu-central-1.amazonaws.com%2F2c347a4c-18be-4b71-9332-e6586053421b-EOSR9747.jpg&w=3840&q=75', likes: 0, comments: [] },
            { id: 3, imageUrl: 'https://dasweltauto.mk/?h=usedcarphoto&usedcarphotoId=45684&width=640&height=480&jpg', likes: 0, comments: [] },
            
        ]
    };
    
    // Функција за рендерирање објави
    function renderPosts(posts, gridId, prefix) {
        const grid = document.getElementById(gridId);
        grid.innerHTML = '';
        posts.forEach(post => {
            const postElement = createPostElement(post, prefix);
            grid.appendChild(postElement);
        });
    }
    
    // Функција за креирање елемент за објава
    function createPostElement(post, prefix) {
        const postDiv = document.createElement('div');
        postDiv.className = 'instagram-post';
    
        postDiv.innerHTML = `
            <img src="${post.imageUrl}" alt="Instagram post">
            <div class="post-actions">
                <button onclick="likePost('${prefix}', ${post.id})" class="like-button">❤️ ${post.likes}</button>
                <button onclick="toggleComments('${prefix}', ${post.id})" class="comment-button">💬 ${post.comments.length}</button>
            </div>
            <div class="comments-section" id="comments-${prefix}-${post.id}" style="display: none;">
                <div class="comments-list">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
                <input type="text" placeholder="Додај коментар..." onkeypress="addComment(event, '${prefix}', ${post.id})" class="comment-input">
            </div>
        `;
    
        return postDiv;
    }
    
    // Функција за лајкнување на објава
    window.likePost = function(prefix, postId) {
        const posts = postsData[prefix];
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            renderPosts(posts, prefix === 'newCars' ? 'instagramGrid' : 'usedInstagramGrid', prefix);
        }
    };
    
    // Функција за прикажување на коментари
    window.toggleComments = function(prefix, postId) {
        const commentsSection = document.getElementById(`comments-${prefix}-${postId}`);
        if (commentsSection) {
            commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
        }
    };
    
    // Функција за додавање коментар
    window.addComment = function(event, prefix, postId) {
        if (event.key === 'Enter') {
            const posts = postsData[prefix];
            const post = posts.find(p => p.id === postId);
            const input = event.target;
    
            if (post && input.value.trim()) {
                post.comments.push(input.value.trim());
                input.value = '';
                renderPosts(posts, prefix === 'newCars' ? 'instagramGrid' : 'usedInstagramGrid', prefix);
            }
        }
    };
    
    // Почетно рендерирање
    renderPosts(postsData.newCars, 'instagramGrid', 'newCars');
    renderPosts(postsData.usedCars, 'usedInstagramGrid', 'usedCars');
    
    
    
    
    
    
    
    
    document.getElementById('surveyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
    
        const formData = new FormData(this);
        const surveyData = {
            rating: formData.get('rating'),
            likes: this.querySelector('textarea:nth-of-type(1)').value,
            improvements: this.querySelector('textarea:nth-of-type(2)').value
        };
    
        console.log('Survey submitted:', surveyData);
        
    
        this.reset();
        alert('Ви благодариме за одговорите!');
    });
    
    
    
    // Селектирање на сите форми со дадената класа
    const forms = document.querySelectorAll('.test-drive-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
    
            const name = form.querySelector('[id="fullName"]').value;
            const carModel = form.querySelector('[id="carModel"]').value;
    
            alert(`Успешно е закажан термин за тест возење на име: ${name} за модел: ${carModel}`);
            form.reset();
        });
    });
    
    
    
    
    function showPopup() {
        
        alert("Анкетата е завршена!");
    }
    
    
   
    
    
    //anketa
    document.getElementById('surveyForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Преземање на вредности од формата
        const rating = document.querySelector('input[name="rating"]:checked')?.value;
        const likedMost = document.getElementById('likedMost').value.trim();
        const improvementSuggestions = document.getElementById('improvementSuggestions').value.trim();
    
        // Приказ на резултатите
        alert(`Ви благодариме за вашето мислење!
        Оценка на сајтот: ${rating}`);
       
    
        // Ресетирање на формата по поднесување
        event.target.reset();
    });
    
    //login
    
    document.addEventListener('DOMContentLoaded', function() {
        const loginPopup = document.getElementById('loginPopup');
        const closeBtn = document.getElementById('closeBtn');
        const loginForm = document.getElementById('loginForm');
    
        // Провери дали корисникот е логиран во тековната сесија
        if (sessionStorage.getItem('isLoggedIn')) {
            console.log('Корисникот веќе е логиран за оваа сесија. Скрие popup.');
            // Скрие го popup ако корисникот е веќе логиран
            loginPopup.style.display = 'none';
        } else {
            console.log('Корисникот не е логиран за оваа сесија. Прикажи popup.');
            // Прикажи го popup ако корисникот не е логиран
            loginPopup.style.display = 'flex';
        }
    
        // Обработи го праќањето на формата
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Превенирај го обновувањето на страната по праќањето на формата
    
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            console.log('Обид за логирање со:', email, password);
    
            // Симулирај успешен логин така што ќе се постави флаг во sessionStorage
            sessionStorage.setItem('isLoggedIn', 'true');
            loginPopup.style.display = 'none'; // Затвори го popup по логирањето
    
            alert('Логирањето беше успешно!');
        });
    
        // Затвори го popup кога ќе се кликне на копчето "x"
        closeBtn.addEventListener('click', function() {
            loginPopup.style.display = 'none';
        });
    });
    