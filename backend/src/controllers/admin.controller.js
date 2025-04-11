import Song from "../models/song.model.js";
import Album from "../models/album.model.js"
import cloudinary from "../lib/cloudinary.js"
import { json } from "express";

export const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        })
        return result;
    } catch (error) {
        console.log(`Error in uploadToCloudinary ${error}`);
        throw new Error(`Error uploading cloudinary`);
    }
}

export const createSong = async (req, res, next) => {
    try {
        if (!req.files || !req.files.audioFile || !req.files.imageFile) {
            return res.status(400).json({
                message: "Please upload all files"
            });
        }

        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null
        })

        console.log(song)

        await song.save();

        // if song belongs to an album, update the album song array 
        if (albumId) {
            await Album.findByIdAndUpdate(albumId,
                {
                    $push: { song: song._id }
                },
                { new: true })
        }
        res.status(201).json({
            song
        })
    } catch (error) {
        console.log(`Error in createSong ${error}`);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    const { id } = req.params;
    try {
        const song = await Song.findById(id);

        // check song in album, then delete this song from that album
        if (song.albumId) {
            // update songs album by pulling the song ready to delete out of array 
            await Album.findByIdAndUpdate(song.albumId,
                {
                    $pull: { song: song._id }
                }
            )
        }

        // then delete
        await Song.findByIdAndDelete(id, { new: true })
        res.status(200).json({
            message: "Song deleted successfully"
        })

    } catch (error) {
        console.log(`Error in deleteSong ${errors}`);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;
        const imageUrl = await uploadToCloudinary(imageFile);

        if (!imageFile) {
            return res.status(400).json({
                message: "Please upload Album image"
            })
        }

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl,
        })

        await album.save();
        res.status(201).json({
            message: "Album created successfully"
        })
    } catch (error) {
        console.log(`Error in createAlbum ${error}`);
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const { id } = req.params;
        // delete all song in this album
        await Song.deleteMany({ albumId: id });
        // then delete this album
        await Album.findByIdAndDelete(id);
        res.status(200).json({
            message: "Album has been deleted successfully"
        })
    } catch (error) {
        console.log(`Error in deleteAlbum in controller ${error}`);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
}