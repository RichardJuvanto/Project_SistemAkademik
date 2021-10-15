1. API Mahasiswa
   Data Mahasiswa yang digunakan => (foto, nama, nim, nik, jenisKelamin, id_programStudi, id_kelas, email, alamat, noTelp, alamatOrtu)
  a. GET / POST Seluruh Data Mahasiswa : https://localhost:8081/api/mahasiswa/ atau https://calm-savannah-30077.herokuapp.com/api/mahasiswa/ 
  b. GET Data Mahasiswa satuan : https://localhost:8081/api/mahasiswa/find/:id atau https://calm-savannah-30077.herokuapp.com/api/mahasiswa/find/:id
  c. GET Data Mahasiswa berdasarkan Kelas : https://localhost:8081/api/mahasiswa/findByKelas?kelas=<value> atau https://calm-savannah-30077.herokuapp.com/api/mahasiswa/findByKelas?kelas=<value>
  d. PUT / DELETE Data Mahasiswa : https://localhost:8081/api/mahasiswa/:id atau https://calm-savannah-30077.herokuapp.com/api/mahasiswa/:id
   
2. API Dosen
   Data Dosen yang digunakan => (nama, nip, email, kompetensi, id_matakuliah)
   a. GET / POST Seluruh Data Dosen : https://localhost:8081/api/dosen/ atau https://calm-savannah-30077.herokuapp.com/api/dosen/
   b. GET Data Dosen satuan / DELETE / PUT (UPDATE) : https://localhost:8081/api/dosen/:id atau https://calm-savannah-30077.herokuapp.com/api/dosen/:id
   
3. API Matakuliah
   Data Matakuliah yang digunakan => (nama, kode, sks, jumlahPertemuan)
   a. GET / POST Seluruh Data Matakuliah : https://localhost:8081/api/matakuliah/ atau https://calm-savannah-30077.herokuapp.com/api/matakuliah/
   b. GET Data Matakuliah satuan / DELETE / PUT (UPDATE) : https://localhost:8081/api/matakuliah/:id atau https://calm-savannah-30077.herokuapp.com/api/matakuliah/:id
   
4. API Kelas
   Data Kelas yang digunakan => (nama, id_matakuliah)
   a. GET / POST Seluruh Data Kelas : https://localhost:8081/api/kelas/ atau https://calm-savannah-30077.herokuapp.com/api/kelas/
   b. GET Data Kelas satuan / DELETE / PUT (UPDATE) : https://localhost:8081/api/kelas/:id atau https://calm-savannah-30077.herokuapp.com/api/kelas/:id
   
5. API Program Studi
   Data Program Studi yang digunakan => (nama, id_kelas)
   a. GET / POST Seluruh Data Program Studi : https://localhost:8081/api/programStudi/ atau https://calm-savannah-30077.herokuapp.com/api/programStudi/
   b. GET Data Program Studi satuan / DELETE / PUT (UPDATE) : https://localhost:8081/api/programStudi/:id atau https://calm-savannah-30077.herokuapp.com/api/programStudi/:id
