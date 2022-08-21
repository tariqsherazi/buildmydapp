
const userPhotos=async(photo)=>{
    const path = `${process.env.USER_PHOTO_PATH}/${Math.floor(Math.random() * 1E9)}.${photo.name}`
    photo.mv(path, err => {
        if (err) {
            console.error(err);
        }      
})
let photoPath = path.slice(8)
return photoPath;
}
module.exports =userPhotos;