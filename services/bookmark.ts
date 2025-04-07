import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_STORAGE_KEY = "anime_bookmarks";


export const loadBookmarks = async (): Promise<any[]> => {
  try {
    const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (storedBookmarks) {
      return JSON.parse(storedBookmarks).reverse() as any[];
    }
    return [];
  } catch (error) {
    console.error("Error loading bookmarks:", error);
    return [];
  }
};


export const saveBookmarks = async (bookmarks: any[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      BOOKMARKS_STORAGE_KEY,
      JSON.stringify(bookmarks)
    );
  } catch (error) {
    console.error("Error saving bookmarks:", error);
  }
};


export const addBookmark = async (anime: any): Promise<boolean> => {
    console.log("add to bookmark");
    
  try {
    const bookmarks = await loadBookmarks();
    const isAlreadyBookmarked = bookmarks.some(
      (bookmark) => bookmark?.mal_id === anime?.mal_id
    );
    console.log(isAlreadyBookmarked, anime?.mal_id);
    

    if (!isAlreadyBookmarked && anime?.mal_id !== undefined) {
        
      const updatedBookmarks = [...bookmarks, anime];
      await saveBookmarks(updatedBookmarks);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    return false;
  }
};


export const removeBookmark = async (
  animeId: number | string
): Promise<boolean> => {
  try {
    const bookmarks = await loadBookmarks();
    const initialLength = bookmarks.length;
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark?.mal_id !== animeId
    );

    if (updatedBookmarks.length < initialLength) {
      await saveBookmarks(updatedBookmarks);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error removing bookmark:", error);
    return false;
  }
};


export const isBookmarked = async (
  animeId: number | string | undefined
): Promise<boolean> => {
  if (animeId === undefined) {
    return false;
  }
  try {
    const bookmarks = await loadBookmarks();
    return bookmarks.some((bookmark) => bookmark?.mal_id === animeId);
  } catch (error) {
    console.error("Error checking if bookmarked:", error);
    return false;
  }
};

export const toggleBookmark = async (anime: any): Promise<boolean> => {
  if (!anime?.mal_id) {
    console.warn(
      'Anime object must have a unique "id" property for bookmarking.'
    );
    return false;
  }
  const bookmarked = await isBookmarked(anime.mal_id);
  if (bookmarked) {
    return removeBookmark(anime.mal_id);
  } else {
    return addBookmark(anime);
  }
};
