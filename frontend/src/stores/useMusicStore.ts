import { Album, Song, Stats } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { stat } from "fs";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  stats: Stats,
  isSongsLoading: boolean,
  isStatsLoading: boolean,
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  createAlbum: (formData: object) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  trendingSongs: [],
  madeForYouSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  isSongsLoading: false,
  isStatsLoading: false,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`albums/${id}`);
      set({ currentAlbum: response.data.album });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () => {
    set({ isStatsLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data })
    } catch (error: any) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchSongs: async () => {
    set({ isSongsLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data.songs })
    } catch (error: any) {
      set({ error: error.message })
    }
    finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.delete(`/admin/songs/${id}`)
      set(state => ({
        songs: state.songs.filter(song => song._id !== id)
      }))
      toast.success("Song deleted successfully");
    } catch (error: any) {
      set({ error: error.message })
      toast.error("Error deleting song");
      console.log(`Error in deletingSong ${error}`)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.delete(`/admin/albums/${id}`)
      set(state => ({
        // delete album update UI immediately
        albums: state.albums.filter(album => album._id !== id),
        // also delete all song in that album
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
        )
      }))
      toast.success("Album deleted successfully");
    } catch (error: any) {
      set({ error: error.message })
      toast.error("Error deleting song");
      console.log(`Error in deletingSong ${error}`)
    } finally {
      set({ isLoading: false })
    }
  },

  createAlbum: async (formData) => {
    await axiosInstance.post("/admin/albums", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    useMusicStore.getState().fetchAlbums()
  }
}));
