module.exports = async function (context, req) {
    // Log request yang masuk
    context.log('API Estimate dipanggil dengan query:', req.query);
    
    // Ambil parameter dari query string
    const jumlah = parseInt(req.query.jumlah);
    const jenis = req.query.jenis;
    
    // Validasi parameter
    if (!jumlah || !jenis) {
        context.res = {
            status: 400,
            body: {
                error: 'Parameter tidak lengkap',
                message: 'Harap sertakan parameter "jumlah" dan "jenis" dalam query string',
                example: '/api/estimate?jumlah=10&jenis=snack'
            }
        };
        return;
    }
    
    if (isNaN(jumlah) || jumlah <= 0) {
        context.res = {
            status: 400,
            body: {
                error: 'Parameter jumlah tidak valid',
                message: 'Jumlah peserta harus berupa angka positif'
            }
        };
        return;
    }
    
    // Daftar harga
    const hargaPerJenis = {
        'snack': 15000,
        'makan': 30000,
        'lengkap': 45000
    };
    
    // Cek apakah jenis konsumsi valid
    if (!hargaPerJenis[jenis]) {
        context.res = {
            status: 400,
            body: {
                error: 'Jenis konsumsi tidak valid',
                message: 'Jenis harus salah satu dari: snack, makan, lengkap'
            }
        };
        return;
    }
    
    // Hitung estimasi biaya
    const hargaPerPeserta = hargaPerJenis[jenis];
    const totalBiaya = jumlah * hargaPerPeserta;
    
    // Buat response JSON sesuai permintaan tugas
    const response = {
        jumlah_peserta: jumlah,
        jenis_konsumsi: jenis,
        harga_per_peserta: hargaPerPeserta,
        total_estimasi_biaya: totalBiaya,
        timestamp: new Date().toISOString()
    };
    
    // Kirim response
    context.res = {
        status: 200,
        body: response,
        headers: {
            'Content-Type': 'application/json'
        }
    };
};
