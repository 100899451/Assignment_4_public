// app.ts
import express from 'express';
import mongoose from 'mongoose';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import eventRoutes from './routes/eventRoutes';
// @ts-ignore
import userRoutes from './routes/userRoutes';
// @ts-ignore
import postRoutes from './routes/postRoutes';
// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
mongoose.connect(mongoURI, {
    family: undefined, hints: undefined, localAddress: undefined, localPort: undefined, lookup: undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
