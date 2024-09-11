const express=require('express');
const app=express();
const dotenv=require("dotenv");
const mongoose=require('mongoose');
const path=require('path');

const authRoute=require('./routes/auth');
const userRoute=require('./routes/users');
const postRoute=require('./routes/posts');
const categoryRoute=require('./routes/categories');

const multer=require('multer');

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('MongoDB connected'))
.catch((e)=>{
    console.log(e);
})

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
});

const upload=multer({storage:storage});
app.post('/api/upload',upload.single("file"),(req,res)=>{
    res.status(200).json("photo uploaded successfully!");
})


app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);


app.listen(process.env.PORT || 5000,()=>{
    console.log('backend is running at port 5000');
})
