import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore"
import { Calendar, Trash2 } from "lucide-react";

const AlbumsTable = () => {
    const { albums, isLoading, error, deleteAlbum } = useMusicStore();

    return <Table>
        <TableHeader className="hover:bg-zinc-800/50">
            <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="hover:bg-zinc-800/50">Title</TableHead>
                <TableHead className="hover:bg-zinc-800/50">Artist</TableHead>
                <TableHead className="hover:bg-zinc-800/50">Release year</TableHead>
                <TableHead className="hover:bg-zinc-800/50">Songs</TableHead>
                <TableHead className="hover:bg-zinc-800/50">Actions</TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            {
                albums.map((album) => (
                    <TableRow key={album._id}>
                        <TableCell>
                            <img src={album.imageUrl} alt={album.title} className="size-10" />
                        </TableCell>
                        <TableCell>
                            {album.title}
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items-center gap-1 text-zinc-400">
                                {album.artist}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items text-zinc-400">
                                <Calendar className="h-4 w-4 mr-2" />
                                {album.releaseYear}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className="inline-flex items text-zinc-400">
                                {album.songs.length} songs
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                    onClick={() => deleteAlbum(album._id)}
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table >
}

export default AlbumsTable