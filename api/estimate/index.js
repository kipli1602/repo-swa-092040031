module.exports = async function (context, req) {
    const jumlah = parseInt(req.query.jumlah);
    const jenis = req.query.jenis;
    
    const hargaPerJenis = {
        'snack': 15000,
        'makan': 30000,
        'lengkap': 45000
    };
    
    if (!jumlah || !jenis || isNaN(jumlah) || jumlah <= 0 || !hargaPerJenis[jenis]) {
        context.res = {
            status: 400,
            body: { error: 'Parameter tidak valid. Gunakan: ?jumlah=&jenis=snack/makan/lengkap' }
        };
        return;
    }
    
    const hargaPerPeserta = hargaPerJenis[jenis];
    const total = jumlah * hargaPerPeserta;
    
    context.res = {
        status: 200,
        body: {
            jumlah_peserta: jumlah,
            jenis_konsumsi: jenis,
            harga_per_peserta: hargaPerPeserta,
            total_estimasi_biaya: total,
            timestamp: new Date().toISOString()
        }
    };
};
