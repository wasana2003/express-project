const mysql = require('mysql2');

// DB connection (adjust settings accordingly)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'afsd_express'
});

// Upload image controller
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filename = req.file.originalname;
  const filepath = req.file.path;

  const sql = 'INSERT INTO images (filename, path) VALUES (?, ?)';
  db.query(sql, [filename, filepath], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json({
      message: 'Image uploaded successfully',
      image: { id: result.insertId, filename, path: filepath }
    });
  });
};

// Get image controller (return image file)
const getImage = (req, res) => {
  const filename = req.params.filename;

  const sql = 'SELECT * FROM images WHERE filename = ?';
  db.query(sql, [filename], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Image not found in DB' });
    }

    const imagePath = results[0].path;
    res.sendFile(imagePath, { root: '.' });
  });
};

module.exports = { uploadImage, getImage };
