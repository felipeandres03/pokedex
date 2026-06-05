import { createContext, useState, ReactNode, useContext } from "react";

type FavoritesContextType = {
  favorites: number[];

  addFavorites: (id: number) => void;

  removeFavorites: (id: number) => void;

  isFavorites: (id: number) => boolean;
};

type FavoritesPoviderProps = {
  children: ReactNode;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: FavoritesPoviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  function addFavorites(id: number) {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  }

  function removeFavorites(id: number) {
    setFavorites((prev) => prev.filter((pokemonId) => pokemonId !== id));
  }

  function isFavorites(id: number) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorites,
        removeFavorites,
        isFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(" useFavorites debe usarse dentro de FavoritesProvider");
  }

  return context;
}
