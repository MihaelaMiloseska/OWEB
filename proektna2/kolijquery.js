$(document).ready(function () {
    // Автоматско слајдшоу - промена на слика на секои 3 секунди
    let myIndex = 0;
    carousel();

    function carousel() {
        const $slides = $(".mySlides"); // Селектирање на сите слики со класата mySlides
        $slides.hide(); // Скриј ги сите слики
        myIndex++;
        if (myIndex > $slides.length) { myIndex = 1; } // Ако стигнеме до крај, врати се на првата слика
        $slides.eq(myIndex - 1).show(); // Прикажи ја тековната слика
        setTimeout(carousel, 3000); // Повторно повикување на функцијата по 3 секунди
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
            { id: 2, imageUrl: 'https://bluesky.cdn.imgeng.in/cogstock-images/dealer360-5eed43a32643204f8f30c831b5fb7a20565699c9.jpg?imgeng=/w_auto,1200/', likes: 0, comments: [] },
            { id: 3, imageUrl: 'https://dasweltauto.mk/?h=usedcarphoto&usedcarphotoId=45684&width=640&height=480&jpg', likes: 0, comments: [] },
        ]
    };

    // Функција за прикажување на објавите
    function renderPosts(posts, gridId, prefix) {
        const $grid = $(`#${gridId}`); // Најди го елементот со даден ID
        $grid.empty(); // Исчисти ја содржината на гридот
        posts.forEach(post => {
            const postElement = createPostElement(post, prefix); // Создади HTML за објавата
            $grid.append(postElement); // Додај ја објавата во гридот
        });
    }

    // Функција за креирање на HTML структура за објавите
    function createPostElement(post, prefix) {
        const commentsHtml = post.comments.map((comment, index) => `
            <p>
                ${comment}
                <button onclick="deleteComment('${prefix}', ${post.id}, ${index})" class="delete-comment">🗑️</button>
            </p>
        `).join('');

        return `
            <div class="instagram-post">
                <img src="${post.imageUrl}" alt="Instagram post">
                <div class="post-actions">
                    <button class="like-button" onclick="likePost('${prefix}', ${post.id})">❤️ ${post.likes}</button>
                    <button class="comment-button" onclick="toggleComments('${prefix}', ${post.id})">💬 ${post.comments.length}</button>
                </div>
                <div class="comments-section" id="comments-${prefix}-${post.id}" style="display: none;">
                    <div class="comments-list">${commentsHtml}</div>
                    <input type="text" placeholder="Додај коментар..." onkeypress="addComment(event, '${prefix}', ${post.id})" class="comment-input">
                </div>
            </div>
        `;
    }

    // Функција за лајкнување на објава
    window.likePost = function (prefix, postId) {
        const posts = postsData[prefix]; // Преземи ги објавите според префиксот
        const post = posts.find(p => p.id === postId); // Најди ја објавата по ID
        if (post) {
            post.likes++; // Зголеми го бројот на лајкови
            renderPosts(posts, prefix === 'newCars' ? 'instagramGrid' : 'usedInstagramGrid', prefix); // Освежи го гридот
        }
    };

    // Функција за прикажување или скривање на коментарите
    window.toggleComments = function (prefix, postId) {
        $(`#comments-${prefix}-${postId}`).toggle(); // Промени го статусот на прикажување
    };

    // Функција за додавање на коментар
    window.addComment = function (event, prefix, postId) {
        if (event.key === 'Enter') { // Ако притиснатото копче е "Enter"
            const posts = postsData[prefix]; // Преземи ги објавите според префиксот
            const post = posts.find(p => p.id === postId); // Најди ја објавата по ID
            const input = $(event.target); // Селектирај го полето за внес

            if (post && input.val().trim()) { // Ако има валидна вредност
                post.comments.push(input.val().trim()); // Додај го коментарот
                input.val(''); // Исчисти го полето за внес
                renderPosts(posts, prefix === 'newCars' ? 'instagramGrid' : 'usedInstagramGrid', prefix); // Освежи го гридот
            }
        }
    };

    // Функција за бришење на коментар
    window.deleteComment = function (prefix, postId, commentIndex) {
        const posts = postsData[prefix]; // Преземи ги објавите според префиксот
        const post = posts.find(p => p.id === postId); // Најди ја објавата по ID

        if (post && post.comments[commentIndex]) { // Ако постои коментарот
            post.comments.splice(commentIndex, 1); // Избриши го коментарот
            renderPosts(posts, prefix === 'newCars' ? 'instagramGrid' : 'usedInstagramGrid', prefix); // Освежи го гридот
        }
    };

    // Обработка на формата за тест возење
    $('.test-drive-form').on('submit', function (event) {
        event.preventDefault(); // Спречи го стандардното праќање на формата

        const $form = $(this); // Селектирај ја формата
        const name = $form.find('#fullName').val(); // Преземи го внесеното име
        const carModel = $form.find('#carModel').val(); // Преземи го избраниот модел на возило

        alert(`Успешно е закажан термин за тест возење на име: ${name} за модел: ${carModel}`); // Прикажи порака
        $form[0].reset(); // Ресетирај ја формата
    });

    // Обработка на формата за анкета
    $('#surveyForm').on('submit', function (event) {
        event.preventDefault(); // Спречи го стандардното праќање на формата

        const rating = $('input[name="rating"]:checked').val(); // Преземи ја избраната оцена
        const likedMost = $('#likedMost').val().trim(); // Преземи го внесеното поле
        const improvementSuggestions = $('#improvementSuggestions').val().trim(); // Преземи предлози

        alert(`Ви благодариме за вашето мислење!\nОценка на сајтот: ${rating}`); // Прикажи порака
        $(this)[0].reset(); // Ресетирај ја формата
    });

    // Логирање - проверка и прикажување на popup
    if (sessionStorage.getItem('isLoggedIn')) {
        $('#loginPopup').hide(); // Скриј го popup ако корисникот е веќе логиран
    } else {
        $('#loginPopup').show(); // Прикажи го popup ако не е логиран
    }

    // Обработка на логирањето
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Спречи го стандардното праќање на формата

        const email = $('#email').val(); // Преземи го внесениот email
        const password = $('#password').val(); // Преземи ја внесената лозинка

        sessionStorage.setItem('isLoggedIn', 'true'); // Сними го статусот на логирање
        $('#loginPopup').hide(); // Скриј го popup

        alert('Логирањето беше успешно!'); // Прикажи порака
    });

    // Копче за затворање на popup
    $('#closeBtn').on('click', function () {
        $('#loginPopup').hide(); // Скриј го popup
    });

    // Почетно прикажување на објавите
    renderPosts(postsData.newCars, 'instagramGrid', 'newCars'); // Прикажи ги новите возила
    renderPosts(postsData.usedCars, 'usedInstagramGrid', 'usedCars'); // Прикажи ги половните возила
});