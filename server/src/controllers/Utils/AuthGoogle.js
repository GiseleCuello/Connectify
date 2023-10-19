const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Client = require('../../models/Client'); // Asegúrate de importar tu modelo de cliente aquí
require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const clientSec = process.env.CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSec,
      callbackURL: 'http://localhost:5173/auth/google/home', // La URL de redirección después de la autenticación
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Verifica si el usuario ya existe en la base de datos
        const existingUser = await Client.findOrCreate({
          googleId: profile.id,
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        // Si el usuario no existe, crea un nuevo cliente
        const newUser = new Client({
          googleId: profile.id,
          name: profile.displayName,
          // Otros campos que desees copiar desde el perfil de Google
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Serializa al usuario para guardarlo en una sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializa al usuario para recuperarlo de la sesión
passport.deserializeUser((id, done) => {
  Client.findById(id, (err, user) => {
    done(err, user);
  });
});
