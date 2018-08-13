// http://api.douban.com/v2/movie/subject/1764796

const rp = require('request-promise-native');

async function fetchMove(item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url);

    return res
}

(async () => {
    let movies = [
        {
            doubanId: 26985127,
            title: '一出好戏',
            rate: 7.4,
            poster:
                'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2529571873.jpg'
        },
        {
            doubanId: 26426194,
            title: '巨齿鲨',
            rate: 6.1,
            poster:
                'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2530572643.jpg'
        },
    ];

    movies.map(async movie => {
        let movieData = await fetchMove(movie);
        try {
            movieData = JSON.parse(movieData);
            console.log(movieData);
            // console.log(movieData);
        } catch (err) {
            console.log(err)
        }
        // console.log(movieData);
    })
})();