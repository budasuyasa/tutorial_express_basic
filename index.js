const express = require("express");
const app = express();
const port = 3000;

const knex = require("knex")(require("./knexfile").development);

// menggunakan middleware agar request body dapat ditangkap oleh express via
// Request (req) object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set ejs sebagai template engin default dari express
// pastikan ejs sudah diinstall sebelumnya dengan:
// npm install ejs --save
app.set("view engine", "ejs");

// default root route atau route utama dari web server
app.get("/", (req, res) => {
  res.send("Emang boleh?");
});

app.get("/profile", (req, res) => {
  // merender template profile pada vies/profile.ejs
  // method render menerima 2 buah parameter
  // parameter pertama adalah nama template dan
  // parameter kedua adalah data yang bisa kita kirimkan
  // ke template
  res.render("profile", {
    nama: "Tugus",
    kelas: "Pagi2",
  });
});

app.get("/buku", (req, res) => {
  // mengambil data buku dari table buku dengan menggunakan knex
  // sintaks dibawah akan diterjemahkan menjadi SQL query berikut:
  // select * from buku
  knex("buku")
    .select("*")
    // promises ketika query yang dilakukan sukses
    // maka hasil query akan tersedia pada variabel data
    .then((data) => {
      console.log(data);

      // render template dan bagikan data hasil query
      res.render("buku_index", {
        buku: data,
      });
    })
    // jika terjadi error, tampilkan error pada console
    .catch((error) => console.log(error));
});

// route untuk membuat data buku baru
app.get("/buku/create", (req, res) => {
  res.render("buku_create");
});

app.post("/buku/simpan", function (req, res) {
  // tangkap semua variabel yang dikirimkan dari form
  // melalui object req.body
  const judul = req.body.judul;
  const tahun_terbit = req.body.tahun_terbit;
  const pengarang = req.body.pengarang;

  // insert data buku baru dengan method insert
  // sesuai dengan kolom dan value yang diberikan dari
  // form
  knex("buku")
    .insert({
      judul: judul,
      tahun_terbit: tahun_terbit,
      pengarang: pengarang,
    })
    .then(() => {
      // jika proses insert berhasil, kembalikan response pesan berhasil
      res.send("Data berhasil disimpan");
    })
    .catch((err) => {
      // jika terjadi error tampilkan error pada console
      // serta kembalikan response pesan error
      console.log(err);
      res.send("Terjadi kesalah saat mennyimpan data");
    });
});

app.get('/buku/edit/:id', (req, res) => {
    const id = req.params.id;
    // select * from buku where id = id
    knex('buku').select('*').where('id', id)
        .then(([data]) => { // karena data adalah array, kita ada destruksi agar mengembalikan object pertama saja
            console.log(data);
            res.render('buku_edit', {
                buku: data
            });
        }).catch((error) => {
            console.log(error);
            res.send('Terjadi error saat mengedit data buku');
        })
})

app.post('/buku/update/:id', (req,res) => {
    const id =  req.params.id;  
    let judul = req.body.judul
    let pengarang = req.body.pengarang
    let tahun_terbit = req.body.tahun_terbit

    console.log('Judul dari form: ', judul)
    console.log('Pengarang dari form: ', pengarang)
    console.log('Tahun terbit dari form: ', tahun_terbit)

    // update buku set judul = ?judul, pengarang = ?pengarang 
    // tahun_terbit = ?tahun_terbit where id = ?id

    knex('buku').where('id', id).update({
        judul: judul,
        tahun_terbit: tahun_terbit,
        pengarang: pengarang,
    })
        .then((data) => { // karena data adalah array, kita ada destruksi agar mengembalikan object pertama saja
            console.log(data);
            res.send('Data berhasil diperbaharui')
        }).catch((error) => {
            console.log(error);
            res.send('Terjadi error saat mengedit data buku');
        })

})

app.get('/buku/delete/:id', function(req, res){
  // di sini kita melakukan proses delete
  console.log("isi dari path id: ", req.params.id)
  let id_buku = req.params.id

  // delete from buku where id = ?
  knex('buku').where('id', id_buku).del().then(function(){
    res.send(`Data engan id ${id_buku} berhasil dihapus`)
  })
})

// jalankan aplikasi pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Web server berjalan pada http://localhost:${port}`);
});
