fetch("http(s)://gateway.marvel.com/")
    .then((res) => {

        return res.json()
    })
    .then((data) => {
        console.log(data)

    })