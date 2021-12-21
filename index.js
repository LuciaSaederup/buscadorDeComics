fetch("http(s)://gateway.marvel.com/")
    .then((res) => {

        return res.json()
    })
    .then((data) => {
        console.log(data)

    })


// "scss": "node-sass --watch style/scss -o style/css"