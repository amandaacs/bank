const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');

exports.signup = async (req, res, next) => {
    try {
        const username = req.body.username.toLowerCase(); // Convert to lowercase
        const user = await User.findOne({ username });

        if(user){
            return next(new createError('user already registered', 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create({
            ...req.body,
            username,
            password: hashedPassword,
        });


        //jwt
        const token = jwt.sign({ id: newUser._id}, 'secretkey123', {
            expiresIn: '1d',
        });

        res.status(201).json({
            status: 'success',
            message: 'user registered!', 
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                role: newUser.role,
                balance: newUser.balance
            }
        });

    } catch (error) {
        next(error);
    }
};
exports.login = async (req, res, next) => {
    try {
        const username = req.body.username.toLowerCase(); 
        const { password } = req.body;

        const user = await User.findOne({ username });

        if(!user) return next(new createError("Usuário não encontrado", 404));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return next(new createError("Senha Inválida", 401));
        }

        const token = jwt.sign({ id: user._id}, 'secretkey123', {
            expiresIn: '1d',
        });

        res.status(200).json({
            status: 'success',
            token, 
            message: 'Bem Vindo!',
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
                balance: user.balance
            }
        });
    } catch (error) {
        next(error);
    }
};