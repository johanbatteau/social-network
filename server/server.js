const express= require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const corsOptions = {
    origin: 'http://localhost:5173',
}
app.use(cors(corsOptions));
app.use(express.json());
const User = require('./models/Users');

mongoose.connect('mongodb+srv://user:FNB2Q5ryrnvtw80F@cluster0.venoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch(() => console.log('MongoDB connection failed'));

app.post('/api/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        res.json({ message: 'Connexion réussie' });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.post('/api/sign-up', async (req, res) => {
    const { email, password, confirm } = req.body;

    if (password !== confirm) {
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            email: email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Inscription réussie' });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get('/api/users', (req, res) => {
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json({ error: err.message }));
});


app.listen(8080, () => {
    console.log("Server running on port 8080");
});