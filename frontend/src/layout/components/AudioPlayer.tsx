import { usePlayStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const previousSongRef = useRef<string | null>(null);

    const { currentSong, isPlaying, playNext } = usePlayStore();

    // to hanlde play/pause logic
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying])

    // handle song ends
    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            playNext();
        }

        audio?.addEventListener("ended", handleEnded);
        return () => audio?.removeEventListener("ended", handleEnded)
    }, [playNext]);

    // handle song changes
    useEffect(() => {
        if (!audioRef.current || !currentSong) return;
        const audio = audioRef.current;
        // check if this is actually a new song
        const isSongChange = previousSongRef.current !== currentSong?.audioUrl;
        if (isSongChange) {
            audio.src = currentSong?.audioUrl;
            // reset the playback position
            audio.currentTime = 0;
            previousSongRef.current = currentSong?.audioUrl;
            // play the new song
            if (isPlaying) audio.play();

        }
    }, [currentSong, isPlaying])

    return <audio ref={audioRef} />
}

export default AudioPlayer