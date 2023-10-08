
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')



const app = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    songs: [
        {
            name: 'Hoa Cỏ Lau',
            singer: 'Phong Max',
            path: './music/Hoa-Co-Lau.mp3',
            image: 'img/hoa-co-lau.jpg'
        },
        {
            name: 'Ngây thơ',
            singer: 'Tăng Duy Tân',
            path: './music/Ngay-tho.mp3',
            image: './img/Ngay-tho.jpg'
        },
        {
            name: 'Cô đơn trên sofa',
            singer: 'Trung Quân ft Hồ Ngọc Hà',
            path: './music/Co-don-tren-sofa.mp3',
            image: './img/Co-don-tren-sofa.jpg'
        },
        {
            name: 'Hãy ra khỏi người đó đi',
            singer: 'Phan Mạnh Quỳnh',
            path: './music/Hay-ra-khoi-nguoi-do-di.mp3',
            image: './img/hay-ra-khoi-nguoi-do-di-bai-hat-gay-sot-moi-cua-phan-manh-quynh.jpg'
        },
        {
            name: 'Khi người mình yêu khóc',
            singer: 'Phan Mạnh Quỳnh',
            path: './music/Khi-nguoi-minh-yeu-khoc.mp3',
            image: './img/Khi-nguoi-minh-yeu-khoc.jpg'
        },
        {
            name: 'Sao cha không',
            singer: 'Phan Mạnh Quỳnh',
            path: './music/Sao-cha-khong.mp3',
            image: './img/Sao-cha-khong.jpg'
        },
        {
            name: 'Cắt đôi nỗi sầu',
            singer: 'Tăng Duy Tân',
            path: './music/Cat-doi-noi-sau.mp3',
            image: './img/Cat-doi-noi-sau.jpg'
        },
        {
            name: 'Hoang Mang',
            singer: 'Bùi Anh Tuấn',
            path: './music/HoangMang.mp3',
            image: './img/hoangmang.jpg'
        },
        {
            name: 'Thuận theo ý trời',
            singer: 'Bùi Anh Tuấn',
            path: './music/ThuanTheoYTroi.mp3',
            image: './img/ThuanTheoYTroi.jpg'
        },
        {
            name: 'Tháng tư là lời nói dối của em',
            singer: 'Hà Anh Tuấn',
            path: './music/ThangTuNoiDdoi.mp3',
            image: './img/ThangTu.jpg'
        },
        {
            name: 'Album Karik',
            singer: 'Karik',
            path: './music/ThuongNguoiTunglatatca.mp3',
            image: './img/Thuongnguoitunglatatca.jpg'
        },
        {
            name: 'Trái tim em cũng biết đau',
            singer: 'Bảo Anh',
            path: './music/TraiTimDau.mp3',
            image: './img/Traitimdau.jpg'
        },
        {
            name: 'Mơ Hồ',
            singer: 'Bùi Anh Tuấn',
            path: './music/MoHo.mp3',
            image: './img/Moho.jpg'
        }
    ],
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })

    },
    handleEvent: function () {

        const _this = this
        const cdWidth = cd.offsetWidth



        // Xử lý quay cdthumbnail
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause();


        // Xử lý phóng to thu nhỏ Cd thumbnail
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }

        // khi bai hat play
        audio.onplay = () => {
            cdThumbAnimate.play()
            _this.isPlaying = true
            player.classList.add('playing')
        }
        audio.onpause = () => {
            cdThumbAnimate.pause()
            _this.isPlaying = false
            player.classList.remove('playing')
        }

        // Khi Tiến độ bài hát thay đổi
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        // Xử lý khi tua bài hát
        progress.onchange = e => {
            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime
        }


        // Xử lý khi tiến  bài hát
        nextBtn.onclick = () => {
            if (this.isRandom) {
                _this.playRandom()
            } else {
                this.nextSong()
            }
            this.render()
            audio.play()
            _this.scrollActiveSong();
        }

        // Xử lý lùi bài hát
        prevBtn.onclick = () => {
            if (this.isRandom) {
                _this.playRandom()
            } else {
                this.prevSong()
            }
            this.render()
            audio.play()
            _this.scrollActiveSong();
        }

        // Xử lý trộn bài hát
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lý lặp bài hát
        repeatBtn.onclick = e => {
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active')
        }

        // Xử lý khi hết bài hát
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if (songNode && !e.target.closest('.option')) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                if (e.target.closest('.option')) {

                }
            }
        }


    },
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    scrollActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 100);
    },
    playRandom: function () {
        let newIndex = 0;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.currentIndex == newIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function () {
        // Định nghĩa các thuôc tính cho Object
        this.defineProperties()

        // Xử lý sự kiện (DOM event)
        this.handleEvent()

        // Tải thông tin bài hát
        this.loadCurrentSong()

        // Render playlist
        this.render()
    }

}
app.start()
