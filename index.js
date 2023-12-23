const express = require('express');
const app = express();
const port = 3000;

const knex = require('knex')(require('./knexfile').development)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Emang boleh?');
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        nama: 'Tugus',
        kelas: 'Pagi2'
    })
});


app.get('/buku', (req, res) => {
    knex('buku').select('*')
        .then((data)=> {
            console.log(data);
            res.render('buku_index', {
                buku: data
            })
        })
        .catch((error)=>console.log(error))
})

app.get('/buku/create', (req, res) => {
    res.render('buku_create')
})

app.post('/buku/simpan', function(req, res) {
    const judul = req.body.judul;
    const tahun_terbit = req.body.tahun_terbit;
    const pengarang = req.body.pengarang;
    
    knex('buku').insert({
      judul: judul,
      tahun_terbit: tahun_terbit,
      pengarang: pengarang,

    }).then(()=>{
      res.send('Data berhasil disimpan')
    }).catch((err) => {
      console.log(err)
      res.send('Terjadi kesalah saat mennyimpan data')
    })
});

app.listen(port, () => {
    console.log(`Web server berjalan pada http://localhost:${port}`);
});