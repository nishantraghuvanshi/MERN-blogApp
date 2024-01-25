const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const User=require('./models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const Post= require('./models/post');
const dotenv=require('dotenv');
dotenv.config();

const salt=bcrypt.genSaltSync(10);
const secret=process.env.JWT_SECRET;

const app=express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/uploads',express.static(__dirname+'/uploads'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(4000,()=>{
    console.log('server is running on port 4000');
    console.log('connected to db')
})
})

app.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    try {
        const user=await User.findOne({username});
        const passOk=bcrypt.compareSync(password,user.password);
        if(passOk){
            jwt.sign({username,id:user.id},secret,(err,token)=>{
                if(err){
                    res.status(400).json({message:'login failed'});
                }
                else{
                    res.cookie('token',token).json({
                        username,
                        id:user.id
                    });
                }
            })
        }
        else{
            res.status(400).json({message:'login failed'});
        }
    }catch (error) {
        res.status(400).json('login failed');
    }
})

app.get('/profile',async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,(err,info)=>{
        if(err){
            res.status(400).json({message:'failed to fetch'});
        }
        else{
            res.json(info);
        }
    })
})

app.post('/logout',(req,res)=>{
    res.clearCookie('token').json({message:'ok'});
})

app.post('/post',upload.single('file') ,async (req,res)=>{
    try {
        const {title,summary,content}=req.body;
        const {path} = req.file;
        const {token}=req.cookies;

        jwt.verify(token,secret,{},async (err,info)=>{
            if(err) throw err;
            await Post.create({
            title,
            summary,
            content,
            cover:path,
            author:info.id,
        })
        res.json({message:"ok"});
        })

    } catch (error) {
        res.json({message:error});
    }
})


app.get('/post', async(req,res)=>{
    try {
        const post=await Post.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20)
    res.json(post);
    } catch (error) {
        
    }
})


app.get('/Post/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const post=await Post.findById(id).populate('author',['username']);
        if(post){
            res.json(post);
        }else{
            res.status(404).json({message:'not found'});
        }
    } catch (error) {
        res.json({message:error});
    }
})

app.put('/post',upload.single('file'),async(req,res)=>{
    try {
        const {title,summary,content,id}=req.body;
        const {path} = req.file;
        const {token}=req.cookies;
        jwt.verify(token,secret,{},async (err,info)=>{
            if(err) throw err;
            const post=await Post.findById(id);
            if(post.author==info.id){
                await Post.findByIdAndUpdate(id,{
                    title,
                    summary,
                    content,
                    cover:path,
                })
            }
            res.json({"message":"ok"});
        })
    } catch (error) {
        res.json({message:error});
    }
});

app.delete('/post/:id',async(req,res)=>{
    const {id}=req.params;
    const {token}=req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        const post=await Post.findById(id);
        if(post.author==info.id){
               if(err) throw err;
        const post=await Post.findById(id);
        if(post.author==info.id){
            await Post.findByIdAndDelete(id);
        }
        res.json({"message":"ok"}); 
            }
    })
});
