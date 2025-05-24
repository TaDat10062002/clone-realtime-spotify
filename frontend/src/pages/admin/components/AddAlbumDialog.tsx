import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react"
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
    const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
    const { createAlbum } = useMusicStore();
    const [isLoading, setIsLoading] = useState(false);
    const [newAlbum, setNewAlbum] = useState({
        title: '',
        artist: '',
        releaseYear: new Date().getFullYear()
    })

    const [file, setFile] = useState<{ image: File | null }>({
        image: null
    })

    const imageInputFile = useRef<HTMLInputElement>(null);
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (!file.image) {
                return toast.error("Please upload Album's image")
            }

            const formData = new FormData();
            formData.append("title", newAlbum.title);
            formData.append("artist", newAlbum.artist);
            formData.append("releaseYear", newAlbum.releaseYear.toString());
            formData.append("imageFile", file.image);
            createAlbum(formData);
            setNewAlbum({
                title: '',
                artist: '',
                releaseYear: new Date().getFullYear()
            })

            setFile({
                image: null
            })
            setAlbumDialogOpen(false)
            toast.success("Album added successfully");
        } catch (error: any) {
            toast.error(`Failed to album song ${error.message}`);
        }
        finally {
            setIsLoading(false)
        }
    }

    return <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
        <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Add Album
            </Button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
            <DialogHeader>
                <DialogTitle>
                    Add new album
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
                <input type="file"
                    accept="image*/"
                    ref={imageInputFile}
                    hidden
                    onChange={(e) => setFile((prev) => ({ ...prev, image: e.target.files![0] }))}
                />
            </div>

            {/* image upload area  */}
            <div className="flex items-center justify-center border-2 p-6 border-dashed border-zinc-700 rounded-lg cursor-pointer" onClick={() => imageInputFile.current?.click()}>
                <div className="text-center">
                    {
                        file.image ?
                            (
                                <div className="space-y-2">
                                    <div className="text-sm text-emerald-500">Image selected</div>
                                    <div className="text-xs text-zinc-400">
                                        {file.image.name.slice(0, 20)}
                                    </div>
                                </div>
                            )
                            :
                            (
                                <>
                                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                        <Upload className="h-6 w-6 text-zinc-400" />
                                    </div>
                                    <div className="text-sm text-zinc-400 mb-2">
                                        Upload artwork
                                    </div>
                                    <Button variant="outline" size="sm" className="text-xs">
                                        Choose file
                                    </Button>
                                </>
                            )
                    }
                </div>
            </div>

            {/* Album title  */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                    value={newAlbum.title}
                    onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                    className="bg-zinc-800 border-zinc-700"
                />
            </div>

            {/* Artist name  */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Artists' name</label>
                <Input
                    value={newAlbum.artist}
                    onChange={(e) => setNewAlbum({ ...newAlbum, artist: e.target.value })}
                    className="bg-zinc-800 border-zinc-700"
                />
            </div>

            {/* Release Year  */}
            <div className="space-y-2">
                <label className="text-sm font-medium">Release Year</label>
                <Input
                    type="number"
                    value={newAlbum.releaseYear}
                    onChange={(e) => setNewAlbum({ ...newAlbum, releaseYear: parseInt(e.target.value) })}
                    className="bg-zinc-800 border-zinc-700"
                />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setAlbumDialogOpen(false)} disabled={isLoading}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isLoading || !file || !newAlbum.title || !newAlbum.artist}>
                    {isLoading ? "Uploading..." : "Add Album"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default AddAlbumDialog